
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://playground-5347d-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(appSettings);

const database = getDatabase(app);

const shoppingInDB = ref(database, "shoppingList");

var cartItem = document.querySelector("#input-field");
var addButton = document.querySelector("#add-button");

var shoppingList = document.querySelector("#shopping-list");

onValue(shoppingInDB, function (snapshot) {

    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val());

        console.log(itemsArray);

        clearItemsList();

        for (let i = 0; i < itemsArray.length; i++) {
            addItemToShoppingList(itemsArray[i]);
        }
    }
    else {
        shoppingList.innerHTML = "<span style='text-align: center;font-weight: 600;font-family: monospace;'>No items here...</span>";
    }


});

function clearItemsList() {
    shoppingList.innerHTML = "";
}

document.addEventListener("keydown", function (event) {
    if (event.key == 'Enter') {
        addButton.click();
    }
});

addButton.addEventListener("click", function () {
    var inputValue = cartItem.value;

    push(shoppingInDB, inputValue);
    console.log(inputValue + " : Inserted into the DataBase");

    clearInputField();
});

function addItemToShoppingList(item) {
    // shoppingList.innerHTML += `<li>${item}</li>`;

    let itemID = item[0];
    let itemValue = item[1];

    let newElement = document.createElement("li");

    newElement.textContent = itemValue;

    shoppingList.append(newElement);

    newElement.addEventListener("click", function () {
        let locationOfItemInDB = ref(database, "shoppingList/" + itemID);

        remove(locationOfItemInDB);
    });
}

function clearInputField() {
    cartItem.value = "";
}