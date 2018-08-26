var mysql = require("mysql");
var inquirer = require("inquirer");


//setup the connection to the database through mySQL- initialize mySQL router port number and enter specicic bamazon database.
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "C1y05@176#4",
    database: "bamazon_db"
});

// function to display the items in the database into the CLI
function displayItems() {
    connection.query("SELECT * FROM products", function (err, results) {
        results.forEach(function (e) {
            console.log('\n----------');
            console.log(`Item ID: ${e.item_id}`);
            console.log(`${e.product_name}`);
            console.log(`Price $${e.price}`);
            console.log('----------\n');            
        });
    promptUser();

    });
}

//function to update the products through the CLI
function updateItem(id, quantity, buyCount) {
    var itemID = id;
    var stockQunatity = quantity;
    var purchaseCount = buyCount;
    var setQuantity = quantity - buyCount;
    connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [setQuantity, itemID], function (err, resutls) {
        if (err) throw err;
        console.log(results);
    });
}

// function to prompt user in CLI to purchase specific products.
function promptUser() {
    inquirer
        .prompt([{
                name: 'buyID',
                type: 'input',
                message: 'Enter product ID: '
            },
            {
                name: 'buyCount',
                type: 'input',
                message: `How many units would you like? `
            }
        ])
        .then(function (res) {
            //make sure that the user has selected a proper item from the product list. If not then prompt user to enter one of the ID's available.
            connection.query("SELECT * FROM products WHERE item_id = ?", [res.buyID], function (err, results) {
                if (err) throw err;
                if (results.length === 0 || res.buyCount == 0) {
                    console.log('Invalid ID');
                    console.log('Please enter a valid ID');
                    promptUser();
                }
                else if (results[0].stock_quantity >= res.buyCount) {
                    console.log(`Your total is ${results[0].price * res.buyCount}`);
                    console.log(`Deducting ${res.buyCount} from item stock.`);
                    var stockQuantity = results[0].stock_quantity;
                    var purchaseCount = res.buyCount;
                    var setQuantity = stockQuantity - purchaseCount;
                    connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [setQuantity, res.buyID], function (err, results) {
                        if (err) throw err;
                    });
                    exit();
                } else {
                    //tell the user that if the stock is depleted that the item is no longer available.
                    console.log(`So sorry but we are out of stock! We only have ${results[0].stock_quantity} items left!`);
                    exit();
                }
            });
        });
}

//function to complete the program when the user is finishe purchasing or to continue shopping through CLI

function exit() {
    inquirer
        .prompt({
            name: 'exit',
            type: 'list',
            message: 'Would you like to continue shopping?',
            choices: ['Yes', 'No']
        })
        .then(function (res) {
            if (res.exit === 'No') {
                process.exit();
            } else {
                displayItems();
                promptUser();
            }
        });
};

//Start the engines and display the items so user can purchase products... YAY CAPITALISM!
connection.connect(function (err) {
    if (err) throw err;
    displayItems();
});