DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  primary key(item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Jessica Simpson Heels", "Apparel", 79.95, 150),
  ("Mario Kart", "Video Games", 40.99, 200),
  ("The Office Season 1", "TV", 29.50, 100),
  ("Sweater", "Apparel", 75.00, 150),
  ("Dumb & Dumber", "Films", 20.00, 35),
  ("Jumper Cables", "Necessities", 34.50, 300),
  ("Young Victoria", "Films", 20.00, 35),
  ("The Help", "Films", 20.00, 35),;
