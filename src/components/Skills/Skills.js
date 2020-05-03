import React, { useRef, useEffect, useState } from 'react';
import './Skills.css';
import {GiSuitcase} from 'react-icons/gi';
import { TimelineLite, Power2,TweenMax } from "gsap";
import {parrallax} from '../effects';
const Skills = () => {
    let skill=['abc','abc1','abc2','abc3','abc4','abc5'];
    let skillRef = useRef(null);
    let educationRef = useRef(null);
    let hobbiesRef = useRef(null);
    let childRef = useRef({skill:[],education:[],hobbies:[]})
    const [hovered,setHovered] = useState([]);
    let timeLine = new TimelineLite();

    const createObserver = (reference,field) =>{
        let observe = new IntersectionObserver((obj)=>{

            if(obj[0].intersectionRatio > 0){
            animateHeading(reference,field);}

        })
        observe.observe(reference);
    }

    useEffect(()=>{
        createObserver(skillRef,'skill');
        createObserver(hobbiesRef,'hobbies');
        createObserver(educationRef,'education');

    },[])


    const animateHeading = async (heading,field) => {

        if(hovered.includes(field)){
            return;
        }

        setHovered([...hovered,field]);
        await timeLine.to(heading,0.5,{css:{'margin-top':'5vh','font-size':'42px',"padding":"10px","width":'fit-content'},ease:Power2.easeOut})
                        .staggerTo(childRef.current[field], 1, {
            scale: 1,
            opacity:1
          }, 0.3);
    }
    return (
        <div className="skills">
            <div className="heading-main">MY INTERESTS</div>
            <div className="grid-skill">
            
            <div className="conatiner">
                <div className="heading" ref={el => {skillRef = el}}>
                    SKills
                </div>
                <div className="container-content">
                    {skill.map((sk,index) => {return(
                        <div key={sk+"il"} className="tile" ref={el => {childRef.current.skill[index] = el}}>{sk}</div>
                    )})}
                </div>
            </div>
            <div className="conatiner margin-above">
                <div className="heading" ref={el => {hobbiesRef = el}}>
                    hobbies
                </div>
                <div className="container-content">
                    {skill.map((sk,index) => {return(
                        <div key={sk+"hb"} className="tile" ref={el => {childRef.current.hobbies[index] = el}}>{sk}</div>
                    )})}
                </div>
            </div>
            
            </div>
            <div className="conatiner">
                <div className="heading" ref={el => {educationRef = el}}>
                    Education
                </div>
                <div className="container-content grid">
                    {skill.map((sk,index) => {return(
                         <div key={sk+"exp"}  className="card opacity-1" ref={el => {childRef.current.education[index] = el}}>
                         <div>
                         <div className="card-icon">
                             <GiSuitcase/>
                         </div>
                         <div className="card-heading">Chitkara University</div>
                         <div className="card-designation">ABC POSITION</div>
                         <div className="card-time">TIME</div>
                         </div>
                     </div>
                    )})}
                </div>
            </div>
        </div>
    );
};

export default Skills;