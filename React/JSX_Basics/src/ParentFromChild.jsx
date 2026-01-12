
import PropsChildToParent from "./PropsChildToParent"
import { useState } from "react"; 
export default function ParentFromChild(){
    const [dd,setData]=useState();
    const handleClick=(data)=>{
        setData(data);
        console.log(data)
    };
    return (
        <>
             <PropsChildToParent onSend={handleClick}></PropsChildToParent>
             <h1>{dd}</h1>
        </>
    )
}