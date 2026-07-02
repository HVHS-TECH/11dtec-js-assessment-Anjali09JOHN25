/****************************
Console log
****************************/

console.log("Hello world!")

// Variables

/****************************
Main Code
****************************/
let currentItem ="";



/****************************
Functions
****************************/


function showForm(itemName) {
    console.log ("Clicked", itemName);
    currentItem = itemName;

    document.gotElementById("selectedItem").textContent = itemName;
    document.gotElementById("orderForm").style.displau ="block";
}

function submitOrder(){
    console.log ("Submitted");
    let quantity = document.getElementbyId("quantity").value;

    alert(
       'Order Submitted!
       Item:${currentItem}
Quantity:${quantity}'
);
}