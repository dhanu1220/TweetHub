import React from 'react'
import "E:/Twitter/frontend/src/Pages/Page.css"

import MainProfile from './MainProfile/MainProfile'
import { useNavigate } from "react-router";
import { useUserAuth } from "E:/Twitter/frontend/src/context/UserAuthContext.js";
import '../Page.css'
import Sidebar from "E:/Twitter/frontend/src/Pages/Sidebar/Sidebar.js";
const Profile = () => {
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
    return(
        <div>
                    <div className='page'>
        <Sidebar handleLogout={handleLogout} user={user} />
        <div className = "profile">
            <MainProfile user={user} />
            </div>
        </div>
        </div>
    );
};

export default Profile;










