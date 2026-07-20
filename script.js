//Coffee menu stored in an array 

const menu =[
    {
        name:"Latte",
        price: 5.50

        -  + 
        
    [ Customise]
    },
    {
        name:"Flat White",
        price: 5.00 

         -  + 
        
     [ Customise]
    },
     {
        name:"Cappuccino",
        price: 5.50 
        
        -  + 
        
     [ Customise]
    },
     {
        name:"Mocha",
        price: 6.00 
        
        -  + 
        
     [ Customise]
    },
     {
        name:"Espresso",
        price: 4.00 

         -  + 
        
     [ Customise]
    },
    {
        name:"Americano",
        price: 5.00 

         -  + 
        
     [ Customise]
    },
    {
        name:"Hot Chocolate",
        price: 5.50 

         -  + 
        
     [ Customise]
    },
    {
        name:"Matcha Latte",
        price: 6.00 

         -  + 
        
     [ Customise]
    },
    {
        name:"Chai Latte",
        price: 5.50

         -  + 
        
     [ Customise]
    },
    {
        name:"Macchiato",
        price: 5.50 

         -  + 
        
     [ Customise]
    },
    {
        name:"Long Black",
        price: 4.50 

         -  + 
        
     [ Customise]
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
const paymentMessage = document.getElementById("paymentMessage");
const nameMessage = document.getElementById("nameMessage");
const cartMessage = document.getElementById("cartMessage");
const syrup = document.getElementById("syrup");
const backtoCartButton = document.getElementById("backtoCartButton");


startButton.addEventListener("click", function() {
    customerName = customerInput.value;
    if (customerName === ""){
        nameMessage.textContent = "Name is required. Please enter your name.";
        nameMessage.style.color = "red";
 }  else{
    nameMessage.textContent = "";
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

        <div class="buttonRow">
        <button class = "minusButton">-</button>
        <button class = "plusButton">+</button>
        </div>

<button>Customise</button>
        </div>
        `;

        const plusButton = coffeeCard.querySelector(".plusButton");
        const minusButton = coffeeCard.querySelector(".minusButton");
        const customiseButton = coffeeCard.querySelector("button:last-of-type");

        customiseButton.addEventListener("click", function(){
            openCustomForm(menu[i]);
        });

        plusButton.addEventListener("click", function(){
            name: menu[i].name,
            milk: "Full Cream",
            temperature: "Hot",
            syrup: "None",
            size: "Medium",
            price: menu[i].price + 0.50
        };

        cart.push(order);
        updateCart();
    });

    minusButton.addEventListener("click", function(){
        for(let j = 0; j < cart.length; j++){
            if(cart[j].name === menu[i].name){
                cart.splice(j, 1);
                break;
            }
        }
        updateCart();
    });

menuContainer.appendChild(coffeeCard);
   
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

    const finalPrice = selectedCoffee.price + Number(size.value) + Number(syrup.value);
    
    const order ={
        name: selectedCoffee.name,
        milk: milk.value,
        temperature: temperature.value,
        syrup: syrup.options[syrup.selectedIndex].text,
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
        cart[i].syrup +
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
        cartMessage.textContent = "Your cart is empty. Please add items to your cart before placing an order.";
        cartMessage.style.color = "red";
    } else{
        cartMessage.textContent = "";
        paymentForm.style.display = "flex";
    }
});

confirmOrderButton.addEventListener("click", function(){
    const money = Number(moneyGiven.value);
    if(money < total){
        paymentMessage.textContent = "Not enough money. Please enter a larger amount.";
        paymentMessage.style.color = "red";
    }else{ 
        paymentMessage.textContent = "";

        const change = money - total;
         showReceipt(money, change);
        paymentForm.style.display = "none";
        receiptForm.style.display = "flex";
    }

});
    
        function showReceipt(money, change){
            let receipt = "";
            receipt += "<strong>Customer:</strong> " + customerName + "<br><br>";
            receipt += "<strong>Items Ordered:</strong><br>";
            for(let i = 0; i < cart.length; i++){
                receipt += 
                cart[i].name + 
                " | " + 
                cart[i].milk +
                 " | " + 
                 cart[i].temperature + 
                 " | " + 
                 cart[i].syrup +
                 " | " + 
                 cart[i].size + 
                 " - $" +
                 cart[i].price.toFixed(2) + 
                 "<br>";
            }
    
            receipt += "<br><strong>Total:</strong> $" + total.toFixed(2) + "<br>";
            receipt += "<strong>Money Given:</strong> $" + money.toFixed(2) + "<br>";
            receipt += "<strong>Change:</strong> $" + change.toFixed(2) + "<br>";
    
            receiptText.innerHTML = receipt;
        }
   
        closeReceipt.addEventListener("click", function(){
        receiptForm.style.display = "none";
        cart = [];
        total = 0;
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        totalPrice.textContent = "Total: $0.00";
        moneyGiven.value = "";

      });

      backtoCartButton.addEventListener("click", function(){
        paymentForm.style.display = "none";
        paymentMessage.textContent = "";
        moneyGiven.value = "";
      });