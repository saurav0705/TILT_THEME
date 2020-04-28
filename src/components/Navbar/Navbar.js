import React, { useState } from 'react';
import './Navbar.css';
import {IoIosMenu} from 'react-icons/io';
import Home from '../Home/Home';
const Navbar = () => {
    const [rotate,setRotate] = useState(false);
    const toggle = () =>{
        setRotate(!rotate);
    }
    return (
        <div className="main">
            <div className="nav">
                <div className="content-nav">
                    <div className="nav-option">home</div>
                    <div className="nav-option">About</div>
                    <div className="nav-option"> Skills</div>
                    <div className="nav-option">projects</div>
                    <div className="nav-option">contact</div>
                </div>
            </div>
            <button onClick={()=> toggle()} className="button"><IoIosMenu/></button>
            <div className={rotate ? "content rotate":"content"}>
                <Home/>
               </div>
        </div>
    );
};

export default Navbar;