//Coffee menu stored in an array 

const menu =[
    {
        name:"Latte",
        price: 5.50
    }
    {
        name:"Flat White",
        price: 5.00 
    }
     {
        name:"Cappucino",
        price: 5.50 
    }
     {
        name:"Mocha",
        price: 6.00 
    }
     {
        name:"Espresso",
        price: 4.00 
    }
];

//variables that change
let cart =[];
let selectedCoffee = null;
let customerName ="";
let total = 0;

//html elements

const menuContainer = document.getElementById("menuContainer");
const cartItems = document.getElementById("cartItems");
const nameForm = document.getElementById("nameForm");
const startButton = document.getElementById("startButton");
const customerInput = document.getElementById("customerInput");

function displayMenu(){
    for(let 0; i < menu.length; i++){
        const coffeeCard = document.createElement("div");
        coffeeCard.className = "coffeeCard";

        coffeeCard.innerHTML = `
        <h3>${menu[i].name</h3>
        <p>$${menu[i].price.toFixed(2)}</p>

        <button>
            Customise
        </button>
        `;

        const button =coffeeCard.querySelector("button");

        button.addEventListener("click", function(){
openCustomForm(menu[i]);
       
});


menuContainer.appencChild(coffeeCard);
   
}
}
