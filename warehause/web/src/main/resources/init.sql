DROP TABLE IF EXISTS product;

CREATE TABLE product (
    id INTEGER IDENTITY PRIMARY KEY,
    name VARCHAR(100),
    category VARCHAR(100),
    quantityUnit VARCHAR(20),
    unit VARCHAR(20),
    purchasePrice DOUBLE,
    sellingPrice DOUBLE,
    description VARCHAR(255)
);

INSERT INTO product (name, category, quantityUnit, unit, purchasePrice, sellingPrice, description) VALUES
('Alma', 'Gyümölcs', '1', 'kg', 200, 350, 'Friss alma'),
('Tej', 'Ital', '1', 'liter', 150, 250, 'Friss tej'),
('Kenyer', 'Péksütemény', '1', 'db', 100, 200, 'Friss kenyér');
