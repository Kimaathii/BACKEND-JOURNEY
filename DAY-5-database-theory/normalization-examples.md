//E-commerce (products, customers, orders, reviews)
# Database Normalization — E-commerce Example

Scenario:
An e-commerce system that stores customers, products, and orders.

We will take the SAME dataset and evolve it through:
- Un-Normalized Form (UNF)
- First Normal Form (1NF)
- Second Normal Form (2NF)
- Third Normal Form (3NF)

Goal:
Reduce redundancy, prevent anomalies, and improve data integrity.

## Un-Normalized Form (UNF)


| OrderID | CustomerName | CustomerEmail | ProductNames           | ProductPrices     | Quantities | OrderDate |
|--------|---------------|---------------|------------------------|-------------------|------------|-----------|
| 101    | Alice Smith   | alice@email   | Laptop, Mouse          | 1200, 25          | 1, 2        | 2024-01-10 |
| 102    | Bob Jones     | bob@email     | Keyboard               | 80                | 1          | 2024-01-11 |




## ✅ First Normal Form (1NF)

**Rule:**  
- Atomic values only  
- No repeating groups  

```md
## First Normal Form (1NF)

| OrderID | CustomerName | CustomerEmail | ProductName | ProductPrice | Quantity | OrderDate |
|--------|---------------|---------------|-------------|--------------|----------|-----------|
| 101    | Alice Smith   | alice@email   | Laptop      | 1200         | 1        | 2024-01-10 |
| 101    | Alice Smith   | alice@email   | Mouse       | 25           | 2        | 2024-01-10 |
| 102    | Bob Jones     | bob@email     | Keyboard    | 80           | 1        | 2024-01-11 |


---

## ✅ Second Normal Form (2NF)

**Rule:**  
- Must be in 1NF  
- No **partial dependencies**  
- Non-key attributes must depend on the *whole* primary key

Assume composite key: **(OrderID, ProductName)**


## Second Normal Form (2NF)

### Orders
| OrderID | CustomerEmail | OrderDate |
|--------|---------------|-----------|
| 101    | alice@email   | 2024-01-10 |
| 102    | bob@email     | 2024-01-11 |

### OrderItems
| OrderID | ProductID | Quantity |
|--------|-----------|----------|
| 101    | P1        | 1 |
| 101    | P2        | 2 |
| 102    | P3        | 1 |

### Products
| ProductID | ProductName | Price |
|----------|-------------|-------|
| P1       | Laptop      | 1200 |
| P2       | Mouse       | 25 |
| P3       | Keyboard    | 80 |


---

## ✅ Third Normal Form (3NF)

**Rule:**  
- Must be in 2NF  
- No **transitive dependencies**  
- Non-key attributes depend **only on the primary key**


## Third Normal Form (3NF)

### Customers
| CustomerID | Name        | Email |
|-----------|-------------|-------|
| C1        | Alice Smith | alice@email |
| C2        | Bob Jones   | bob@email |

### Orders
| OrderID | CustomerID | OrderDate |
|--------|------------|-----------|
| 101    | C1         | 2024-01-10 |
| 102    | C2         | 2024-01-11 |

### OrderItems
| OrderID | ProductID | Quantity |
|--------|-----------|----------|
| 101    | P1        | 1 |
| 101    | P2        | 2 |
| 102    | P3        | 1 |

### Products
| ProductID | ProductName | Price |
|----------|-------------|-------|
| P1       | Laptop      | 1200 |
| P2       | Mouse       | 25 |
| P3       | Keyboard    | 80 |