import { getAllCategories, getCategoryById, getAllCategoriesFromProject, getProjectsByCategory, updateCategoryAssignments } from '../models/categories.js';
import { getProjectDetails } from '../models/projects.js';

const categoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    //console.log(categories);

    const title = 'Categories';
    res.render('categories', { title, categories });
};

const categoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;
    const category = await getCategoryById(categoryId);
    const projects = await getProjectsByCategory(categoryId);
    const title = 'Category Details';

    res.render('category', {title, category, projects});
};

const assignCategoriesForm = async (req, res) => {
    const projectId = req.params.id;
    const project = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const projectCategories = await getAllCategoriesFromProject(projectId);
    const title = 'Assign Categories to Project';

    res.render('assign-categories', {title, projectId, project, categories, projectCategories});
};

const processAssignCategories = async (req, res) => {
    const projectId = req.params.id;
    const selectedCategoryIds = req.body.categoryIds || [];

    await updateCategoryAssignments(projectId, selectedCategoryIds);
    req.flash('success', 'Categories updated successfully!');
    res.redirect(`/project/${projectId}`);
}

export {categoriesPage, categoryDetailsPage, assignCategoriesForm, processAssignCategories};