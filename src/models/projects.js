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

const updateProject = async (organizationId, title, description, location, date, projectId) => {
    const query = `
      UPDATE project
      SET organization_id = $1, title = $2, description = $3, location = $4, date = $5
      WHERE project_id = $6
      RETURNING project_id;
    `;

    const queryParams = [organizationId, title, description, location, date, projectId];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
      throw new Error('Project not found');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
      console.log('Updated project with ID:', projectId);
    }

    return result.rows[0].project_id;
};

const getProjectsByUserId = async (userId) => {
    const query = `
      SELECT
        users.user_id,
        project.project_id,
        organization_id,
        title,
        description,
        location,
        date
      FROM public.project
        JOIN users_projects
            ON project.project_id = users_projects.project_id
        JOIN users
            ON users_projects.user_id = users.user_id
      WHERE users_projects.user_id = $1;
    `;
    
    const queryParams = [userId];
    const result = await db.query(query, queryParams);
    return result.rows;
};

const addUserToProject = async (userId, projectId) => {
    const query = `
      INSERT INTO users_projects (user_id, project_id)
      VALUES ($1, $2)
      RETURNING users_projects_id
    `;

    const queryParams = [userId, projectId];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to add user to project');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Added user to project with ID:', result.rows[0].users_projects_id);
    }

    return result.rows[0].users_projects_id;
};

const removeUserFromProject = async(userId, projectId) => {
    const deleteQuery = `
        DELETE FROM users_projects
        WHERE user_id = $1 AND project_id = $2;
    `;

    const queryParams = [userId, projectId];
    await db.query(deleteQuery, queryParams);
};

export {
    getAllProjects, 
    getProjectsByOrganizationId, 
    getUpcomingProjects, 
    getProjectDetails,
    createProject,
    updateProject,
    getProjectsByUserId,
    addUserToProject,
    removeUserFromProject
};  