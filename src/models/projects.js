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

export {getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails};  