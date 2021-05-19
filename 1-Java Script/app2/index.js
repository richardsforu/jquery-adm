/*

   HTML / CSS - W3C recamendation

   Ecma-Script (ES) - Java Script 
   ES-5 - OLD
   ES-6 - New style of coding and features added


*/
var a=10; // ES5
let b= 20; // Es6

var a=30;
var a=40;
var a=50;

//let b=60;



// Es5
function add(a,b){
    return a+b;
}

console.log(add(10,200));

// Es6=
let sum=(a,b)=>a+b;

console.log(sum(3,6));

//-----------------------------------------

/*

    Function Scopes
    --------------------
    1. context / push :
    -> any variable defined with 'var' goes to the top od thew context
    2. execution context
    -> always get executed in a sequence

 Types of Functions
 ------------------------
 1. named functions
 2. anonymous functions

  1. named functions
  ----------------------

**/




var x;
f1();

function f1(){
  console.log(">>>> "+x);
}

x=10;



var f2=function(a,b){

    console.log(a+b);
}

f2(10,20);





