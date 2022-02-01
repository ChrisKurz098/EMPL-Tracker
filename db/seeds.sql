INSERT INTO department (name)
VALUES
('Sales'),
('Legal'),
('Engineering');

INSERT INTO role (title, salary,department_id)
VALUES
('Saleperson',50000, 1),
('Lawyer', 150000, 2),
('Senior Engineer', 180000, 3)
('Engineer', 90000, 3);

INSERT INTO employee (first_name, last_name,role_id,manager_id)
VALUES
('Billy', 'Bob', 1, NULL),
('Bobo', 'Clown', 2, NULL),
('June', 'Jasper', 3, NULL),
('Quin', 'Hardin', 3,NULL),
('Alvin', 'Crawford', 3,NULL),
('Sam', 'Kenny', 2, NULL),
('Orson', 'Brooks', 1, NULL),
('Rees', 'Noble', 1, NULL);