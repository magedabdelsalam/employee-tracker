USE employee_trackerDB;

INSERT INTO `department`(name)
VALUES ("Sales"),
  ("Engineering"),
  ("Finance"),
  ("Legal");

INSERT INTO `role` (title, salary, department_id)
VALUES ("Salesperson", 100000, 1),
  ("Sales Lead", 120000, 1),
  ("Software Engineer", 90000, 2),
  ("Lead Engineer", 110000, 2),
  ("Accountant", 80000, 3),
  ("Legal Team Lead", 150000, 4),
  ("Lawyer", 120000, 4);

INSERT INTO `employee` (first_name, last_name, role_id, manager_id)
VALUES ("Alex","John", 1, 0),
  ("Salam", "Rondo", 2, 1),
  ("Hesham","Gondy", 3, 0),
  ("James", "Bond", 4, 3),
  ("King", "Kong", 5, 0),
  ("Ralf", "Deer", 6, 5),
  ("Park", "Ron", 7, 0)