CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(20),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CHECK (email LIKE '%@%')
);

CREATE TABLE products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(150) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    CHECK (price > 0),
    CHECK (stock_quantity >= 0)
);
CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    order_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    order_status VARCHAR(20) NOT NULL,

    CONSTRAINT fk_orders_customer
        FOREIGN KEY (customer_id)
        REFERENCES customers(customer_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CHECK (order_status IN ('PENDING', 'PAID', 'SHIPPED', 'CANCELLED'))
);
CREATE TABLE order_items (
    order_item_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,

    CONSTRAINT fk_items_order
        FOREIGN KEY (order_id)
        REFERENCES orders(order_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_items_product
        FOREIGN KEY (product_id)
        REFERENCES products(product_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CHECK (quantity > 0),
    CHECK (unit_price > 0)
);

INSERT INTO customers (full_name, email, phone) VALUES
('Alice Smith', 'alice@email.com', '08012345678'),
('Bob Jones', 'bob@email.com', '08087654321'),
('Charlie Brown', 'charlie@email.com', NULL),
('Diana Prince', 'diana@email.com', '08099887766'),
('Ethan Hunt', 'ethan@email.com', '08044556677');

INSERT INTO products (product_name, price, stock_quantity) VALUES
('Laptop', 1200.00, 10),
('Mouse', 25.00, 100),
('Keyboard', 80.00, 50),
('Monitor', 300.00, 20),
('USB Cable', 10.00, 200);

INSERT INTO orders (customer_id, order_status) VALUES
(1, 'PENDING'),
(2, 'PAID'),
(3, 'SHIPPED'),
(1, 'PAID'),
(4, 'CANCELLED');

INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES
(1, 1, 1, 1200.00),
(1, 2, 2, 25.00),
(2, 3, 1, 80.00),
(3, 4, 2, 300.00),
(4, 5, 3, 10.00),
(4, 2, 1, 25.00),
(5, 1, 1, 1200.00);