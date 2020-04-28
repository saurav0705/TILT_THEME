import React, { useRef, useEffect } from 'react';
import './Home.css';
import {TweenMax,Power3} from 'gsap';
const Home = () => {
    let home = useRef();
    useEffect(()=>{
        TweenMax.to(
            home,
            0.8,
            {
                opacity:1,
                y:0,
                
                ease:Power3.easeOut
            }

        )

    },[])
    return (
        <div className="home">
            <h1 ref={el => {home = el}}>Home</h1>
        </div>
    );
};

export default Home;