import React from 'react';
import './LoadingData.css';
const LoadingData = (props) => {
    return (
        <div className="loading-data">
            <div className="loading-bar" style={{'width':props.loading+'%'}}></div>
            <div className="loading-precentage">{props.loading}%</div>
            
        </div>
    );
};

export default LoadingData;