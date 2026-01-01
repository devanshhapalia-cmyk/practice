

function DestructuringProps(props) { //THIS CAN ALSO BE DONE AS function DestructuringProps({prop1,prop2})
    const {name,year,...rest}=props;
    return (
        <>
            <h1>This is Destructing of props car:{name} and manufacturing year:{year} with color:{rest.color}</h1>
        </>
    )
}


export default DestructuringProps
