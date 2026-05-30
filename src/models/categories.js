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

export {getAllCategories, getCategoryById, getAllCategoriesFromProject, getProjectsByCategory}  