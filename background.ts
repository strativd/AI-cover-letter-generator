type UrlsConfig = Record<string, { selector: string; includes?: string }>;

const URLS: UrlsConfig = {
  "https://www.linkedin.com/jobs/collections": {
    selector: ".jobs-search__job-details--container",
  },
  "https://www.linkedin.com/jobs/view": {
    selector: ".jobs-description .jobs-description-content__text",
  },
  "https://boards.greenhouse.io/": {
    includes: "/jobs/",
    selector: "#content",
  },
};

// This is an event listener that runs when a tab is updated in Chrome.
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Check if the tab is fully loaded and active.
  const tabUrl = tab.url;
  if (!tabUrl || !tab.active || changeInfo.status !== "complete") return;
  // Check if the URL exists in our config object
  const isValidUrl = Object.keys(URLS).find((urlKey) =>
    tabUrl.startsWith(urlKey)
  );
  if (!isValidUrl) return;
  // Check if the URL includes a specified sub-string
  const validUrl = URLS[isValidUrl];
  if (validUrl.includes) {
    const isValidPath = tabUrl.includes(validUrl.includes);
    if (!isValidPath) return;
  }

  console.log({ active: "✅", isValidUrl, tab });

  // Execute the script on the current tab and store the result in local storage.
  chrome.scripting
    .executeScript({
      target: { tabId },
      func: getJobDescription,
      args: [validUrl.selector],
    })
    .then((queryResult) => {
      chrome.storage.local.set({ jobDescription: queryResult[0].result });
      const jobTitle = tab.title?.replace(/\| linkedin/i, "") || "";
      chrome.storage.local.set({ jobTitle });
    });
});

/** This function is executed on the tab and gets the job description from the web page. */
function getJobDescription(selector: string) {
  let description = "";
  const container = document.body.querySelector<HTMLElement>(selector);
  if (container) {
    description = container.innerText.replace(/\s\s+/g, " ");
  }
  return description;
}
