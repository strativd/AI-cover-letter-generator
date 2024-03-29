/*global chrome*/

const URLS = {
  "https://www.linkedin.com/jobs/collections": {
    selector: ".jobs-search__job-details--container",
  },
  "https://www.linkedin.com/jobs/view": {
    selector: ".jobs-description .jobs-description-content__text",
  },
};

// This is an event listener that runs when a tab is updated in Chrome.
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Check if the tab is fully loaded and active.
  if (!tab.active || !tab.url || changeInfo.status !== "complete") return;

  const validUrl = Object.keys(URLS).find((urlKey) =>
    tab.url.startsWith(urlKey)
  );
  console.log({ changeInfo, validUrl, tab });

  if (validUrl) {
    // Execute the script on the current tab and store the result in local storage.
    chrome.scripting
      .executeScript({
        target: { tabId: tabId },
        func: getJobDescription,
        args: [URLS[validUrl].selector],
      })
      .then((queryResult) => {
        chrome.storage.local.set({ jobDescription: queryResult[0].result });
        chrome.storage.local.set({ jobTitle: tab.title });
      });
  }
});

/** This function is executed on the tab and gets the job description from the web page. */
function getJobDescription(selector) {
  const container = document.body.querySelector(selector);
  const innerText = container.innerText;
  return innerText.replace(/\s\s+/g, " ");
}

/** Helper function to get a valid URL object */
function getValidUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return null;
  }

  return url;
}
