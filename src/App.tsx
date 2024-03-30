import React, { useEffect, useState } from "react";

import { PAGES } from "./utils/pages";
import Generator from "./pages/Generator";
import Profile from "./pages/Profile";
import { loadData } from "./utils/localStorage";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // State management
  const [page, setPage] = useState(PAGES.GENERATOR);
  const [openAIKey, setOpenAIKey] = useState("");
  const [resume, setResume] = useState("");
  const [template, setTemplate] = useState("");

  // Load data from local storage on component mount
  useEffect(() => {
    const fetchLocalData = async () => {
      const localResume = await loadData("resume");
      const localTemplate = await loadData("template");
      const localOpenAIKey = await loadData("openAIKey");

      setResume(localResume);
      setTemplate(localTemplate);
      setOpenAIKey(localOpenAIKey);
    };

    fetchLocalData();
  }, []);

  // Render components based on the current page
  switch (page) {
    case PAGES.GENERATOR:
      return (
        <Generator
          setPage={setPage}
          resume={resume}
          openAIKey={openAIKey}
          template={template}
        />
      );

    case PAGES.PROFILE:
      return (
        <Profile
          setPage={setPage}
          setOpenAIKey={setOpenAIKey}
          setResume={setResume}
          setTemplate={setTemplate}
          resume={resume}
          openAIKey={openAIKey}
          template={template}
        />
      );

    default:
      return (
        <Generator
          setPage={setPage}
          resume={resume}
          openAIKey={openAIKey}
          template={template}
        />
      );
  }
}

export default App;
