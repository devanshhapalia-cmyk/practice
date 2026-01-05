import Child from './Child.jsx'
function Parent(){
    return (
        <>  
            <h1>this is parent</h1>
            <Child>
                <h2>this is Child in parent</h2>
                <p>props from parent to child through props.children</p>
            </Child>
        </>
    )
}
export default Parent;