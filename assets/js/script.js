const initText = 'Agregar Gasto';
const updateText = 'Actualizar Gasto';

let expenseNameList = [];
let expenseDescriptionList = [];
let expenseValueList = [];
let itemId = null;
let saveButton = document.getElementById('botonFormulario');
let cancelButton = document.getElementById('botonCancelar');

//Esta función se usa cuando el usuario da clic en Guardar Gasto
function clickBoton() {
    let expenseName = document.getElementById('nombreGasto').value;
    let expenseValue = document.getElementById('valorGasto').value;
    let expenseDescription = document.getElementById('descriptionGasto').value;

    if(expenseValue > 500) alert('Este gasto es mayor a 500 Euros ¡Ten cuidado!');

    if(itemId != null && itemId != undefined) 
    {
        expenseNameList[itemId] = expenseName;
        expenseValueList[itemId] = expenseValue;
        expenseDescriptionList[itemId] = expenseDescription;
    }
    else 
    {
        expenseNameList.push(expenseName);
        expenseValueList.push(expenseValue);
        expenseDescriptionList.push(expenseDescription);
    }

    updateExpenseList();
}

function updateExpenseList() {
    //Es const ya que no cambia
    const elementList = document.getElementById('listaDeGastos');
    const elementTotal = document.getElementById('totalGastos');

    let htmlList = '';
    let expenseTotal = 0;

    expenseNameList.forEach((element, position) => 
    {
        const expenseValue = Number(expenseValueList[position]);
        const expenseDescription = expenseDescriptionList[position];
        htmlList += `<li>
                ${element} - Euros ${expenseValue.toFixed(2)} (${expenseDescription})
                <button onclick="removeExpense(${position});">Eliminar</button>
                <button onclick="loadUpdate(${position});">Actualizar</button>
            </li>`;
        expenseTotal += Number(expenseValue);
    });

    if (expenseTotal > 2000) {
        alert('¡Cuidado! El gasto total supera los 2000 euros');
      }

    elementList.innerHTML = htmlList;
    //toFixed → poner solo 2 posiciones si es decimal
    elementTotal.innerHTML = expenseTotal.toFixed(2);

    clean();
}

function clean() {
    document.getElementById('nombreGasto').value = '';
    document.getElementById('descriptionGasto').value = '';
    document.getElementById('valorGasto').value = '';
    itemId = null;
    saveButton.innerText = initText;
    cancelButton.style.display = 'none';
}

function removeExpense(position) {
    expenseNameList.splice(position, 1);
    expenseValueList.splice(position, 1);
    expenseDescriptionList.splice(position, 1);

    updateExpenseList();
}

function loadUpdate(position) {
    itemId = position;
    document.getElementById('nombreGasto').value = expenseNameList[itemId];
    document.getElementById('descriptionGasto').value = expenseDescriptionList[itemId];
    document.getElementById('valorGasto').value = expenseValueList[itemId];
    saveButton.innerText = updateText;
    cancelButton.style.display = 'inline';
}