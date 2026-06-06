import { 
    getAllProjects, 
    getUpcomingProjects, 
    getProjectDetails,
    createProject,
    updateProject
} from '../models/projects.js';
import { getAllCategoriesFromProject } from '../models/categories.js';
import { getAllOrganizations } from '../models/organizations.js';
import { body, validationResult } from 'express-validator';

const NUMBER_OF_UPCOMING_PROJECTS = 5;

const projectValidation = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Project title is required')
        .isLength({ min: 3, max: 200 })
        .withMessage('Project title must be between 3 and 200 characters'),
    body('description')
        .trim()
        .notEmpty()
        .withMessage('Project description is required')
        .isLength({ max: 1000 })
        .withMessage('Project description cannot exceed 1000 characters'),
    body('location')
        .trim()
        .notEmpty()
        .withMessage('Project location is required')
        .isLength({ max: 200 })
        .withMessage('Project location cannot exceed 200 characters'),
    body('date')
        .notEmpty()
        .withMessage('Project date is required')
        .isISO8601()
        .withMessage('Project date must be a valid date format'),
    body('organizationId')
        .notEmpty()
        .withMessage('Organization is required')
        .isInt()
        .withMessage('Organization ID must be a valid integer')
];

const projectsPage = async (req, res) => {
    const upcomingProjects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    
    const title = 'Upcoming Service Projects';

    res.render('projects', { title, upcomingProjects });
};

const projectDetailsPage = async (req, res) => {
    const projectId = req.params.id;
    const project = await getProjectDetails(projectId);
    const categories = await getAllCategoriesFromProject(projectId);
    const title = 'Service Project Details'

    res.render('project', {title, project, categories});
}

const newProjectForm = async (req, res) => {
    const title = 'Add New Organization';
    const organizations = await getAllOrganizations();

    res.render('new-project', {title, organizations});
}

const editProjectForm = async (req, res) => {
    const projectId = req.params.id;
    const project = await getProjectDetails(projectId);
    const organizations = await getAllOrganizations();

    const title = 'Edit Project';

    res.render('edit-project', {title, project, organizations});
}

const processNewProject = async (req, res) => {
    const results = validationResult(req);
    if (!results.isEmpty()) {
        // Validation failed - loop through errors
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Redirect back to the new project form
        return res.redirect('/new-project');
    }

    const { organizationId, title, description, location, date } = req.body;
    const projectId = await createProject(organizationId, title, description, location, date);

    req.flash('success', 'Project added successfully!');

    res.redirect(`projects`);
}

const processEditProject = async (req, res) => {
    const projectId = req.params.id;

    const results = validationResult(req);
    if (!results.isEmpty()) {
        // Validation failed - loop through errors
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Redirect back to the edit project form
        return res.redirect(`/edit-project/${projectId}`);
    }

    const { organizationId, title, description, location, date } = req.body;
    await updateProject(organizationId, title, description, location, date, projectId);

    req.flash('success', 'Project edited successfully!');

    res.redirect(`/project/${projectId}`);
}

export {
    projectsPage, 
    projectDetailsPage, 
    newProjectForm, 
    processNewProject, 
    projectValidation,
    editProjectForm,
    processEditProject
};