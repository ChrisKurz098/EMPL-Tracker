INSERT INTO department (name)
VALUES
('Sales'),
('Legal'),
('Engineering'),
('Internship');

INSERT INTO role (title, salary,department_id)
VALUES
('Sales Manager', 120000, 1), 
('Saleperson',50000, 1),
('Chief Legal Officer', 200000, 2),
('Lawyer', 130000, 2),
('Senior Engineer', 180000, 3),
('Engineer', 90000, 3),
('Intern', 0 , 4);

INSERT INTO employee (first_name, last_name,role_id,manager_id)
VALUES
('Rees', 'Noble', 1, NULL),
('Billy', 'Bob', 2, 1),
('Orson', 'Brooks', 2, 1),
('Bobo', 'Clown', 3, NULL),
('Sam', 'Kenny', 4, 4),
('June', 'Jasper', 5, NULL),
('Quin', 'Hardin', 6, 6),
('Alvin', 'Crawford', 6, 6),
('Ben', 'Aflac', 7, 4), 
('Greg', 'Wilf', 7, 6); 