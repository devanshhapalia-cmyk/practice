import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import {Car} from './ClassComponent.jsx';
import {Bike} from './Bike.jsx'
import CarProps from './Car.jsx'
import Garage from './Garage.jsx'
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
  </StrictMode>
);

