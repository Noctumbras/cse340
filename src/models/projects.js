import db from './db.js';

const getAllProjects = async() => {
    const query = `
        SELECT name, title, project.description, location, date
      FROM public.project
        JOIN organization
            ON organization.organization_id = project.organization_id;
    `;

    const result = await db.query(query);

    return result.rows;
}

const getProjectsByOrganizationId = async (organizationId) => {
    const query = `
      SELECT
        project_id,
        organization_id,
        title,
        description,
        location,
        date
      FROM public.project
      WHERE organization_id = $1
      ORDER BY date;
    `;
    
    const queryParams = [organizationId];
    const result = await db.query(query, queryParams);
    return result.rows;
};

const getUpcomingProjects = async(number_of_projects) => {
    const query = `
        SELECT
            project_id,
            title,
            project.description,
            date,
            location,
            project.organization_id,
            name
        FROM public.project
            JOIN organization
                ON organization.organization_id = project.organization_id
        ORDER BY date
        LIMIT $1;
    `;

    const queryParams = [number_of_projects];
    const result = await db.query(query, queryParams);
    return result.rows;
};

const getProjectDetails = async(projectId) => {
    const query = `
        SELECT
            project_id,
            title,
            project.description,
            date,
            location,
            project.organization_id,
            name
        FROM public.project
            JOIN organization
                ON organization.organization_id = project.organization_id
        WHERE project_id = $1;
    `;

    const queryParams = [projectId];
    const result = await db.query(query, queryParams);
    return result.rows.length > 0 ? result.rows[0] : null;
}

const createProject = async(organizationId, title, description, location, date) => {
    const query = `
      INSERT INTO project (organization_id, title, description, location, date)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING project_id
    `;

    const queryParams = [organizationId, title, description, location, date];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create project');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new project with ID:', result.rows[0].project_id);
    }

    return result.rows[0].project_id;
}

export {
    getAllProjects, 
    getProjectsByOrganizationId, 
    getUpcomingProjects, 
    getProjectDetails,
    createProject
};  