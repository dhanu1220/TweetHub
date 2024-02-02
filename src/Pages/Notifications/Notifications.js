import React from "react";
import { useNavigate } from "react-router";
import { useUserAuth } from "E:/Twitter/frontend/src/context/UserAuthContext.js";
import '../Page.css'
import Sidebar from "E:/Twitter/frontend/src/Pages/Sidebar/Sidebar.js";


const Lists= () =>{
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
        <div className='page'>
        <Sidebar handleLogout={handleLogout} user={user} />

        <h2 className='pageTitle'>Welcome to Notification page</h2>
    </div>
    ); 
};

export default Lists;