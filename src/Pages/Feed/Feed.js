import React, { useEffect, useState } from "react";
import Post from "E:/Twitter/frontend/src/Pages/Feed/Post/Post.js";
import "./Feed.css";
import TweetBox from "../TweetBox/TweetBox";

function Feed() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        console.log("Fetching posts...");
        fetch('http://localhost:5000/post')
            .then(res => res.json())
            .then(data => {
                console.log("Posts received:", data);
                setPosts(data);
            })
            .catch(error => {
                console.error("Error fetching posts:", error);
            });
    }, []); // Removed [posts] as a dependency

    return (
        <div className="feed">
            <div className="feed__header">
                <h2>Home</h2>
            </div>
            <TweetBox />
            {
                posts.map(p => <Post key={p._id} p={p} />)
            }
        </div>
    )
}

export default Feed;
