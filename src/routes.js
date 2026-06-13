import express from 'express';

import { indexPage } from './controllers/index.js';

import { 
    organizationsPage, 
    organizationDetailsPage, 
    newOrganizationForm, 
    processNewOrganization, 
    organizationValidation,
    editOrganizationForm,
    processEditOrganization
} from './controllers/organizations.js';

import { 
    projectsPage, 
    projectDetailsPage, 
    newProjectForm, 
    processNewProject,
    projectValidation,
    editProjectForm,
    processEditProject
} from './controllers/projects.js';

import { 
    categoriesPage, 
    categoryDetailsPage,
    assignCategoriesForm,
    processAssignCategories,
    newCategoryForm,
    editCategoryForm,
    processNewCategory,
    processEditCategory,
    categoryValidation
} from './controllers/categories.js';

import {
    userRegistrationForm,
    processUserRegistrationForm,
    loginForm,
    processLoginForm,
    processLogout,
    requireLogin,
    dashboardPage,
    requireRole,
    usersPage
} from './controllers/users.js';

import { testErrorPage } from './controllers/errors.js';


const router = express.Router();

router.get('/', indexPage);

router.get('/organizations', organizationsPage);
router.get('/organization/:id', organizationDetailsPage);
router.post('/new-organization', requireRole('admin'), organizationValidation, processNewOrganization);
router.get('/new-organization', requireRole('admin'), newOrganizationForm);
router.post('/edit-organization/:id', requireRole('admin'), organizationValidation, processEditOrganization);
router.get('/edit-organization/:id', requireRole('admin'), editOrganizationForm);

router.get('/projects', projectsPage);
router.get('/project/:id', projectDetailsPage);
router.post('/new-project', requireRole('admin'), projectValidation, processNewProject);
router.get('/new-project', requireRole('admin'), newProjectForm);
router.post('/edit-project/:id', requireRole('admin'), projectValidation, processEditProject);
router.get('/edit-project/:id', requireRole('admin'), editProjectForm);

router.get('/categories', categoriesPage);
router.get('/category/:id', categoryDetailsPage);
router.post('/assign-categories/:id', requireRole('admin'), processAssignCategories);
router.get('/assign-categories/:id', requireRole('admin'), assignCategoriesForm);
router.post('/new-category', requireRole('admin'), categoryValidation, processNewCategory);
router.get('/new-category', requireRole('admin'), newCategoryForm);
router.post('/edit-category/:id', requireRole('admin'), categoryValidation, processEditCategory);
router.get('/edit-category/:id', requireRole('admin'), editCategoryForm);

router.post('/register', processUserRegistrationForm);
router.get('/register', userRegistrationForm);
router.post('/login', processLoginForm);
router.get('/login', loginForm);
router.get('/logout', processLogout);
router.get('/dashboard', requireLogin, dashboardPage);
router.get('/users', requireRole('admin'), usersPage);

// error-handling routes
router.get('/test-error', testErrorPage);

export default router;