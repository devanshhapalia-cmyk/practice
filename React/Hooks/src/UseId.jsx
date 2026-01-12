import { useId } from "react";


function UseId(){
    const passcodeId=useId();
    return <>
    <div>UseId Hook</div>
    <label htmlFor={passcodeId}>Passcode:</label>
    <input id={passcodeId} type="text" />
    <p>{passcodeId}</p>
    </>

}
export default UseId;