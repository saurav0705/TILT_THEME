import React, { useRef, useEffect, useState } from 'react';
import './About.css';
import { TimelineLite, Power2 } from "gsap";
import {GiSuitcase, GiAchievement} from 'react-icons/gi';
import {getFormatedDate} from '../effects';
const About = (props) => {
    let description = useRef(null);
    let experiance = useRef(null);
    let achievement = useRef(null);
    let about = useRef(null);
    let timeLine = new TimelineLite();
    let cardRef = useRef({'experiance':[],'achievement':[]});
    const [hovered,setHovered] = useState([]);
    
    let cards = [
        1,2,3,4,5
    ];
    const createObserver = (reference,field) =>{
        let observe = new IntersectionObserver((obj)=>{

            if(obj[0].intersectionRatio > 0){
            animateHeading(reference,field);}

        })
        observe.observe(reference);
    }

    useEffect(()=>{
        animate();
        createObserver(experiance,'experiance');
        createObserver(achievement,'achievement');

    },[])

    const animate = () => {
        timeLine.from(about,1,{y:-200,opacity:0,ease:Power2.easeInOut})
                .from(description,1,{x:-100,scale:1.6,opacity:0,ease:Power2.easeInOut});
        

    }
    const animateHeading = async (heading,field) => {

        if(hovered.includes(field)){
            return;
        }

        setHovered([...hovered,field]);
        await timeLine.to(heading,0.5,{css:{'margin-top':'5vh','font-size':'42px',"width":'fit-content','border':"2px solid white"},ease:Power2.easeOut})
                        .staggerTo(cardRef.current[field], 1, {
            scale: 1,
            opacity:1
          }, 0.3);
    }

    const big = (index,heading) => {
        // timeLine.to(cardRef.current[heading][index],0.1,{scale:1.1,ease:Power2.easeInOut});
    }

    const normal = (index,heading) => {
        // timeLine.to(cardRef.current[heading][index],0.1,{scale:1,ease:Power2.easeInOut});
    }

    return (
        <div className="about" ref={(el) => {about = el}}>
            <div className="container" >
            <div className="heading">
                About
            </div>
            <div className="container-content">
                <div className="description" ref={el => {description = el}}>
                {props.description}
                </div>
            </div>
            </div>
            <div className="container">
            <div className="heading margin-above" id="experiance" ref={(el) => {experiance = el}} onMouseEnter={() => animateHeading(experiance,'experiance')}>
                Experiance
            </div>
            <div className="container-content grid" ref={el => {cardRef.current.experianceGrid = el}}>
                {props.experiance.map((card,index) => {
                    return(
                        <div key={card} ref={el => {cardRef.current.experiance[index]=el}} className="card" onMouseEnter={()=>big(index,'experiance')} onMouseLeave={()=>normal(index,'experiance')}>
                            <div>
                            <div className="card-icon">
                                <GiSuitcase/>
                            </div>
                            <div className="card-heading">{card.name}</div>
                            <div className="card-designation">{card.designation}</div>
                            <div className="card-time">{getFormatedDate(card.start)} - {card.ongoing ? " PRESENT":getFormatedDate(card.end)}</div>
                        
                            </div>
                        </div>

                    )
                })}
            </div>
            </div>
            <div className="container">
            <div className="heading margin-above" ref={(el) => {achievement = el}} onMouseEnter={() => animateHeading(achievement,'achievement')}>
                Achievements
            </div>
            <div className="container-content grid" ref={el => {cardRef.current.achievementGrid = el}}>
                {props.achievements.map((card,index) => {
                    return(
                        <div key={card} ref={el => {cardRef.current.achievement[index]=el}} className="card" onMouseEnter={()=>big(index,'achievement')} onMouseLeave={()=>normal(index,'achievement')}>
                            <div>
                            <div className="card-icon">
                                <GiAchievement/>
                            </div>
                            <div className="card-heading">{card.title}</div>
                            <div className="card-designation url" onClick={()=> window.open(card.url)}>See Achievement</div>
                            </div>
                        </div>

                    )
                })}
            </div>
            </div>
        </div>
    );
};

export default About;