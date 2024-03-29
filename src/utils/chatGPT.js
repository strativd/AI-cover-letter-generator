import axios from "axios";

// Define constants
const CHATGPT_END_POINT = "https://api.openai.com/v1/chat/completions";
const CHATGPT_MODEL = "gpt-3.5-turbo";

// Function to send a message to the ChatGPT API and return the response
export const postChatGPTMessage = async (
  resume,
  jobDescription,
  jobTitle,
  template,
  openAIKey
) => {
  // Set headers for the axios request
  const config = {
    headers: {
      Authorization: `Bearer ${openAIKey}`,
    },
  };

  const INSTRUCTIONS =
    "You will be provided with a JOB TITLE, JOB DESCRIPTION, MY RESUME, and a COVER LETTER TEMPLATE. " +
    "Your task is to fill in the COVER LETTER TEMPLATE based on the relevant job requirements and my resume. " +
    "Important: only respond with the template I provided, completing all blank spaces and the numbered list (with a bold title before each description).";
  const MESSAGE = `
    1. JOB TITLE:\n\n${jobTitle}\n\n
    2. JOB DESCRIPTION:\n\n${jobDescription}\n\n
    3. MY RESUME:\n\n${resume}\n\n
    4. COVER LETTER TEMPLATE:\n\n${template}`;

  // Define the data to send in the request body
  const messages = [
    { role: "system", content: INSTRUCTIONS },
    { role: "user", content: MESSAGE },
  ];
  console.log(messages);
  const chatGPTData = {
    model: CHATGPT_MODEL,
    messages,
  };

  try {
    // Send a POST request to the ChatGPT API
    const response = await axios.post(CHATGPT_END_POINT, chatGPTData, config);

    // Extract the message content from the API response
    const message = response?.data?.choices[0]?.message.content;

    // Return the message content
    return message;
  } catch (error) {
    console.error("Error with ChatGPT API"); // Log error message
    console.error(error);

    // Return null if an error occurs
    return null;
  }
};
