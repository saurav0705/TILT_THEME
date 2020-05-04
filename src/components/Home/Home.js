import React, { useRef, useEffect, useState } from 'react';
import './Home.css';
import { TimelineLite, Power2 } from "gsap";
import CSSRulePlugin from "gsap/CSSRulePlugin";
import { useHistory } from 'react-router-dom';
import LoadingData from '../LoadingData/LoadingData';

const Home = (props) => {
    let home = useRef(null);
    let image = useRef(null);
    let name = useRef();
    let tagline = useRef();
    let button = useRef();
    let imageReveal = CSSRulePlugin.getRule(".image-container::after");
    let history = useHistory();
    let loading = useRef();

  let tl = new TimelineLite();
    useEffect(()=>{
        
        image.addEventListener("load",() => {
            localStorage.clear();
            test2();
            localStorage.setItem('load','loaded');
            
            
        })
        
        if(localStorage.getItem('load') === 'loaded'){
            tl.to(home, 0, { css: { visibility: "visible" } });
            tl.to(button,0,{css:{'width':'auto','padding': '10px','background-color':'white','color':'black'},ease:Power2.easeIn});
    
        }
            
    },[image])

    const test2 =() => {
        console.log('loaded');
        animate();
    }
    const animate = async () => {
        console.log("animating....")
        await tl.to(loading,0,{opacity:0})
                .to(home, 0, { css: { "visibility": "visible" } })
                .from(image,0.4,{y:-20,opacity:0})
                .from(name,0.4,{y:-20,opacity:0})
                .from(tagline,0.4,{y:-20,opacity:0})
                .to(imageReveal, 1.4, { width: "0%", ease: Power2.easeInOut })
                .from(image, 1.4, {scale: 1.8,ease: Power2.easeInOut,delay: -1.4})
                .to(button,1,{css:{'width':'auto','padding': '10px','background-color':'white','color':'black'},ease:Power2.easeInOut,delay:-0.5});
    }

    const test = () => {
        tl.to(home,1,{x:500,opacity:0});
        setTimeout(()=>history.push('/about'),1000);
    }
    return (<>
        <div ref={el => {loading=el}} className="image-loading">Loading...</div>
        <div className="home" ref={el => (home = el)} >
            <div className="image-container">
                <img ref={el => {image = el;}} className="image" src={props.image}/>
            </div>
            <div className="home-name" ref={el => {name = el}}>{props.name}</div>
            <div className="home-tagline" ref={el => {tagline = el}}>{props.tagline}</div>
            <div className="about-me" ref={el => {button = el}} onClick={()=>test()}>lets know about me</div>
           </div>
        </>
        
    );
};

export default Home;