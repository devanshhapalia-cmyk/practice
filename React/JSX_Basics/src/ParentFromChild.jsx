import PropsChildToParent from "./PropsChildToParent"
export default function ParentFromChild(){
    const handleClick=(data)=>{
        console.log(data)
    };
    return (
        <>
             <PropsChildToParent onSend={handleClick}></PropsChildToParent>
        </>
    )
}