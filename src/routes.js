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
    projectValidation
} from './controllers/projects.js';
import { 
    categoriesPage, 
    categoryDetailsPage,
    assignCategoriesForm,
    processAssignCategories 
} from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';

const router = express.Router();

router.get('/', indexPage);
router.get('/organizations', organizationsPage);
router.get('/organization/:id', organizationDetailsPage);
router.post('/new-organization', organizationValidation, processNewOrganization);
router.get('/new-organization', newOrganizationForm);
router.post('/edit-organization/:id', organizationValidation, processEditOrganization);
router.get('/edit-organization/:id', editOrganizationForm);
router.get('/projects', projectsPage);
router.get('/project/:id', projectDetailsPage);
router.post('/new-project', projectValidation, processNewProject);
router.get('/new-project', newProjectForm);
router.get('/categories', categoriesPage);
router.get('/category/:id', categoryDetailsPage);
router.post('/assign-categories/:id', processAssignCategories);
router.get('/assign-categories/:id', assignCategoriesForm);

// error-handling routes
router.get('/test-error', testErrorPage);

export default router;