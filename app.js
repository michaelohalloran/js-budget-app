
//MONEY ARRAYS
let totals = [];
let incomeAmt = 0;
let expenseAmt = 0;
let overallAmt = 0;
let expenseType = 'income';

const calcTotalMoney = () => {
// const calcTotalMoney = (runningTotal, moneyArr) => {
    // runningTotal += moneyArr.reduce((total,next)=>total+next.amount, 0);

    // console.log('overallAmt from inside calcTotalMoney: ', runningTotal);
    // return runningTotal;
    
    //ALTERNATIVE: If expenseType global is income, add to expenseAmt, otherwise subtract
    //add or subtract latest item
    // expenseType === income ? expenseAmt += totals[totals.length - 1]: expenseAmt -= totals[totals.length -1];  
    overallAmt = incomeAmt - expenseAmt;
    return overallAmt;
}

// const calcIncome = incomeArr => incomeArr.reduce((total,next)=>{
//     return total + next;
// },0) ; 

const calcIncomeOrExpenseTotal = (arr, moneyType) => {
    //return and update incomeAmt if being asked to calc income; otherwise do this for expenses
    let newTotal = arr
        .filter(obj => obj.type === moneyType)
        .reduce((total, next)=> {
            console.log('inCalcIncome, total:', total);
            console.log('inCalcIncome, next amt:', next.amount);
            return total + next.amount; 
    }, 0);
    return moneyType === 'income' ? incomeAmt = newTotal : expenseAmt = newTotal;
}

// const calcIncome = incomeArr => {
//     let newTotalIncome = incomeArr.reduce((total,next)=> total+next.amount,0);
//     incomeAmt += newTotalIncome;
//     console.log('in calcIncome, incomeArr isL: ', incomeArr);
//     console.log('in calcIncome, newTotalIncome and incomeAmt are ', newTotalIncome, incomeAmt);
//     return incomeAmt;
// }
// const calcExpenses = expenseArr => {
//     expenseAmt += expenseArr.reduce((total,next)=> total+next.amount,0);
//     return expenseAmt;
// }

//INPUTS AND BUTTONS
const desc = document.getElementById('desc');
const moneyVal = document.getElementById('money-val');
const toggleType = document.getElementById('select');
const addBtn = document.querySelector('#add-btn');

//DOM DISPLAYS
const incomeDisplay = document.querySelector('#income-display');
const expenseDisplay = document.querySelector('#expense-display');
const totalDisplay = document.querySelector('#total-display');


// *******************************
// DISPLAYS
// *******************************
function updateDisplay(displayType, update) {
    displayType.style.display = 'block';
    displayType.innerHTML = update.toFixed(2);
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


function updateTotalsArr({type, desc, amount}, arr) {
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

// const updateSubArr = (overall, arrToUpdate, moneyType) => {
//     let itemsToAdd = overall.filter(moneyObj => moneyObj.type === moneyType);
//     arrToUpdate.push(itemsToAdd);
//     return arrToUpdate;
// } 

//this should:
// 1. grab input vals
// MAYBE 2. possibly update global expense type
// 3. update totalsArr onclick w/ new item
// 4. from totalsArr, calculate new overall, income, and expense totalAmt
// 5. update displays based on these new totals
// 6. clear inputs
// 7. update table displays at the bottom

function handleAddClick(e) {

    //1. grab input vals
    let type = e.target.parentElement.children.select.value;
    let desc = e.target.parentElement.children.desc.value;
    let amount = e.target.parentElement.children['money-val'].value;
    let moneyObj = {type, desc, amount};

    // 2. update global expenseType
    expenseType = moneyObj.type;
    
    // 3. add money object to totals array (type and amount)
    updateTotalsArr(moneyObj, totals);
    
    // 4. calc new totals (income or expense, overall) from moneyVal
    // update totalAmt or expenseAmt
    calcIncomeOrExpenseTotal(totals, expenseType);
    let newOverall = calcTotalMoney();

    // 5. display new totals:
        //overall amt
    updateDisplay(totalDisplay, newOverall);
        //income or expenses adjusted
    expenseType === 'income' ? updateDisplay(incomeDisplay, incomeAmt) : updateDisplay(expenseDisplay, expenseAmt);

    //clear inputs (don't use variables above, since those are copied by value not reference)
    e.target.parentElement.children.desc.value = '';
    e.target.parentElement.children['money-val'].value = '';
    //increment table at bottom (income or expenses)
}


// *******************************
// LISTENERS
// *******************************

function toggleMoneyMode(e) {
    //this fires when changing select option; it should change expenseType variable, which will change button type
    let options = e.target.options;
    let selectedIndex = e.target.options.selectedIndex;
    let newType = options[selectedIndex].value;
    expenseType = newType;
    applyBtnStyle(newType);
}

function applyBtnStyle(type) {
    let color = (type==='expense') ? 'lightcoral' : 'lightseagreen';
    addBtn.style.backgroundColor = color;
}

function setupListeners() {
    // addBtn.addEventListener('click', sendVals);
    addBtn.addEventListener('click', handleAddClick);
    toggleType.addEventListener('change',toggleMoneyMode);
    // expenseType.addEventListener();
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