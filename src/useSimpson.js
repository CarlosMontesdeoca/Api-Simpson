import React, { useState, useEffect } from "react";

const useSimpson = () => {
    const [simpson, setSimpson] = useState([]);
    
    useEffect( () => {
    const getSimpson = async() => {
      const response = await fetch("https://thesimpsonsquoteapi.glitch.me/quotes"
      );
      const simpsonsArray = await response.json();
      console.log("simpsonsArray", simpsonsArray[0]);
      console.log("simpson", simpson);
      setSimpson(simpsonsArray);
    };
    getSimpson();
  }, []);
}

export default useSimpson;