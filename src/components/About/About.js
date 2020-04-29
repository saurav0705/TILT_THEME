import React, { useRef, useEffect } from 'react';
import './About.css';
import { TimelineLite, Power2,TweenMax } from "gsap";
import CSSRulePlugin from "gsap/CSSRulePlugin";
const About = () => {
    let description = useRef(null);
    let experiance = useRef(null);
    let timeLine = new TimelineLite();
    let cardRef = useRef([]);
    let cards = [
        1,2,3,4,5
    ];
    useEffect(()=>{
        // timeLine.from(description,1,{x:-100,ease:Power2.easeInOut});
        animate();
        setTimeout(()=>animateDescription(),200);

    },[])

    const animate = () => {
        timeLine.from(description,1,{x:-100,scale:1.6,opacity:0,ease:Power2.easeInOut});
        

    }
    const animateDescription = async () => {
        await timeLine.to(experiance,0.5,{css:{'margin-top':'5vh'},ease:Power2.easeOut});
        TweenMax.staggerTo(cardRef.current, 1, {
            scale: 1,
            opacity:1
          }, 0.3);
    }

    const big = (index) => {
        timeLine.to(cardRef.current[index],0.1,{scale:1.3,ease:Power2.easeInOut});
    }

    const normal = (index) => {
        timeLine.to(cardRef.current[index],0.1,{scale:1,ease:Power2.easeInOut});
    }

    return (
        <div className="about">
            <div className="container">
            <div className="heading">
                About
            </div>
            <div className="container-content">
                <div className="description" ref={el => {description = el}}>
                    Sint magna non duis excepteur pariatur officia labore ut culpa amet. Dolor incididunt sunt proident dolore non excepteur ipsum. Sint qui adipisicing pariatur qui ex. Elit tempor laboris nisi minim non et cillum eiusmod. Proident nulla officia mollit fugiat occaecat. Ea qui aliqua eiusmod laboris deserunt amet mollit excepteur.
                </div>
            </div>
            </div>
            <div className="container">
            <div className="heading margin-above" ref={(el) => {experiance = el}} onClick={() => animateDescription()}>
                Experiance
            </div>
            <div className="container-content grid">
                {cards.map((card,index) => {
                    return(
                        <div key={card} ref={el => {cardRef.current[index]=el}} className="card" onMouseEnter={()=>big(index)} onMouseLeave={()=>normal(index)}>

                        </div>

                    )
                })}
            </div>
            </div>
        </div>
    );
};

export default About;