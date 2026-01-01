import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import {Car} from './ClassComponent.jsx';
import {Bike} from './Bike.jsx'
import CarProps from './Car.jsx'
import Garage from './Garage.jsx'
import DestructuringProps from './DestructuringProps.jsx';
import Parent from './Parent.jsx';
import Conditions from './Conditions.jsx'
import AddUser from './AddUser.jsx';
const myElement = React.createElement('h1', {}, 'here JSX is not used');
const JSXElement = <h1>This uses JSX</h1>;
const ExpressionsElement = <h1>React is {5 + 5} times better with JSX</h1>;
let x = [1964, 1965, 1966];
let y = {name: "Ford", model: "Mustang"};
const list = (
  <ul>
    <li>Apples</li>
    <li>Bananas</li>
    <li>Cherries</li>
  </ul>
);

const closeElement = <input type="text" placeholder="close the empty elements" />;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {myElement}
    {JSXElement}
    {ExpressionsElement}
    {list}
    {closeElement}
    <App />
    <Car />
    {/* <Bike name="Hero"/> can pass single and multiple parameter */}
    <Bike name="TVS" model="raider" />
    <CarProps years={x} carinfo={y} />
    <Garage />
    <DestructuringProps name="Mustang" year="1999" color="red" />
    <Parent />
    <Conditions brand="Ford" isGoal={true} />
    <AddUser></AddUser>
  </StrictMode>
);

