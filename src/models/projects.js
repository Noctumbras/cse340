import db from './db.js'

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

export {getAllProjects}  