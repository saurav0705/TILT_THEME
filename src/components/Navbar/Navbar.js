import React, { useState, useRef, useEffect } from 'react';
import './Navbar.css';
import {IoIosMenu} from 'react-icons/io';
import {TweenMax,Power3} from 'gsap';
import Home from '../Home/Home';
import { Switch, Route, useHistory } from 'react-router-dom';
import About from '../About/About';
import Skills from '../Skills/Skills';
import Projects from '../Projects/Projects';
import Contact from '../Contact/Contact';
// import data from '../../data.json';
import LoadingData from '../LoadingData/LoadingData';
import {URL} from '../../service';
const Navbar = () => {
    const [loading,setLoading] = useState(true);
    const [data,setData] = useState();
    let history = useHistory();
    let tilt = useRef(null);
    const [selected,setSelected] = useState('');
    const [rotate,setRotate] = useState(true);
    const [percent,setPercent] = useState(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=>{
        const interval = setInterval(()=> setPercent(percent => {if(percent=== 100){console.log("running");clearInterval(interval)}else{ return percent+1}}),100);
        fetch(URL)
            .then(resp => resp.json())
            .then(resp => {setData(resp);setLoading(false);clearInterval(interval)}).catch(err => setData({"error":err}))
        TweenMax.to(tilt,0.2,{css:{
                'transform': 'rotate(0deg)',
                'position': 'absolute',
                /* filter: blur(5px); */
                'filter': 'brightness(1)',
                'overflow': 'scroll',
                'max-width': '100%',
            },ease:Power3.easeInOut})

    },[]);
    const toggle = () =>{
        setRotate(rotate => !rotate);
        if(rotate){
            TweenMax.to(tilt,0.2,{css:{
                'transform': 'rotate(-20deg)',
                'position': 'fixed',
                /* filter: blur(5px); */
                'filter': 'brightness(0.7)',
                'overflow': 'hidden',
                'height': '200vh',
                'max-width': '100vw',
            },ease:Power3.easeInOut})
        }else{
            TweenMax.to(tilt,0.2,{css:{
                'transform': 'rotate(0deg)',
                'position': 'absolute',
                /* filter: blur(5px); */
                'filter': 'brightness(1)',
                'overflow': 'scroll',
                'max-width': '100%',
            },ease:Power3.easeInOut})
            TweenMax.to(tilt,0.2,{css:{'height': '100%'},delay:0.3,ease:Power3.easeInOut})
        }

    }
    const navigate = (path) => {
        setSelected(path);
        history.push('/'+path);
        toggle();
    }
    
    return (<>
        
        <div className="main">
            <div className="nav">
                <div className="content-nav">
                    <div className={selected === '' ? "nav-option highlight":"nav-option"} onClick={()=> navigate('')}>home</div>
                    <div className={selected === 'about' ? "nav-option highlight":"nav-option"} onClick={()=> navigate('about')}>About</div>
                    <div className={selected === 'skills' ? "nav-option highlight":"nav-option"} onClick={() => {navigate('skills')}}> Interest</div>
                    <div className={selected === 'projects' ? "nav-option highlight":"nav-option"} onClick={()=> navigate('projects')}>projects</div>
                    <div className={selected === 'contact' ? "nav-option highlight":"nav-option"} onClick={()=> navigate('contact')}>contact</div>
                </div>
            </div>
            <button onClick={()=>toggle()} className="button"><IoIosMenu/></button>
            <div className="content" ref={el => {tilt = el;}}>
            {loading ? <LoadingData  loading={percent}/>:<Switch>
               <Route exact path="/" render={() => <Home name={data.name} tagline={data.tagline} image={data.displayImage}/>}/>
               <Route exact path="/about" render={() => <About description={data.description} experiance={data.experiance} achievements={data.achievements}/>}/>
               <Route exact path="/skills" render={() => <Skills skills={data.skills} hobbies={data.hobbies} education={data.education}/>}/>
               <Route exact path="/projects" render={() => <Projects projects={data.projects}/>}/>
               <Route exact path="/contact" render={() => <Contact contacts={data.contact} social={{...data.social,...{"email":data.email}}}/>}/>
                </Switch>}
               </div>
        </div></>
    );
};

export default Navbar;