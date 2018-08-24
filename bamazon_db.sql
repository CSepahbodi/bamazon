-- Drops the database if it currently exists --
DROP DATABASE IF EXISTS bamazon_db;

-- Create the database to store the products --
CREATE DATABASE bamazon_db;
USE bamazon_db;

-- Create the table that will hold all the products to be displayed in the CLI  --
CREATE TABLE products (
    item_id INTEGER (11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR (50) NOT NULL,
    department_name VARCHAR (50) NOT NULL,
    price INTEGER (11) NOT NULL,
    stock_quantity INTEGER (11) NOT NULL,
    PRIMARY KEY (item_id) 
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Alfonsina Storni: Selected Poems", "Books", 14.00, 10), 
("ASUS Thin Gaming Laptop", "Electronics", 699.00, 5),
("Zen Juniper Bonsai", "Garden", 22.17, 3),
("Alvarez Dreadnought Guitar", "Instruments", 450.00, 6),
("The Two Towers", "Books", 29.95, 1),
("Cocktail Shaker", "Home Goods", 15.95, 12),
("Red Rock Backpack", "Outdoor Goods", 46.38, 25),
("Versace Sunglasses", "Accesories", 169.99, 34),
("Infrared Laser Tag Guns", "Toys", 149.99, 15),
("Raspberry Pi 3 Model B", "Electronics", 37.50, 20);