const addButton = document.getElementById('add');
const sortButton = document.getElementById('sort');
const inputField = document.getElementById('input');
const itemListContainer = document.getElementById('item-list');
let itemList = [];
let idCounter = 0;  // Counter to keep track of item IDs

// Function to save itemList to local storage
function saveToLocalStorage() {
    localStorage.setItem('itemList', JSON.stringify(itemList));
    localStorage.setItem('idCounter', idCounter);
}

// Function to load itemList from local storage
function loadFromLocalStorage() {
    const savedItemList = localStorage.getItem('itemList');
    const savedIdCounter = localStorage.getItem('idCounter');
    if (savedItemList) {
        itemList = JSON.parse(savedItemList);
    }
    if (savedIdCounter) {
        idCounter = parseInt(savedIdCounter, 10);
    }
}

// Function to add a new item to the list
function addItem() {
    const inputValue = inputField.value.trim();
    if (inputValue.length > 3 && inputValue.charAt(0) === inputValue.charAt(0).toUpperCase()) {
        // Create a new object with id, name, createdDate, and completed keys
        const newItem = {
            id: ++idCounter,  // Increment and use idCounter as unique ID
            name: inputValue,
            createdDate: new Date().toISOString(),
            completed: false
        };

        // Add the new item to the list
        itemList.push(newItem);

        // Save the updated itemList and idCounter to local storage
        saveToLocalStorage();

        // Update the displayed items
        updateItemList();

        // Clear the input field
        inputField.value = '';
        console.log(itemList);
    } else {
        alert('Please enter a valid item. Constraints: First character must be uppercase, non-empty, and have more than three characters.');
    }
}

// Function to update the displayed items
function updateItemList() {
    itemListContainer.innerHTML = '';
    itemList.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item-container');

        // Create checkbox for the item
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('checkbox');
        checkbox.id = 'checkbox-' + item.id;
        checkbox.checked = item.completed;
        checkbox.addEventListener('change', () => {
            item.completed = checkbox.checked;
            saveToLocalStorage();
            updateItemList();
        });

        // Create span for the item name
        const itemNameSpan = document.createElement('span');
        itemNameSpan.textContent = item.name;

        // Create delete button for the item (cross symbol)
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '&#10005;'; // Cross symbol (×)
        deleteButton.classList.add('delete-button'); // Add the delete button class
        deleteButton.addEventListener('click', () => {
            deleteItem(item.id);
        });

        // Add checkbox, item name, and delete button to the itemDiv
        itemDiv.appendChild(checkbox);
        itemDiv.appendChild(itemNameSpan);
        itemDiv.appendChild(deleteButton);

        // Append the item <div> to the itemListContainer
        itemListContainer.appendChild(itemDiv);
    });
}

// Function to delete an item
function deleteItem(itemId) {
    const index = itemList.findIndex(item => item.id === itemId);
    itemList.splice(index, 1);
    saveToLocalStorage();
    updateItemList();
    console.log(itemList);
}

// Function to sort items in alphabetical order
function sortItems() {
    itemList.sort((a, b) => a.name.localeCompare(b.name));
    saveToLocalStorage();
    updateItemList();
    console.log(itemList);
}

addButton.addEventListener('click', addItem);
sortButton.addEventListener('click', sortItems);

// Optionally, add event listener for Enter key press to add item
inputField.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addItem();
    }
});

// Load items from local storage when the page is loaded
window.addEventListener('load', () => {
    loadFromLocalStorage();
    updateItemList();
});
