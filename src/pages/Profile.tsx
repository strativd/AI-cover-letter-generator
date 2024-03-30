import React from "react";
import { MdArrowBack } from "react-icons/md";
import { PAGES } from "../utils/pages";
import { ToastContainer, toast } from "react-toastify";
import { saveData } from "../utils/localStorage";

type Props = {
  setPage: (page: string) => void;
  setOpenAIKey: (key: string) => void;
  setResume: (resume: string) => void;
  setTemplate: (template: string) => void;
  template: string;
  resume: string;
  openAIKey: string;
};

const Profile: React.FC<Props> = ({
  setPage,
  setOpenAIKey,
  setResume,
  setTemplate,
  template,
  resume,
  openAIKey,
}) => {
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedResume = formData.get("resume") as string;
    const updatedOpenAIKey = formData.get("openAIKey") as string;
    const updatedTemplate = formData.get("template") as string;

    try {
      setResume(updatedResume);
      saveData("resume", updatedResume);
      setTemplate(updatedTemplate);
      saveData("template", updatedTemplate);
      setOpenAIKey(updatedOpenAIKey);
      saveData("openAIKey", updatedOpenAIKey);
      toast.success("Saved successfully!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error("Error saving data.");
      console.error(error);
      toast.error("Error saving. Please try again", {
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
  };

  return (
    <div className="flex flex-col  mx-5">
      <div className="flex flex-row justify-between my-3 items-center">
        <h2 className="text-2xl font-bold">Profile</h2>
        <button
          onClick={() => setPage(PAGES.GENERATOR)}
          className="border mr-[1px] p-2 border-solid border-gray-600 rounded-[100%] hover:bg-gray-200 hover:border-2 hover:mr-0 transition duration-300 ease-in-out"
        >
          <MdArrowBack className="text-[150%] text-gray-500" />
        </button>
      </div>

      <form className="flex-col" onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="openAIKey"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Open AI Key
          </label>
          <input
            id="openAIKey"
            name="openAIKey"
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="sk-...1234"
            defaultValue={openAIKey}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="resume"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Resume
          </label>
          <textarea
            id="resume"
            name="resume"
            defaultValue={resume}
            rows={6}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Paste your resume here..."
          ></textarea>
        </div>
        <div className="mb-6">
          <label
            htmlFor="template"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Cover Letter Template
          </label>
          <textarea
            id="template"
            name="template"
            defaultValue={template}
            rows={6}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Paste your template here..."
          ></textarea>
        </div>
        <div className="mb-6 text-center">
          <button
            type="submit"
            className="border-2 border-solid border-blue-500 text-blue-500 text-lg rounded-md px-5 py-2 hover:text-white hover:bg-blue-500"
          >
            Save
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Profile;
