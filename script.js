
  const form = document.getElementById('frm');
const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');
const cityInput = document.getElementById('city');
// Select the first tbody in the document (your table)
const tableBody = document.querySelector('table tbody');

let editRowRef = null;

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = nameInput.value.trim();
    const age = ageInput.value.trim();
    const city = cityInput.value.trim();

    if (!name || !age || !city) return;

    if (editRowRef === null) {
        addRow(name, age, city);
    } else {
        updateRow(editRowRef, name, age, city);
        editRowRef = null;
        form.querySelector('button[type="submit"]').innerHTML = '<ion-icon name="save-outline"></ion-icon> Save';
    }
    form.reset();
});

function addRow(name, age, city) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td></td>
        <td>${name}</td>
        <td>${age}</td>
        <td>${city}</td>
        <td>
            <button class="btn-edit"><ion-icon name="create"></ion-icon></button>
        </td>
        <td>
            <button class="btn-delete"><ion-icon name="trash"></ion-icon></button>
        </td>
    `;
    tableBody.appendChild(row);

    row.querySelector('.btn-edit').onclick = () => editRow(row);
    row.querySelector('.btn-delete').onclick = () => {
        row.remove();
        updateSerialNumbers();
    };
    updateSerialNumbers();
}

function editRow(row) {
    const cells = row.querySelectorAll('td');
    nameInput.value = cells[1].textContent;
    ageInput.value = cells[2].textContent;
    cityInput.value = cells[3].textContent;
    editRowRef = row;
    form.querySelector('button[type="submit"]').innerHTML = '<ion-icon name="save-outline"></ion-icon> Update';
}

function updateRow(row, name, age, city) {
    row.children[1].textContent = name;
    row.children[2].textContent = age;
    row.children[3].textContent = city;
}

function updateSerialNumbers() {
    // Update S.no for all rows
    Array.from(tableBody.children).forEach((row, idx) => {
        row.children[0].textContent = idx + 1;
    });
}

// Attach edit/delete to the static row if present
window.addEventListener('DOMContentLoaded', () => {
    Array.from(tableBody.children).forEach(row => {
        if (!row.querySelector('.btn-edit')) return;
        row.querySelector('.btn-edit').onclick = () => editRow(row);
        row.querySelector('.btn-delete').onclick = () => {
            row.remove();
            updateSerialNumbers();
        };
    });
    updateSerialNumbers();
});