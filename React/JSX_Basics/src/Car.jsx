function Car(props) {
  return (
    <>
      <h2>My favorite car is a {props.carinfo.name} {props.carinfo.model}!</h2>
      <p>But it has to from {props.years[0]}, {props.years[1]}, or {props.years[2]}.</p>
    </>
  );
}
export default Car;
export function CarParent(props) {
  return (
    <h2>I am a {props.brand}!</h2>
  );
}