let likequery = [];

let menu = [
  {
    name: "Pizzabrötchen",
    description: "Pizzabrötchen mit Käse",
    price: 6.5,
  },
  {
    name: "Hirtenkäse Salat",
    description: "mit frischen Tomaten, Gurken, Oliven und Hirtenkäse",
    price: 7.5,
  },
  {
    name: "Pizza Margherita",
    description: "mit Tomatensauce und Käse",
    price: 9.5,
  },
  {
    name: "Pizza Salami",
    description: "mit Tomatensauce, Käse und Salami",
    price: 10.5,
  },
  {
    name: "Coca-Cola 1,0l",
    description: "Coca-Cola steht für einzigartigen Geschmack.",
    price: 2.0,
  },
];

let nameFood = [];
let prices = [];
let amounts = [];

loadFromLocalStorageAmounts();
loadFromLocalStorageBasket();
loadFromLocalStoragePrices();
loadFromLocalStorageLiked();

function noFunction() {
  alert("Aktuell keine Funktion! Danke für dein Verständnis! :)");
}

function render() {
  let content = document.getElementById("cards");
  content.innerHTML = "";

  for (let i = 0; i < menu.length; i++) {
    content.innerHTML += card(i);
  }

  let likeIconCSS = likequery ? "heartfill" : "heartnofill";
  document.getElementById(`liked`).classList.add(likeIconCSS);
}


function likeCheck() {
  let likedIcon = document.getElementById("liked");

  if (likequery) {
    likequery = false;
    likedIcon.classList.remove("heartfill");
    likedIcon.classList.add("heartnofill");
  } else {
    likequery = true;
    likedIcon.classList.remove("heartnofill");
    likedIcon.classList.add("heartfill");
  }
    saveToLocalStorage();
}

function card(i) {
  let dishes = menu[i];
  return /*html*/ `<div class="card" onclick="addToBasket(${i})">
            <div class="card-content">
              <div class="flex-mid-hor menu-head">
                <div class="flex-mid-hor">
                  <span class="menu-text">${dishes["name"]}</span>
                  <img
                    src="./img/icons/info.svg"
                    alt="info"
                    class="card-icon"
                    onclick="noFunction()"
                  />
                </div>
                <img
                  src="./img/icons/plus.svg"
                  alt="add"
                  class="card-menu-add"
                />
              </div>
            </div>
            <span
              >${dishes["description"]}</span>
            <span class="menu-text">${dishes["price"].toFixed(2)}€</span>
          </div>`;
}

function renderBasket() {
  let basketElement = document.getElementById("basket-card");
  let basketElementRes = document.getElementById("basket-position-res");
  
  basketElement.innerHTML = "";
  for (let i = 0; i < nameFood.length; i++) {
    basketElement.innerHTML += basketCard(i);
  }
  basketElementRes.innerHTML = "";
  for (let i = 0; i < nameFood.length; i++) {
    basketElementRes.innerHTML += basketCard(i);
  }
  document.getElementById("total-amount").innerHTML = '';
  document.getElementById("total-amount-resp").innerHTML = '';
  displayTotal();
  basketResponsiveText();
  displayTotalResponsive();  
  saveToLocalStorage();
}

function basketCard(i) {
  let subtotal = prices[i] * amounts[i];
  return /*html*/ `            
    <div class="basket-position" id="basket-position">
      <div class="basket-position-head">
        <span>${nameFood[i]}</span>
        <span>${subtotal.toFixed(2)} €</span>
      </div>
      <div class="basket-position-value">
        <img src="./img/icons/minus.svg" 
        alt="minus" 
        class="basket-position-value-icon"
        onclick="decreaseAmount(${i})">
        <span class="basket-position-value-text">${amounts[i]}</span>
        <img src="./img/icons/plus.svg" 
        alt="plus" 
        class="basket-position-value-icon"
        onclick="increaseAmount(${i}), saveToLocalStorage();">
      </div>
    </div>`;
}

function addToBasket(i) {
  let index = getIndex(menu[i]["name"]);

  if (index == -1) {
    nameFood.push(menu[i]["name"]);
    prices.push(menu[i]["price"].toFixed(2));
    amounts.push(1);
  } else {
    amounts[index]++;
  }
  renderBasket();
  saveToLocalStorage();
}

function getIndex(i) {
  index = nameFood.indexOf(i);
  if (index != -1) {
    return index;
  } else {
    return -1;
  }
}

function increaseAmount(i) {
  amounts[i]++;
  renderBasket();
  saveToLocalStorage();
}

function decreaseAmount(i) {
  if (amounts[i] > 0) {
    amounts[i]--;

    if (amounts[i] === 0) {
      nameFood.splice(i, 1);
      prices.splice(i, 1);
      amounts.splice(i, 1);
      document.getElementById("total-amount").classList.remove("total-amount-yellow");
      document.getElementById("total-amount-resp").classList.remove("total-amount-yellow");
    }
  }
  renderBasket();
  saveToLocalStorage();
}

function calculateTotalAmount() {
  let totalAmount = 0;

  for (let i = 0; i < nameFood.length; i++) {
    totalAmount += prices[i] * amounts[i];
  }
  return totalAmount;
}

