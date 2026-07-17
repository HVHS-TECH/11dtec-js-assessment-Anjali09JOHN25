//Coffee menu stored in an array 

const menu =[
    {
        name:"Latte",
        price: 5.50
    },
    {
        name:"Flat White",
        price: 5.00 
    },
     {
        name:"Cappucino",
        price: 5.50 
    },
     {
        name:"Mocha",
        price: 6.00 
    },
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
const customerInput = document.getElementById("customerName");
const coffeeForm = document.getElementById("coffeeForm");
const coffeeTitle = document.getElementById("coffeeTitle");
const cancelButton = document.getElementById("cancelButton");
const addCartButton = document.getElementById("addCartButton");
const milk = document.getElementById("milk");
const temperature = document.getElementById("temperature");
const size = document.getElementById("size");
const totalPrice = document.getElementById("totalPrice");
const placeOrderButton = document.getElementById("placeOrderButton");
const paymentForm = document.getElementById("paymentForm");
const moneyGiven = document.getElementById("moneyGiven");
const confirmOrderButton = document.getElementById("confirmOrderButton");
const receiptForm = document.getElementById("receiptForm");
const receiptText = document.getElementById("receiptText");
const closeReceipt = document.getElementById("closeReceipt");


startButton.addEventListener("click", function() {
    customerName = customerInput.value;
    if (customerName === ""){
        alert("Please enter your name.");
 }  else{
    nameForm.style.display = "none";
    displayMenu ();
}
});

function displayMenu(){
    for(let i = 0; i < menu.length; i++){
        const coffeeCard = document.createElement("div");
        coffeeCard.className = "coffeeCard";

        coffeeCard.innerHTML = `
        <div>
        <h3>${menu[i].name}</h3>
        <p>$${menu[i].price.toFixed(2)}</p>
<button>Customise</button>
        </div>
        `;

        const button =coffeeCard.querySelector("button");

        button.addEventListener("click", function(){
openCustomForm(menu[i]);
       
});


menuContainer.appendChild(coffeeCard);
   
}
}

function openCustomForm(coffee){
   
    selectedCoffee = coffee;
    coffeeTitle.textContent = coffee.name;
    coffeeForm.style.display = "flex";
}

cancelButton.addEventListener("click", function(){
    coffeeForm.style.display = "none";
});

addCartButton.addEventListener("click", function (){

    const finalPrice = selectedCoffee.price + Number(size.value);
    
    const order ={
        name: selectedCoffee.name,
        milk: milk.value,
        temperature: temperature.value,
        size: size.options[size.selectedIndex].text,
        price: finalPrice
    };

    cart.push(order);
    updateCart();
    coffeeForm.style.display = "none";
});

function updateCart(){
    cartItems.innerHTML ="";
    total = 0;

    for(let i = 0; i < cart.length; i++){
        const item = document.createElement("p");

        item.textContent = 
        cart[i].name +
        " | " +
        cart[i].milk +
        " | " +
        cart[i].temperature +
        " | " +
        cart[i].size +
        " -$" +
        cart[i].price.toFixed(2);

        cartItems.appendChild(item);
        total += cart[i].price;
        
    }

totalPrice.textContent = "Total: $" + total.toFixed(2);
}

placeOrderButton.addEventListener("click", function(){
    if(cart.length === 0){
        alert("Your cart is empty. Please add items to your cart before placing an order.");
    } else{
        paymentForm.style.display = "flex";
    }
});

confirmOrderButton.addEventListener("click", function(){
    const money = Number(moneyGiven.value);
    if(money < total){
        alert("Insufficient funds. Please provide enough money to cover the total cost.");
    } else{
        const change = money - total;
         showReceipt(money, change);
        paymentForm.style.display = "none";
        receiptForm.style.display = "flex";
    };
    
        function showReceipt(money, change){
            let receipt = "";
            receipt += "Customer: " + customerName + "<br><br>";
            receipt += "Items Ordered:<br>";
            for(let i = 0; i < cart.length; i++){
                receipt += 
                cart[i].name + 
                " | " + 
                cart[i].milk +
                 " | " + 
                 cart[i].temperature + 
                 " | " + 
                 cart[i].price.toFixed(2) + 
                 "<br>";
            }
    
            receipt += "<br>Total: $" + total.toFixed(2) + "<br>";
            receipt += "Money Given: $" + money.toFixed(2) + "<br>";
            receipt += "Change: $" + change.toFixed(2) + "<br>";
    
            receiptText.innerHTML = receipt;
        }
    closeReceipt.addEventListener("click", function(){
        receiptForm.style.display = "none";

      });