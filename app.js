
//MONEY ARRAYS
let income = [];
let expenses = [];
let totals = [];
let overallAmt = 0;

const calcTotal = (runningTotal, moneyArr) => {
    runningTotal += moneyArr.reduce((total,next)=>total+next.amount, 0);
    console.log('overallAmt from inside calcTotal: ', runningTotal);
    return runningTotal;
}

//INPUTS AND BUTTONS
const desc = document.getElementById('desc');
const moneyVal = document.getElementById('money-val');
const addBtn = document.querySelector('#add-btn');

//DOM DISPLAYS
const incomeDisplay = document.querySelector('#income-display');
const expenseDisplay = document.querySelector('#expense-display');
const totalDisplay = document.querySelector('#total-display');


// *******************************
// DISPLAYS
// *******************************
function updateDisplay(displayType, update) {
    displayType.innerHTML = update;
}

// *******************************
// ADDING MONEY
// *******************************

// //sends input values (sibling inputs) for button just clicked
// function sendVals(e) {
//     console.log('desc val: ', desc.value);
//     console.log('money val: ', moneyVal.value);
//     console.log('e: ', e);
//     console.log('e.target.parent select val: ', e.target.parentElement.children.select.value); //can also use .label, .innerText, etc.
//     console.log('e.target.parent desc value: ', e.target.parentElement.children.desc.value);
//     console.log('e.target.parent money val: ', e.target.parentElement.children['money-val'].value);
//     //reset inputs
//     desc.value = '';
//     moneyVal.value = '';
// }

function parseInputVals({type, desc, amount}, arr) {
    console.log('from parse fn: ', type, desc, amount);
    let moneyObj = {
        type,
        desc,
        //parse moneyVal to number
        amount: +amount,
    }
    arr.push(moneyObj);
    console.log('updated totals Arr: ', arr);
}


function handleAddClick(e) {

    let type = e.target.parentElement.children.select.value;
    let desc = e.target.parentElement.children.desc.value;
    let amount = e.target.parentElement.children['money-val'].value;
    let moneyObj = {type, desc, amount};
    //add money object to totals array (type and amount)
    parseInputVals(moneyObj, totals);
    //calc new totals (income or expense, overall) from moneyVal
    calcTotal(overallAmt, totals);
    //display new totals:
        //overall amt
    updateDisplay(totalDisplay, overallAmt);
        //income or expenses adjusted

    //clear inputs (don't use variables above, since those are copied by value not reference)
    e.target.parentElement.children.desc.value = '';
    e.target.parentElement.children['money-val'].value = '';
    //increment table at bottom (income or expenses)
}



// *******************************
// LISTENERS
// *******************************
function setupListeners() {
    // addBtn.addEventListener('click', sendVals);
    addBtn.addEventListener('click', handleAddClick);
}

//add listener for select: change button style, array and table it will point to

setupListeners();

// *******************************
// DELETING
// *******************************

function handleDelete() {
    console.log('Hit delete');
    //update arrays
    //update displays
    //update tables
}