import db from './db.js'

const getAllCategories = async() => {
    const query = `
        SELECT 
          name,
          category_id
      FROM public.categories;
    `;

    const result = await db.query(query);

    return result.rows;
}

const getCategoryById = async(categoryId) => {
  const query = `
      SELECT name
    FROM public.categories
    WHERE category_id = $1;
  `;

  const queryParams = [categoryId];
  const result = await db.query(query, queryParams);

  // Return the first row of the result set, or null if no rows are found
  return result.rows.length > 0 ? result.rows[0] : null;
}

const getAllCategoriesFromProject = async(projectId) => {
  const query = `
      SELECT 
        name,
        categories.category_id
    FROM public.categories
      JOIN project_categories
          ON categories.category_id = project_categories.category_id
      JOIN project
          ON project_categories.project_id = project.project_id
    WHERE project.project_id = $1;
  `;

  const queryParams = [projectId];
  const result = await db.query(query, queryParams);
  return result.rows;
}

const getProjectsByCategory = async(categoryId) => {
    const query = `
        SELECT
            project.project_id,
            title
        FROM public.project
            JOIN project_categories
                ON project.project_id = project_categories.project_id
            JOIN categories
                ON project_categories.category_id = categories.category_id
        WHERE categories.category_id = $1;
    `;

    const queryParams = [categoryId];
    const result = await db.query(query, queryParams);
    return result.rows.length > 0 ? result.rows : null;
}

const assignCategoryToProject = async(categoryId, projectId) => {
    const query = `
        INSERT INTO project_categories (category_id, project_id)
        VALUES
        ($1, $2)
        RETURNING project_categories_id
    `;

    const queryParams = [categoryId, projectId];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to assign category');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Assigned category to project with ID:', result.rows[0].project_categories_id);
    }

    return result.rows[0].project_category_id;
}

const updateCategoryAssignments = async(projectId, categoryIds) => {
    const deleteQuery = `
        DELETE FROM project_categories
        WHERE project_id = $1;
    `;

    await db.query(deleteQuery, [projectId]);

    for (const id of categoryIds) {
        await assignCategoryToProject(id, projectId);
    }
}

export {
    getAllCategories, 
    getCategoryById, 
    getAllCategoriesFromProject, 
    getProjectsByCategory,
    updateCategoryAssignments
}  