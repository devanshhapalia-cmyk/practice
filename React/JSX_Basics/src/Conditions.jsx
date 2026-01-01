
function Conditions(props){

        return (
            <>
                {props.brand && <h1>Condition checked on props.brand and then display brand:{props.brand}</h1> }
                <h1>Goal Status using ternary operator</h1>{ props.isGoal ? <MadeGoal/> : <MissedGoal/> }
            </>
        )
}
export default Conditions;

function MissedGoal() {
  return <h1>MISSED!</h1>;
}

function MadeGoal() {
  return <h1>Goal!</h1>;
}