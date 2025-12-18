console.log(new Date())//day month date year time user zone e.g. Indian Standard time GMT

let d = new Date("2022-03-25");
console.log(d);
// console.log(new Date(String));
d = new Date("October 13, 2014 11:13:00");
console.log(d);
// console.log(new Date(year,month));
d = new Date("2022-03-25");
console.log(d);
// 7 numbers specify year, month, day, hour, minute, second, and millisecond (in that order):
d = new Date(2018, 11, 24, 10, 33, 30, 0);
console.log(d);

// Specifying a month higher than 11, will not result in an error but add the overflow to the next year
d = new Date(2018, 15, 24, 10, 33, 30);//month 3 same
console.log(d);
d = new Date(2018, 5, 35, 10, 33, 30);
console.log(d)//valid day 35 means day 5


// 5 numbers specify year, month, day, hour, and minute:
d = new Date(2018, 11, 24, 10, 33);
console.log(d);
d = new Date(2018);//millisecond ot year
console.log(d);

d = new Date(99, 11, 24);
console.log(d);

d = new Date(9, 11, 24);
console.log(d);

d = new Date(100000000000);//01 January 1970 plus 100 000 000 000 milliseconds is:
console.log(d);

// January 01 1970 plus 24 hours is:
d = new Date(24 * 60 * 60 * 1000);
// or
d = new Date(86400000);
console.log(d);


d = new Date(0);
console.log(d);