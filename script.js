const SAVED_EXPENSES_KEY = 'saved-expenses';

let table = document.getElementById('myTable').getElementsByTagName('tbody')[0];
let button = document.getElementsByClassName('btn btn-primary btn-lg btn-block')[0];

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
    if(savedExpenses.length > 0) {
        document.getElementsByClassName('first-td')[0].style.display ='none';
    } else {
        document.getElementsByClassName('first-td')[0].style.display ='';
    }

    table.appendChild(tr);
}

button.addEventListener('click', addExpense);
function addExpense() {
    const expense = {
        id: Math.floor(new Date().getTime() * Math.random()),
        expenseItem: document.getElementsByTagName('form')[0][0].value,
        amount: document.getElementsByTagName('form')[0][1].value,
        date: document.getElementsByTagName('form')[0][2].value,
        formOfPayment: document.getElementsByTagName('form')[0][3].value,
    }

    renderRow(expense);
    let savedExpenses = getSavedExpenses();
    savedExpenses.push(expense);
    localStorage.setItem(SAVED_EXPENSES_KEY, JSON.stringify(savedExpenses));
    document.getElementById('myForm').reset();
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
            if(savedExpenses.length > 0) {
                document.getElementsByClassName('first-td')[0].style.display ='none';
            } else {
                document.getElementsByClassName('first-td')[0].style.display ='';
            }
            localStorage.setItem(SAVED_EXPENSES_KEY, JSON.stringify(savedExpenses));
        } 
    }
}

function getSavedExpenses() {
    return JSON.parse(localStorage.getItem(SAVED_EXPENSES_KEY)) || [];
}