function basketResponsiveText() {
  let subtotal = calculateTotalAmount();
  let responsiveBasketTextElement = document.getElementById("openResponsiveBasketText");
  responsiveBasketTextElement.innerHTML = /*html*/ `
  <span class="basket-responsive-text">Warenkorb (${subtotal.toFixed(2)} €)</span>`;
}


function displayTotal() {
  let subtotal = calculateTotalAmount();
  if (subtotal == 0) {
    document.getElementById("basket-card").innerHTML = emptyBasket();
  } else {
    if (subtotal < 15) {
      document.getElementById("total-amount").innerHTML = minOrderValueText();
      document.getElementById("total-amount").classList.add("total-amount-yellow");
      document.getElementById("total-amount").classList.remove("total-amount-green");
    } else {
      document.getElementById("total-amount").innerHTML = orderFinishedText();
      document.getElementById("total-amount").classList.remove("total-amount-yellow");
      document.getElementById("total-amount").classList.add("total-amount-green");
    }
  }
}
function displayTotalResponsive() {
  let subtotal = calculateTotalAmount();
  if (subtotal == 0) {
    document.getElementById("basket-position-res").innerHTML = emptyBasket();
  } else {
    if (subtotal < 15) {
      document.getElementById("total-amount-resp").innerHTML = minOrderValueText();
      document.getElementById("total-amount-resp").classList.add("total-amount-yellow");
      document.getElementById("total-amount-resp").classList.remove("total-amount-green");
    } else {
      document.getElementById("total-amount-resp").innerHTML = orderFinishedText();
      document.getElementById("total-amount-resp").classList.remove("total-amount-yellow");
      document.getElementById("total-amount-resp").classList.add("total-amount-green");
    }
  }
}

function minOrderValue() {
  alert("Mindestbestellwert nicht erreicht!");
}

function minOrderValueText() {
  let subtotal = calculateTotalAmount();
  let remainingAmount = 15 - subtotal;
  return /*html*/ `
            <span> Gesamtsumme: ${subtotal.toFixed(2)} €</span> 
            <span> Bis zum Mindestbestellwert: ${remainingAmount.toFixed(2)} €</span>
            <button class="button-no-function" onclick="minOrderValue()">Bestellen (${subtotal.toFixed(2)} €)</button>`;
}

function orderFinishedText() {
  let subtotal = calculateTotalAmount();
  let totalAmount = subtotal + 3;
  return /*html*/`
            <span> Zwischensumme: ${subtotal.toFixed(2)} €</span>
            <span> Lieferkosten: 3.00 € </span>
            <button class="button-order-finish" onclick="orderFinished()">Bestellen (${totalAmount.toFixed(2)} €)</button>`
}

function orderFinished() {
  alert("Vielen Dank für Ihre Bestellung!");
  nameFood.splice(0, nameFood.length);
  prices.splice(0, prices.length);
  amounts.splice(0, amounts.length);
  document.getElementById("total-amount").classList.remove("total-amount-green");
  document.getElementById("total-amount").classList.remove("total-amount-yellow");
  document.getElementById("total-amount-resp").classList.remove("total-amount-green");
  document.getElementById("total-amount-resp").classList.remove("total-amount-yellow");
  renderBasket();
  saveToLocalStorage();
}

function emptyBasket() {
  return /*html*/ `<div class="basket-empty" id="basket-empty">
            <img src="./img/icons/basket.svg" alt="basket-image" class="basket-image">
            <span class="text-bold-20">Fülle deinen Warenkorb</span>
            <span>Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen.</span>
            </div>`;          
}

function saveToLocalStorage() {
  localStorage.setItem("nameFood", JSON.stringify(nameFood));
  localStorage.setItem("prices", JSON.stringify(prices));
  localStorage.setItem("amounts", JSON.stringify(amounts));
  localStorage.setItem("likequery", JSON.stringify(likequery));
}

function loadFromLocalStorageBasket() {
  let storageAsText = localStorage.getItem("nameFood");

  if (storageAsText) {
    nameFood = JSON.parse(storageAsText);
  }
}
function loadFromLocalStoragePrices() {
  let storageAsText = localStorage.getItem("prices");

  if (storageAsText) {
    prices = JSON.parse(storageAsText);
  }
}
function loadFromLocalStorageAmounts() {
  let storageAsText = localStorage.getItem("amounts");

  if (storageAsText) {
    amounts = JSON.parse(storageAsText);
  }
}
function loadFromLocalStorageLiked() {
  let storageAsText = localStorage.getItem("likequery");

  if (storageAsText) {
    likequery = JSON.parse(storageAsText);
  }
}

function openResponsiveBasket() {
  document.getElementById("openResponsiveBasket").classList.remove("d-none");
  document.getElementById("openResponsiveBasketPos").classList.remove("d-none");
  document.getElementById("openResponsiveBasketText").classList.add("d-none");

}

function closeResponsiveBasket() {
  document.getElementById("openResponsiveBasket").classList.add("d-none");
  document.getElementById("openResponsiveBasketPos").classList.add("d-none");
  document.getElementById("openResponsiveBasketText").classList.remove("d-none");
}