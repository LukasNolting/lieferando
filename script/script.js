let food = [
  {
    name: "Garnelen",
    description:
      "Garnelen mit Kirschtomaten, Lauchzwiebeln, Knoblauch und Tomatensauce",
    price: 9.0,
    category: "Vorspeisen",
  },
  {
    name: "Tomatencremesuppe",
    description: "Tomatensauce und Sahnesauce",
    price: 7.0,
    category: "Vorspeisen",
  },
  {
    name: "Mista Salat",
    description:
      "mit Karotten, Gurken, frischen Tomaten, Zwiebeln, Paprika und Rucola",
    price: 9.0,
    category: "Salate",
  },
  {
    name: "Hirtenkäse Salat",
    description: "mit frischen Tomaten, Gurken, Oliven und Hirtenkäse",
    price: 9.50,
    category: "Salate",
  },
  {
    name: "Pizza Margherita",
    description: "mit Tomatensauce und Käse",
    price: 7.5,
    category: "Pizza",
  },
  {
    name: "Pizza Salami",
    description: "mit Tomatensauce, Käse und Salami",
    price: 8.0,
    category: "Pizza",
  }
];

function noFunction() {
  alert("Aktuell keine Funktion! Danke für dein Verständnis! :)");
}

function render(){
    let content = document.getElementById("card");
    content.innerHTML = "";

    for (let i = 0; i < food.length; i++) {
        var dishes = food[i];
        content.innerHTML += card(i);
    }
}