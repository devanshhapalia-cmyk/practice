function Child(props){
    return (
        <>
            <h1>This is Child</h1>
            <div>{props.children}</div>
        </>
    )
}
export default Child;