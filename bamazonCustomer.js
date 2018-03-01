var mysql = require("mysql");
var inquirer = require("inquirer");
      require("console.table");

      //connect to the database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});

//loads products once there is a connection
connection.connect(function(err) {
  if (err) {
    //console log if there is an error
    console.error("error connecting: " + err.stack);
  }
  loadProducts();
});

// put the products in the table and then load them / select the choices from the table
function loadProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

    // Draw the table in the terminal using the response
    console.table(res);
    itemPrompt(res);
  });
}

//ask users what they want 
function itemPrompt(inventory) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "choice",
        message: "What product ID would you like to purchase? [Quit with Q]",
        validate: function(val) {
          return !isNaN(val) || val.toLowerCase() === "q";
        }
      }
    ])
    .then(function(val) {
      var choiceId = parseInt(val.choice);
      var product = inventoryCheck(choiceId, inventory);

// if product matches then chose that if not then say it isn't
      if (product) {
        quantityAmount(product);
      }
      else {
        console.log("\nThe item you are looking for does not exist.");
        loadProducts();
      }
    });
}

// Prompt the customer for a product quantity
function quantityAmount(product) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "quantity",
        message: "How many would you like? [Quit with Q]",
        validate: function(val) {
          return val > 0 || val.toLowerCase() === "q";
        }
      }
    ])
    .then(function(val) {
      var quantity = parseInt(val.quantity);

      //check the quantity again to see if it's sold out if not make the purchase
      if (quantity > product.stock_quantity) {
        console.log("\nOpps Sold Out!");
        loadProducts();
      }
      else {
        purchaseItem(product, quantity);
      }
    });
}

//Go through and check the purchase
function purchaseItem(product, quantity) {
  connection.query(
    "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
    [quantity, product.item_id],
    function(err, res) {
      console.log("\nYay! Purchase of " + quantity + " " + product.product_name + "is complete!");
      loadProducts();
    }
  );
}
