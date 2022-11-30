import "bootstrap/dist/css/bootstrap.css";
import File from "./pages/file";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Folder from "./pages/folder";


function App() {
  const [onInput, setOnInput] = useState("");
  
  async function deleteFile(path) {
    try {
      await fetch(`http://localhost:5000/${path}`, {
        method: "DELETE",
      });
     
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
    console.log("hi");
  }
  async function submitRename(path, method) {
    console.log(path);
    const body = { name: onInput };
    try {
      await fetch(`http://localhost:5000/${path}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: method,
        body: JSON.stringify(body),
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
       
          <Route
            path="*"
            element={
              <Folder
                deleteFile={deleteFile}
                setOnInput={setOnInput}
                submitRename={submitRename}
              />
            }
          />
        </Routes>
        <br />
      </BrowserRouter>
    </>
  );
}

export default App;
