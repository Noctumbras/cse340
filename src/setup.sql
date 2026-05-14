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