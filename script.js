//Coffee menu stored in an array - doesn't need to be put into my html. Creates coffee cards with prices. 

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
        name:"Cappuccino",
        price: 5.50 
    },
     {
        name:"Mocha",
        price: 6.00 
    },
     {
        name:"Espresso",
        price: 4.00 
    },
    {
        name:"Americano",
        price: 5.00 
    },
    {
        name:"Hot Chocolate",
        price: 5.50 
    },
    {
        name:"Matcha Latte",
        price: 6.00 
    },
    {
        name:"Chai Latte",
        price: 5.50
    },
    {
        name:"Macchiato",
        price: 5.50 
    },
    {
        name:"Long Black",
        price: 4.50 
    }
];

//variables that change
let cart =[];
let selectedCoffee = null;
let customerName ="";
let total = 0;


//html elements defined in const
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

/**Start button code with an if statement, using variable customerName created earlier.
Created a message defined within const so if user doesn't enter a name they get notified - usability heuristic. ***/
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

/***Functiomn for displaying the coffee cards and using a for statement code the menu - using a for loop. 
Button code for the + and - buttons. - Used a tutorial need to reference ***/
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

        <span class = "quantity">0</span>

        <button class = "plusButton">+</button>
        </div>

<button class="customiseButton">Customise</button>
        </div>
        `;

        //Defining buttons - const
        const plusButton = coffeeCard.querySelector(".plusButton");
        const minusButton = coffeeCard.querySelector(".minusButton");
        const customiseButton = coffeeCard.querySelector(".customiseButton");
        const quantity = coffeeCard.querySelector(".quantity");

        //Count variable 
        let count = 0;

        //Cutomise button function so it opens the form for customization.
        customiseButton.addEventListener("click", function(){
            openCustomForm(menu[i]);
        });

        //Plus button function so it adds a standard coffee without customization. 
        plusButton.addEventListener("click", function(){
            const order = {
            name: menu[i].name,
            milk: "Full Cream",
            temperature: "Hot",
            syrup: "None",
            size: "Medium (+$0.50)",
            price: menu[i].price + 0.50
        };

        cart.push(order);

        count++;
        quantity.textContent = count;

        updateCart();
    });

    /***minus button code defined by variable removed. Makues sure that cart.length cannot go below -1
    Used tutorial - remember to reference. ***/
    minusButton.addEventListener("click", function(){
       let removed = false;
        for(let j = cart.length - 1; j >= 0; j--){
            if(cart[j].name === menu[i].name){
                cart.splice(j, 1);
                removed = true;
                break;
            }
        }

        if(removed){
        count--;
        quantity.textContent = count;
        updateCart();
        }
    });

menuContainer.appendChild(coffeeCard);
   
  }
}

//Custom coffee form created. Used variable values and determined final priced based on the values. 
function openCustomForm(coffee){
   
    selectedCoffee = coffee;
    coffeeTitle.textContent = coffee.name;
    coffeeForm.style.display = "flex";
}

cancelButton.addEventListener("click", function(){
    coffeeForm.style.display = "none";
});

//Add to cart code with an if statement, using variable customerName created earlier.
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

//Letting more than 1 coffee be added to the cart and for that to update my total price. 
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

/***Place order code with an if statement, using variable customerName created earlier.
Created a message defined within const so if user tries to place order without any items in cart- usability heuristic.***/
placeOrderButton.addEventListener("click", function(){
    if(cart.length === 0){
        cartMessage.textContent = "Your cart is empty. Please add items to your cart before placing an order.";
        cartMessage.style.color = "red";
    } else{
        cartMessage.textContent = "";
        paymentForm.style.display = "flex";
    }
});

/***Confirm order code with an if statement, using variable customerName created earlier.
Created a message defined within const so if user doesn't enter a name they get notified - usability heuristic. ***/
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
    
/***Receipt fuction to show order. Also calculates change based on money entered.
 Displays customer name and coffee that was ordered + any customizations ***/
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
   
        //Close reciept button code 
        closeReceipt.addEventListener("click", function(){
        receiptForm.style.display = "none";
        cart = [];
        total = 0;
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        totalPrice.textContent = "Total: $0.00";
        moneyGiven.value = "";

      });

      //Back to cart button code 
      backtoCartButton.addEventListener("click", function(){
        paymentForm.style.display = "none";
        paymentMessage.textContent = "";
        moneyGiven.value = "";
      });