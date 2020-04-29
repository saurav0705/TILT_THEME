import React, { useRef, useEffect } from 'react';
import './Home.css';
import { TimelineLite, Power2 } from "gsap";
import CSSRulePlugin from "gsap/CSSRulePlugin";
import { useHistory } from 'react-router-dom';

const Home = () => {
    let home = useRef(null);
    let image = useRef(null);
    let name = useRef();
    let tagline = useRef();
    let button = useRef();
    let imageReveal = CSSRulePlugin.getRule(".image-container::after");
    let history = useHistory();

  let tl = new TimelineLite();
    useEffect(()=>{
        

        window.addEventListener('load',()=>{
            animate();
            localStorage.setItem('load','loaded');
        })

        if(localStorage.getItem('load') === 'loaded'){
            tl.to(home, 0, { css: { visibility: "visible" } });
            tl.to(button,0,{css:{'width':'auto','padding': '10px','background-color':'white','color':'black'},ease:Power2.easeIn});
    
        }
            
    },[])
    const animate = () => {
        tl.to(home, 0, { css: { visibility: "visible" } });
        tl.from(image,0.4,{y:-20,opacity:0})
        tl.from(name,0.4,{y:-20,opacity:0})
        tl.from(tagline,0.4,{y:-20,opacity:0})
        tl.to(imageReveal, 1.4, { width: "0%", ease: Power2.easeInOut });
        tl.from(image, 1.4, {scale: 1.8,ease: Power2.easeInOut,delay: -1.4});
        tl.to(button,1,{css:{'width':'auto','padding': '10px','background-color':'white','color':'black'},ease:Power2.easeInOut,delay:-0.5});
    }

    const test = () => {
        tl.to(home,1,{x:500,opacity:0});
        setTimeout(()=>history.push('/about'),1000);
    }
    return (
        <div className="home" ref={el => (home = el)} >
            <div className="image-container">
                <img ref={el => {image = el;}} className="image" src="https://drive.google.com/uc?id=1nLqXqvEKUnkdwIH_cIS_B8tD6YX_bdt3"/>
            </div>
            <div className="home-name" ref={el => {name = el}}>Jane Doe</div>
            <div className="home-tagline" ref={el => {tagline = el}}>Web Developer</div>
            <div className="about-me" ref={el => {button = el}} onClick={()=>test()}>lets know about me</div>
           </div>
    );
};

export default Home;