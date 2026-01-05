import React from "react";
// import { useState } from "react";
export default function PropsChildToParent({ onSend }) {
    return (

        <>
            <button onClick={() => onSend("data is coming from child to parent")}>Send Data from child to parent</button>
        </>
    )
}