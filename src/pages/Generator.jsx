import React, { useEffect, useState } from "react";
import { VscGear, VscCopy } from "react-icons/vsc";
import { ToastContainer, toast } from "react-toastify";
import { PAGES } from "../utils/pages";
import { loadData, saveData } from "../utils/localStorage";
import { postChatGPTMessage } from "../utils/chatGPT";

function Generator({ setPage, resume, openAIKey, template }) {
  const [jobDescription, setJobDescription] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load job details from local storage on component mount
    const getJobDetails = async () => {
      try {
        const coverLetter = await loadData("coverLetter");
        setCoverLetter(coverLetter);
        const description = await loadData("jobDescription");
        setJobDescription(description);
        const title = await loadData("jobTitle");
        setJobTitle(title);
      } catch (error) {
        console.error("Error while fetching job details", error);
      }
    };

    getJobDetails();
  }, []);

  const generateCoverLetter = async () => {
    setIsLoading(true);

    try {
      // Send message to chatGPT API and wait for response
      const chatGPTResponse = await postChatGPTMessage(
        resume,
        jobDescription,
        jobTitle,
        template,
        openAIKey
      );
      // Update state with generated cover letter
      setCoverLetter(chatGPTResponse);
      saveData("coverLetter", chatGPTResponse);
    } catch (error) {
      console.error(error);
    } finally {
      // Set loading state to false once the process is complete (whether it was successful or not)
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(coverLetter).then(
      () => {
        toast.success("Copied to clipboard!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      },
      (error) => {
        console.error("Error copying to clipboard.");
        console.error(error);
        toast.error("Error copying. Please try again", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    );
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between mx-5 my-3 items-center">
        <button
          disabled={isLoading}
          onClick={generateCoverLetter}
          className="border-2 border-solid border-blue-500 text-blue-500 text-lg font-bold rounded-md px-3 py-2 hover:text-white hover:bg-blue-500"
        >
          {isLoading ? "Generating..." : "Generate"}
        </button>
        <h2 className="text-2xl font-bold">LinkedIn Cover Letter Generator</h2>
        <button
          onClick={() => setPage(PAGES.PROFILE)}
          className="border mr-[1px] p-2 border-solid border-gray-600 rounded-[100%] hover:bg-gray-200 hover:border-2 hover:mr-0 transition duration-300 ease-in-out"
        >
          <VscGear className="text-[150%] text-gray-500" />
        </button>
      </div>
      <div className="flex mx-5">
        <textarea
          rows={12}
          className="w-full"
          placeholder="Generated cover letter"
          value={coverLetter}
        />
      </div>
      <div className="m-5">
        <button
          disabled={!coverLetter?.length || isLoading}
          onClick={handleCopyToClipboard}
          className="flex items-center gap-3 border-2 border-solid border-blue-500 text-blue-500 text-lg font-bold rounded-md px-3 py-2 hover:text-white hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed "
        >
          <span>Copy to Clipboard</span>
          <VscCopy className="text-[150%]" />
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Generator;
