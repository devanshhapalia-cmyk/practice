import UseCheckWindowSize from "./UseCheckWindowSize";


export default function CheckSize(){

    const w=UseCheckWindowSize();
    return (
        <>
            
        <p>window size is greater than 600px or not : {w<600?"false":"true" }</p>
        </>
    )
}