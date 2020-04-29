import React, { useState, useRef, useEffect } from 'react';
import './Navbar.css';
import {IoIosMenu} from 'react-icons/io';
import {TweenMax,Power3} from 'gsap';
import Home from '../Home/Home';
import { Switch, Route, useHistory } from 'react-router-dom';
import About from '../About/About';
const Navbar = () => {
    let history = useHistory();
    let tilt = useRef(null);
    const [rotate,setRotate] = useState(true);
    useEffect(()=>{
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
    
    return (
        <div className="main">
            <div className="nav">
                <div className="content-nav">
                    <div className="nav-option" onClick={()=> {history.push('/');toggle()}}>home</div>
                    <div className="nav-option" onClick={()=> {history.push('/about');toggle()}}>About</div>
                    <div className="nav-option"> Skills</div>
                    <div className="nav-option">projects</div>
                    <div className="nav-option">contact</div>
                </div>
            </div>
            <button onClick={()=>toggle()} className="button"><IoIosMenu/></button>
            <div className="content" ref={el => {tilt = el;}}>
                <Switch>
               <Route exact path="/" component={Home}/>
               <Route exact path="/about" component={About}/>
                </Switch>
               </div>
        </div>
    );
};

export default Navbar;