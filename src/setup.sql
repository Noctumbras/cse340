CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
	organization_id INT REFERENCES organization(organization_id),
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    date DATE NOT NULL
);

INSERT INTO project (organization_id, title, description, location, date)
VALUES 
(1, 'placeholder', 'placeholder description', 'placeholder location', TO_DATE('01-01-1990', 'DD/MM/YYYY')),
(1, 'placeholder', 'placeholder description', 'placeholder location', TO_DATE('01-01-1990', 'DD/MM/YYYY')),
(1, 'placeholder', 'placeholder description', 'placeholder location', TO_DATE('01-01-1990', 'DD/MM/YYYY')),
(1, 'placeholder', 'placeholder description', 'placeholder location', TO_DATE('01-01-1990', 'DD/MM/YYYY')),
(1, 'placeholder', 'placeholder description', 'placeholder location', TO_DATE('01-01-1990', 'DD/MM/YYYY')),
(2, 'placeholder', 'placeholder description', 'placeholder location', TO_DATE('01-01-1990', 'DD/MM/YYYY')),
(2, 'placeholder', 'placeholder description', 'placeholder location', TO_DATE('01-01-1990', 'DD/MM/YYYY')),
(2, 'placeholder', 'placeholder description', 'placeholder location', TO_DATE('01-01-1990', 'DD/MM/YYYY')),
(2, 'placeholder', 'placeholder description', 'placeholder location', TO_DATE('01-01-1990', 'DD/MM/YYYY')),
(2, 'placeholder', 'placeholder description', 'placeholder location', TO_DATE('01-01-1990', 'DD/MM/YYYY')),
(3, 'placeholder', 'placeholder description', 'placeholder location', TO_DATE('01-01-1990', 'DD/MM/YYYY')),
(3, 'placeholder', 'placeholder description', 'placeholder location', TO_DATE('01-01-1990', 'DD/MM/YYYY')),
(3, 'placeholder', 'placeholder description', 'placeholder location', TO_DATE('01-01-1990', 'DD/MM/YYYY')),
(3, 'placeholder', 'placeholder description', 'placeholder location', TO_DATE('01-01-1990', 'DD/MM/YYYY')),
(3, 'placeholder', 'placeholder description', 'placeholder location', TO_DATE('01-01-1990', 'DD/MM/YYYY'));

CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE project_categories (
	project_categories_id SERIAL PRIMARY KEY,
	category_id INT REFERENCES categories(category_id),
	project_id INT REFERENCES project(project_id)
);

INSERT INTO categories (name)
VALUES
('Neighborhood'),
('Environmental'),
('Hungry/Homeless');

INSERT INTO project_categories (category_id, project_id)
VALUES
(1, 1),
(2, 2),
(3, 3),
(1, 4),
(2, 5),
(3, 6),
(1, 7),
(2, 8),
(3, 9),
(1, 10),
(2, 11),
(3, 12),
(1, 13),
(2, 14),
(3, 15);