import { 
    getAllCategories, 
    getCategoryById, 
    getAllCategoriesFromProject, 
    getProjectsByCategory, 
    updateCategoryAssignments,
    updateCategory,
    createCategory
} from '../models/categories.js';
import { getProjectDetails } from '../models/projects.js';
import { body, validationResult } from 'express-validator';

const categoryValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Category name is required')
        .isLength({ min: 3, max: 100 })
        .withMessage('Category name must be between 3 and 100 characters')
];

const categoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    //console.log(categories);

    const title = 'Categories';
    res.render('categories', { title, categories });
};

const categoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;
    const category = await getCategoryById(categoryId);
    const projects = await getProjectsByCategory(categoryId) || [];
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

const newCategoryForm = async (req, res) => {
    const title = 'Add New Category';

    res.render('new-category', {title});
}

const editCategoryForm = async (req, res) => {
    const categoryId = req.params.id;
    const category = getCategoryById(categoryId);
    const title = 'Edit Category';

    res.render('edit-category', {title, category, categoryId});
}

const processNewCategory = async (req, res) => {
    const results = validationResult(req);
    if (!results.isEmpty()) {
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        return res.redirect('/new-category');
    }

    const { name } = req.body;
    const categoryId = await createCategory(name);

    req.flash('success', 'Category added successfully!');

    res.redirect(`categories`);
}

const processEditCategory = async (req, res) => {
    const categoryId = req.params.id;

    const results = validationResult(req);
    if (!results.isEmpty()) {
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        return res.redirect(`/edit-category/${categoryId}`);
    }

    const { name } = req.body;
    await updateCategory(name, categoryId);

    req.flash('success', 'Category edited successfully!');

    res.redirect(`/category/${categoryId}`);
}

export {
    categoriesPage, 
    categoryDetailsPage, 
    assignCategoriesForm, 
    processAssignCategories,
    categoryValidation,
    processNewCategory,
    processEditCategory,
    newCategoryForm,
    editCategoryForm
};