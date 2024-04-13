/* eslint-disable react/prop-types */
// Figure.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const Figure = ({ imageSrc, day, month, heading, description, endpoint}) => {
  return (
    <div style={{ scale: "97%"}}>
      <a style={{color: 'red'}} href={endpoint} >
    <figure className="snip1527">
      <div className="image taskImg"><img style={{width: "421px", height: "400px", borderRadius: "10px", marginTop: "3%"}} src={imageSrc ? imageSrc : undefined} alt="preview" /></div>
      <figcaption>
        <div className="date"><span className="day">{day}</span><span className="month">{month}</span></div>
        <h3>{heading}</h3>
        <p>{description}</p>
      </figcaption>
      <a href="/home"></a>
    </figure>
    </a>
    </div>
  );
};

export default Figure;
