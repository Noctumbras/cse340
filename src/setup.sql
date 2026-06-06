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
(1, 'Bush Trimming', 'Trim bushes around the neighborhood', '101 Real Place Drive', TO_DATE('08-08-2026', 'DD/MM/YYYY')),
(1, 'Highway Litter Pickup', 'Pick up litter around the highway.', 'That Highway', TO_DATE('09-09-2026', 'DD/MM/YYYY')),
(1, 'Canned Beans Food Drive', 'A food drive collecting canned beans.', '555 Church Avenue', TO_DATE('10-10-2026', 'DD/MM/YYYY')),
(1, 'Fence Fixing', 'Fix fences around the neighborhood', '101 Real Place Drive', TO_DATE('11-11-2026', 'DD/MM/YYYY')),
(1, 'Seagull Cleaning', 'Cleaning oil off of seagulls.', 'Charity Beach', TO_DATE('12-12-2026', 'DD/MM/YYYY')),
(2, 'Clothing Drive', 'Collecting clothing to donate to the homeless.', '1101 Salvation Road', TO_DATE('13-07-2026', 'DD/MM/YYYY')),
(2, 'Pet Waste Bins', 'Placing garbage cans for pet waste around the neighborhood.', '102 Fake Place Road', TO_DATE('14-09-2026', 'DD/MM/YYYY')),
(2, 'Recycling Drive', 'A drive to collect recyclable items.', '303 Waste-Not Avenue', TO_DATE('15-11-2026', 'DD/MM/YYYY')),
(2, 'Soup Kitchen', 'A soup kitchen running for the whole day.', '405 May Drive', TO_DATE('16-06-2026', 'DD/MM/YYYY')),
(2, 'Pothole Petitioning', 'Go around collecting signatures for a petition to the city to fix potholes in the neighborhood.', '101 Real Place Drive', TO_DATE('17-09-2026', 'DD/MM/YYYY')),
(3, 'Electronics Collection', 'Collecting electronic waste to recycle.', '303 Waste-Not Avenue', TO_DATE('18-12-2026', 'DD/MM/YYYY')),
(3, 'Canned Soup Drive', 'A food drive collecting canned soup.', '555 Church Avenue', TO_DATE('19-08-2026', 'DD/MM/YYYY')),
(3, 'Tree Trimming', 'Trim tree branches around the neighborhood.', '102 Fake Place Road', TO_DATE('20-12-2026', 'DD/MM/YYYY')),
(3, 'Trail Litter Pickup', 'Pick up litter around the local walking trail.', '222 Squirrel Road', TO_DATE('21-10-2026', 'DD/MM/YYYY')),
(3, 'Canned Bread Drive', 'A food drive collecting canned bread.', '555 Church Avenue', TO_DATE('22-08-2026', 'DD/MM/YYYY'));

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