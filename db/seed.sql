INSERT INTO departments (name)
VALUES ('accountant'), ('legal'), ('logistics'), ('IT'), ('sales');
 
INSERT INTO roles (title, salary, department_id)
VALUES ('accountant', 50000, 1), ('HR', 60000, 2), ('logistics', 70000, 3), ('IT', 80000, 4), ('sales', 90000, 5);

INSERT INTO managers (first_name, last_name)
VALUES ('Marl', 'Miller'), ('Mike', 'Miller'), ('May', 'Miller'), ('Molly', 'Miller');
 
INSERT INTO all_employees (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, 4), ('Jane', 'Doe', 4, 2), ('Jack', 'Doe', 5, 4), ('Jill', 'Doe', 3, 3), ('Jim', 'Doe', 2, 1), ('Steve', "Not Null", 3, NULL);
