import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useUserAuth } from "E:/Twitter/frontend/src/context/UserAuthContext.js";
import '../Page.css';
import Sidebar from "E:/Twitter/frontend/src/Pages/Sidebar/Sidebar.js";
import { Button } from "@mui/material";
import 'E:/Twitter/frontend/src/Pages/TweetBox/TweetBox.css';
import "./Question.css";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CodeIcon from '@mui/icons-material/Code';

const Lists = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();

  const [inputText, setInputText] = useState("");
  const [font, setFont] = useState("calibri");

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='page'>
      <Sidebar />
      <div className="tweetBox_input">
        <div className="editor-container">
          <textarea
            type="text"
            id="input_field"
            className="editor"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <div className="dropdown-container">
            <select className="dropdown">
              <option value="Arial">Arial</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier New">Courier New</option>
            </select>
          </div>
        </div>
        <button className="bold_input">B</button>
        <button className="italic_input">I</button>
        <button className="underline_input">U</button>
        <button className="image_input"><AddPhotoAlternateIcon/></button>
        <button className="code_input"><CodeIcon/></button>
        <div className="dropdown-container-size">
            <select className="dropdown-size">
              <option value="">size</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
            </select>
          </div>
      </div>
    </div>
  );
};

export default Lists;
