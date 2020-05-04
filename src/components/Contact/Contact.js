import React, { useEffect, useRef } from 'react';
import './Contact.css';
import {FaGithubSquare,FaPhone,FaFacebookSquare,FaLinkedin,FaSnapchatSquare,FaInstagram,FaTwitterSquare} from 'react-icons/fa';
import {MdEmail} from 'react-icons/md';
import { TimelineLite, Power2} from "gsap";
import { parrallax } from '../effects';
const Contact = (props) => {
    let cardRef = useRef([]);
    let timeLine = new TimelineLite();
    useEffect(()=>{
        timeLine.staggerFrom(cardRef.current,0.3,{y:-20,opacity:0,ease:Power2.easeInOut},0.2)
    },[])
    const icon = (key) => {
        switch(key.toUpperCase()){
            case 'EMAIL' : return <MdEmail/>
            case 'FACEBOOK': return <FaFacebookSquare/>
            case 'TWITTER' : return <FaTwitterSquare/>
            case 'LINKEDIN' : return <FaLinkedin/>
            case 'SNAPCHAT' : return <FaSnapchatSquare/>
            case 'INSTAGRAM' : return <FaInstagram/>
            case 'GITHUB' : return <FaGithubSquare/>
            case 'PHONE' : return <FaPhone/>
            default : return 'none'; 
        }

    }
    // const parrallax = {
    //     'backgroundImage':"linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.8)),url('https://drive.google.com/uc?id=1wNqkZ61_X1qHqaYQvglsNzQVs4qDbEq7')",
    //     'backgroundAttachment': 'fixed',
    //   'backgroundPosition': 'center',
    //   'backgroundRepeat': 'no-repeat',
    //   'backgroundSize':'cover',
      
    
    // }
    return (
        <div className="contact"  style={parrallax}>
           <div className="heading contact-heading">
               <span className="head">Contact me</span></div>
           <div className="content-contact">
               <div className='phone'>
               {props.contacts.map(contact => {
                   return(<div className="phone-tile" onClick={()=>window.parent.location.href = "tel:"+contact}>{icon('PHONE')} Call Me</div>)})}
                   </div>
                <div className="social">
                {Object.keys(props.social).map((social,index) => {
                    return(<div ref={el => {cardRef.current[index] = el}} className={" contact-tile"} onClick={()=>window.open(social === 'email' ? "mailto:"+props.social[social]:props.social[social])}>{icon(social)}</div>)
                })}
                </div>
           </div>

        </div>
    );
};

export default Contact;