INSERT INTO category (name) VALUES
('Élelmiszer'),
('Elektronika'),
('Irodaszer'),
('Tisztítószer');

INSERT INTO unit (name) VALUES
('db'),
('kg'),
('csomag'),
('liter');

INSERT INTO product (
    name, description, purchasePrice, sellingPrice, quantityUnit, category_id, unit_id
) VALUES
('Tej 1L', 'Friss 1 literes tej', 250, 350, 1, 1, 4),
('Kenyér', 'Fehér kenyér 1kg', 400, 550, 2, 1, 1),
('Laptop', '15.6 colos irodai laptop', 150000, 185000, 3, 2, 1),
('Egér', 'Vezeték nélküli optikai egér', 3000, 4500, 4, 2, 1),
('Nyomtatópapír A4', '500 lapos A4 papírcsomag', 1200, 1800, 5, 3, 3),
('Golyóstoll', 'Kék tintájú toll', 80, 150, 6, 3, 1),
('Felmosó folyadék', 'Univerzális tisztítószer 1L', 500, 900, 7, 4, 4),
('Mosogatószer', 'Citrus illatú 0.5L', 350, 650, 8, 4, 4),
('Cukor 1kg', 'Kristálycukor 1kg kiszerelés', 300, 450, 9, 1, 2),
('Notebook', 'Füzet, spirálos, 80 lap', 250, 450, 10, 3, 1);
