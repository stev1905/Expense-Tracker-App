const SAVED_EXPENSES_KEY = 'saved-expenses';

const table = document.getElementById('myTable').getElementsByTagName('tbody')[0];
const firstTd = document.getElementById('first-td');

const button = document.getElementById('addExpenseBtn');
const expenseItem = document.getElementById('validationDefault01');
const amount = document.getElementById('validationDefault02');
const expenseDate = document.getElementById('validationDefault03');
const formOfPayment = document.getElementById('validationDefault04');

const savedExpenses =  getSavedExpenses(); 
savedExpenses.forEach(expense => renderRow(expense));

function renderRow(expense) {
    let tr = document.createElement('tr');

    let dateTd = document.createElement('td');
    dateTd.appendChild(document.createTextNode(expense.date));
    tr.appendChild(dateTd);

    let expenseTd = document.createElement('td');
    expenseTd.appendChild(document.createTextNode(expense.expenseItem));
    tr.appendChild(expenseTd);

    let formOfPaymentTd = document.createElement('td');
    formOfPaymentTd.appendChild(document.createTextNode(expense.formOfPayment));
    tr.appendChild(formOfPaymentTd);

    let amountTd = document.createElement('td');
    amountTd.appendChild(document.createTextNode("$"+expense.amount));
    tr.appendChild(amountTd);

    let deleteButton = document.createElement('span');
    deleteButton.className = 'fa fa-trash-o';
    deleteButton.id = expense.id;
    
    let trashCanTd = document.createElement('td');
    trashCanTd.appendChild(deleteButton);
    tr.appendChild(trashCanTd);
    hideFirstRow(savedExpenses);

    table.appendChild(tr);
}

function checkForEmpty(element) {
    if(!element.value) {
        element.classList.add('invalid-field');
        return false;
    } else {
        element.classList.remove('invalid-field');
        return true;
    }
}

button.addEventListener('click', addExpense);
function addExpense() {
    const invalidItem = checkForEmpty(expenseItem);
    const invalidAmount = checkForEmpty(amount);
    const invalidDate = checkForEmpty(expenseDate);
    const invalidFormOfPayment = checkForEmpty(formOfPayment);

    if(!invalidItem || !invalidAmount || !invalidDate || !invalidFormOfPayment) {
        alert('Please enter a value');
        return;
    } else {
        const expense = {
            id: Math.floor(new Date().getTime() * Math.random()),
            expenseItem: expenseItem.value,
            amount: amount.value,
            date: expenseDate.value,
            formOfPayment: formOfPayment.value,
        }   
        renderRow(expense);
        let savedExpenses = getSavedExpenses();
        savedExpenses.push(expense);
        hideFirstRow(savedExpenses);
        localStorage.setItem(SAVED_EXPENSES_KEY, JSON.stringify(savedExpenses));
        document.getElementById('myForm').reset();
    }
}

table.addEventListener('click', removeExpense);
function removeExpense(e) {  
    if(e.target.classList.contains('fa-trash-o')) {
        if(confirm('Do you want to delete this item?')) {
            let tr = e.target.parentElement.parentElement;
            table.removeChild(tr);
            const savedExpenses = getSavedExpenses();
            const expenseDelete = savedExpenses.find(expense => expense.id.toString() === e.target.id);
            const index = savedExpenses.indexOf(expenseDelete);
            savedExpenses.splice(index, 1);
            hideFirstRow(savedExpenses);
            localStorage.setItem(SAVED_EXPENSES_KEY, JSON.stringify(savedExpenses));
        } 
    }
}

function getSavedExpenses() {
    return JSON.parse(localStorage.getItem(SAVED_EXPENSES_KEY)) || [];
}

function hideFirstRow(savedExpenses) {
    if(savedExpenses.length > 0) {
        firstTd.classList.add('do-not-display');
    } else {
        firstTd.classList.remove('do-not-display');
    }
}
