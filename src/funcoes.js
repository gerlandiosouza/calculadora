import {
    displayNumber,
    numbValues,
    selectOp
    
} from './script.js'

//global variables

export let numberToOperation=0;
export let getOp="";
export let operInProgress = "";
export let inProgressToequal = "";
export let afterEqual = false;

//arrays of received numbers
let receivedsNumbers = [];
let arrayDisplay =[];


//operations functions

const totalSumArray = () => {
    let total = receivedsNumbers.reduce((a=0, b) => a + b);
    return total;
}

const retentionTotal = () => {
      
   addNumbReceiveds(numberToOperation);
   let retainedNumber = receivedsNumbers[0];
   
   receivedsNumbers[1]=null;
   
   updateDisplay(retainedNumber);
   getOp=operInProgress;
   afterEqual=false;

}


// equations
const sum = () => {   
    if (operInProgress!==getOp) {      
        
        retentionTotal();
        operInProgress = "+";
        inProgressToequal = "+";
               
    }  
     else {
        addNumbReceiveds();         
            let totalToDisplay = totalSumArray();
            numberToOperation = totalToDisplay;  
            receivedsNumbers = [numberToOperation];            
            inProgressToequal = "+";
            updateDisplay(totalToDisplay);
     } 
}  


const subtract = () => {        

    if (operInProgress!==getOp) {  

        retentionTotal();
        operInProgress = "-";
        inProgressToequal = "-";
        
    }  
    else {

        addNumbReceiveds();       
        let resultSub = receivedsNumbers.reduce((a, b) => a - b);
        numberToOperation = resultSub; 
        receivedsNumbers = [numberToOperation] ;     
        inProgressToequal = "-";
        updateDisplay(resultSub);
    }
}


const multiply = (a, b) => {
    if (operInProgress!==getOp) {      
        
    addNumbReceiveds(numberToOperation);
    
    receivedsNumbers[1]=1;
   
    updateDisplay(numberToOperation);
    
    getOp=operInProgress;
    afterEqual=false;

    operInProgress = "x";
    inProgressToequal = "x";
    
    receivedsNumbers=[];
    receivedsNumbers.push(numberToOperation);
       
    }  
     
    else {
   
    addNumbReceiveds();

    let resultMult = receivedsNumbers.reduce((a, b) => a * b);
    numberToOperation = resultMult;
    inProgressToequal = "x";
      
    updateDisplay(resultMult);
    
    }
}

const divide = (a, b) => {

    if (operInProgress!==getOp) {      
        
        addNumbReceiveds(numberToOperation);
        let retainedNumber = receivedsNumbers[0];
        
        receivedsNumbers[1]=1;
       
        updateDisplay(numberToOperation);
    
        getOp=operInProgress;
        afterEqual=false;

        operInProgress = "/";
        inProgressToequal = "/";

        receivedsNumbers=[];
        receivedsNumbers.push(numberToOperation);
           
        }  
         
        else  {
       
        addNumbReceiveds();
          
        let resultDivide = receivedsNumbers.reduce((a, b) => a / b);
        numberToOperation = resultDivide;
        inProgressToequal = "/";        
      
        updateDisplay(resultDivide);        
    }

}

//use of CE
const clearAll = () => {
    arrayDisplay = [];
            receivedsNumbers = [];
            numberToOperation = 0;
            getOp = "";
            operInProgress = "";
            inProgressToequal="";
            afterEqual=false;
            updateDisplay();
}

// if click '=' call  equal function

const equalFunc = () => {
    switch (inProgressToequal) {
        case "+":

            if (afterEqual==false) {
            addNumbReceiveds();         
            let totalToDisplay = totalSumArray();
            numberToOperation = totalToDisplay;  
            receivedsNumbers = [numberToOperation] ;
           
            inProgressToequal = "+";
            
            updateDisplay(totalToDisplay);
            afterEqual = true;
         

            } else {
                clearAll()
            }

            break;
        case "-":

            if (afterEqual==false) {
            addNumbReceiveds();       
            let resultSub = receivedsNumbers.reduce((a, b) => a - b);
            numberToOperation = resultSub; 
            
            inProgressToequal = "-";
           
            updateDisplay(resultSub);
            afterEqual = true;
            receivedsNumbers=[];

            } else {
            clearAll()
            }

            break;
        case "x":
            if (afterEqual==false) {
            addNumbReceiveds();

            let resultMult = receivedsNumbers.reduce((a, b) => a * b);
            numberToOperation = resultMult;
            inProgressToequal = "x";
            
            updateDisplay(resultMult);
            afterEqual=true;
            receivedsNumbers=[];

            } else {
            clearAll()
            }

            break;
        case "/":
            if (afterEqual==false) {
            addNumbReceiveds();
          
            let resultDivide = receivedsNumbers.reduce((a, b) => a / b);
            numberToOperation = resultDivide;
            inProgressToequal = "/";
                          

            updateDisplay(resultDivide);
            afterEqual=true;
            receivedsNumbers=[];
            
            } else {

            clearAll()

            }
           
            break;
    }
   
};
                   

const updateDisplay = (value) => {
      displayNumber.textContent =  value || arrayDisplay.join('') || 0; 
};

const addNumbReceiveds = () => {

    receivedsNumbers.push(numberToOperation);
    
    arrayDisplay = [];
    updateDisplay();
};

//functions selecting the operation

selectOp.forEach((button) => {
    button.addEventListener('click', (e) => {
        getOp = e.target.value;
        calOperations();

})})


// function to take numbers and clear display
numbValues.forEach((button) => {
    button.addEventListener('click', (e) => {
        const getNumber = e.target.value;

        if (getNumber === "CE") { 
            arrayDisplay = [];
            receivedsNumbers = [];
            numberToOperation = 0;
            getOp = "";
            operInProgress = "";
            inProgressToequal="";
            afterEqual=false;
            updateDisplay();
            return;
        }


    if (arrayDisplay.length < 12) {
        arrayDisplay.push(getNumber);
        numberToOperation = Number(arrayDisplay.join(""));
        updateDisplay();
    }
})
});


//function calling the operations
const calOperations = (getop)=> {
        const result = 0; 
        switch (getOp) {
            case '+':
                sum (); 
               
                break;
            case '-':
                subtract();           
               
                break;
            case 'x':
               multiply ();
               getOp = "";   
                break;
            case '/':
               divide();
               getOp = "";    
                break;

            case '=':
               equalFunc ();
                 
                break;  

            default:
                break;
        }
   
    };




