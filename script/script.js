let food = [
  {
    name: "Garnelen",
    description:
      "Garnelen mit Kirschtomaten, Lauchzwiebeln, Knoblauch und Tomatensauce",
    price: 9.0,
  },
  {
    name: "Tomatencremesuppe",
    description: "Tomatensauce und Sahnesauce",
    price: 7.0,
  },
  {
    name: "Mista Salat",
    description:
      "mit Karotten, Gurken, frischen Tomaten, Zwiebeln, Paprika und Rucola",
    price: 9.0,
  },
  {
    name: "Hirtenkäse Salat",
    description: "mit frischen Tomaten, Gurken, Oliven und Hirtenkäse",
    price: 9.5,
  },
  {
    name: "Pizza Margherita",
    description: "mit Tomatensauce und Käse",
    price: 7.5,
  },
  {
    name: "Pizza Salami",
    description: "mit Tomatensauce, Käse und Salami",
    price: 8.0,
  },
];

function noFunction() {
  alert("Aktuell keine Funktion! Danke für dein Verständnis! :)");
}

function render() {
  let content = document.getElementById("cards");
  content.innerHTML = "";

  for (let i = 0; i < food.length; i++) {
    const post = food[i];
    content.innerHTML += card(i);
  }
}

function card(i) {
  const dishes = food[i];
  return /*html*/ `<div class="card" onclick="noFunction()">
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
            <span class="menu-text">9,00 €</span>
          </div>`;
}
