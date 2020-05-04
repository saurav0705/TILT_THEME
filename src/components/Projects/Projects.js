import React, { useRef, useState, useEffect } from 'react';
import './Projects.css';
import { TimelineLite, Power2} from "gsap";
import {getFormatedDate} from '../effects';
const Projects = (props) => {
    const [project,setProject] = useState({"name":"","description":"","start":"","end":"","url":"","_id":""})
    let timeLine = new TimelineLite();
    let detailRef = useRef(null);
    let projectRef = useRef(null);
    let cardRef = useRef([]);
    useEffect(()=>{
        timeLine.staggerTo(cardRef.current,0.3,{y:10,opacity:1,ease:Power2.easeInOut},0.2)
    },[])
    const animate = () => {
        timeLine.to(detailRef,0.3,{"css":{"flex":"3"},ease:Power2.easeIn})
                .to(projectRef,0.3,{"css":{"opacity":'1',"scale":"1"},ease:Power2.easeIn});
    }
    const selectProject = (proj) => {
        timeLine.to(projectRef,0.01,{"css":{"opacity":'0',"scale":"0"}});
        setProject({...proj});
        animate()
    }
    return (
        <div className="projects">
            <div className="heading projects">Projects</div>
            {/* <button onClick={()=> animate()}>animate me</button> */}
            <div className="project-grid">
                <div className="project-list">
            {props.projects.map((p,index) => {
                return(
                    <div className={project.name === p.name ? "proj-card selected-color":"proj-card"} key={p.name+index} onClick={()=>selectProject(p)} ref={el => {cardRef.current[index] = el}}>
                    <div className="proj-name">{p.name}</div>
                    
                    </div>
                )
            })}
            </div>
            <div className="project-detail" ref={el => {detailRef = el}}>
                <div className="project-data" ref={el => {projectRef = el}}>
                <div className="project-name">{project.name}</div>
                    <div className="project-description">{project.description}</div>
                    {project.url!==null && project.url.length!==0?<div className="url" onClick={()=> window.open(project.url)}>View</div>:null}
                    <div className="project-started">{getFormatedDate(project.start)} - {project.ongoing ? " PRESENT":getFormatedDate(project.end)}</div>
                        
                </div>
            </div>
            </div>
        </div>
    );
};

export default Projects;