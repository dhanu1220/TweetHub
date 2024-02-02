  import React, { useState } from "react";
  import Sidebar from "E:/Twitter/frontend/src/Pages/Sidebar/Sidebar.js";
  import Widget from "E:/Twitter/frontend/src/Pages/Widgets/Widgets.js";
  import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
  import { Button, Avatar } from "@mui/material";
  import axios from 'axios';
  import { useNavigate } from "react-router";
  import 'E:/Twitter/frontend/src/Pages/TweetBox/TweetBox.css';
  import "./Content.css";
  import useLoggedInUser from 'E:/Twitter/frontend/src/hooks/useLoggedInUser.js';
  import { useUserAuth } from "E:/Twitter/frontend/src/context/UserAuthContext.js";
  import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
  import "E:/Twitter/frontend/src/Pages/Sidebar/Sidebar.css"
  import { storage } from "../../context/firebase";
  import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
  const Lists = () => {
    const [inputText, setInputText] = useState("");
    const [badWordsNotice, setBadWordsNotice] = useState("");
    const [post, setPost] = useState('');
    const [imageURL, setImageURL] = useState('');
    var [videoURL, setVideoURL] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [username, setUsername] = useState(' ');
    const [loggedInUser] = useLoggedInUser();
    const { logOut, user } = useUserAuth();


    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await logOut();
            navigate("/login");
        } catch (error) {
            console.log(error.message);
        }
    };
    const email = user?.email;
    const userProfilePic = loggedInUser[0]?.profileImage ? loggedInUser[0]?.profileImage : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png";
  
    const handleUploadImage = e => {
      setIsLoading(true);
      const image = e.target.files[0];

      const formData = new FormData();
      formData.set('image', image);
      axios.post("https://api.imgbb.com/1/upload?key=8c46b15308d205869bdcc6fe5bb03584", formData) // Replace with your local server URL

          .then(res => {
              setImageURL(res.data.data.display_url);
          })
          .catch((error) => {
              console.log(error);
          });
  };

    const handleUploadVideo = async (e) => {
      try {
        const videoFile = e.target.files[0];
        const storageRef = ref(storage, `videos/${videoFile.name}`);
        const snapshot = await uploadBytes(storageRef, videoFile);
        console.log('Video uploaded successfully:', snapshot);
        setVideoURL = await getDownloadURL(storageRef);    
        console.log('Video download URL:', setVideoURL);    
        
      } catch (error) {
        console.error('Error uploading video:', error);
      }
    }; 
    
  
    const badWords = ["death", "kill", "murder", "hateful", "shit", "bastard", "creep", "horrible", "terrible", "nasty", "awful"];
  
    const checkForBadWords = () => {
      const lowerCaseInput = inputText.toLowerCase();
  
      for (const word of badWords) {
        if (lowerCaseInput.includes(word)) {
          setBadWordsNotice("Warning: Your tweet contains inappropriate content!");
          return;
        } else {
          setBadWordsNotice("");
        }
      }
    };
  
  const handleInputChange = (e) => {
      setInputText(e.target.value);
      setPost(e.target.value);
    };
  
    const handleTweet = (e) => {
      checkForBadWords();
      e.preventDefault();
  
        if (user?.providerData[0]?.providerId === 'password') {
        fetch(`http://localhost:5000/loggedInUser?email=${email}`)
          .then(res => res.json())
          .then(data => {
            setName(data[0]?.name);
            setUsername(data[0]?.username);
          });
      } else {
        setName(user?.displayName);
        setUsername(email?.split('@')[0]);
      }
  
      if (name) {
        const userPost = {
          profilePhoto: userProfilePic,
          post: post,
          photo: imageURL,
          video: videoURL,
          username: username,
          name: name,
          email: email,
        };
          console.log(userPost);
          setPost('');
          setImageURL('');
          setVideoURL('');
          fetch('http://localhost:5000/post', { 
              method: "POST",
              headers: {
                  'content-type': 'application/json'
              },
              body: JSON.stringify(userPost),
          })
              .then(res => res.json())
              .then(data => {
                  console.log(data);
              });
      }
  
    };
  
    return (
      <div className="app">      
      <Sidebar handleLogout={handleLogout} user={user} />
      <div className="feed">

      <div className="tweetBox">
              <form onSubmit={handleTweet}>
                  <div className="tweetBox_input">
                      <Avatar src={loggedInUser[0]?.profileImage ? loggedInUser[0]?.profileImage : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"} />
  
            <input
              type="text"
              id="input_field"
              placeholder="What's Happening?"
              value={inputText}
              onChange={handleInputChange}
            />
          </div>
          <p id="bad_notice">{badWordsNotice}</p>
  
          <div className="button_input">

          
            <label htmlFor="image" className="imgIcon">
              <AddPhotoAlternateIcon />
            </label>
            <input
              type="file"
              id='image'
              className="imageInput"
              onChange={handleUploadImage}
            />
          <div>
            <label htmlFor="video" className="videoIcon">
              <VideoLibraryIcon />
            </label>
            <input
              type="file"
              id='video'
              className="videoInput"
              accept="video/*"
              onChange={handleUploadVideo}
            />
            </div>

          <Button className="tweetBox_tweetButton" type="submit" >
            Tweet
          </Button>
          </div>
          </form>
        </div>
        </div>
        <Widget />
      </div>
    );
  };
  
  export default Lists;
  