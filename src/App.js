import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Login/Signup";
import { BrowserRouter as Router } from 'react-router-dom';
import ProtectedRoute from "./Pages/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import "E:/Twitter/frontend/src/App.css";
import Home from "./Pages/Home";
import Explore from "./Pages/Explore/Explore";
import Feed from "./Pages/Feed/Feed";
import Messages from "./Pages/Messages/Messages";
import Bookmarks from "./Pages/Bookmark/Bookmark";
import Lists from "./Pages/Lists/List";
import Profile from "./Pages/Profile/Profile";
import More from "./Pages/More/More";
import Notifications from "./Pages/Notifications/Notifications";
import Content from "./Pages/Content/Content";
import Question from "./Pages/Question/Question";
function App() {
  return (
    <div className="app">
      <UserAuthContextProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route index element={<Home />} />
            <Route path="home/feed" element={<Feed />} />
            <Route path="home/explore" element={<Explore />} />
            <Route path="home/notifications" element={<Notifications />} />
            <Route path="home/messages" element={<Messages />} />
            <Route path="home/bookmarks" element={<Bookmarks />} />
            <Route path="home/lists" element={<Lists />} />
            <Route path="home/profile" element={<Profile />} />
            <Route path="home/more" element={<More />} />
            <Route path="home/content" element={<Content />} />
            <Route path="home/question" element={<Question />} />
          </Routes>
        </Router>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
