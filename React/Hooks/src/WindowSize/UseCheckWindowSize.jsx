import { useState } from "react";
export default function UseCheckWindowSize() {
   

    const [width,setWidth]=useState(0);  
    window.addEventListener("resize",()=>{
        setWidth(window.innerWidth);
    })    
    return width>600?"true":"false";   
}