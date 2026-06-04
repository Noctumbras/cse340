import { getAllOrganizations, getAllOrganizationDetails, createOrganization, updateOrganization } from '../models/organizations.js';
import { getProjectsByOrganizationId } from '../models/projects.js';
import { body, validationResult } from 'express-validator';

const organizationValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Organization name is required')
        .isLength({ min: 3, max: 150 })
        .withMessage('Organization name must be between 3 and 150 characters'),
    body('description')
        .trim()
        .notEmpty()
        .withMessage('Organization description is required')
        .isLength({ max: 500 })
        .withMessage('Organization description cannot exceed 500 characters'),
    body('contactEmail')
        .normalizeEmail()
        .notEmpty()
        .withMessage('Contact email is required')
        .isEmail()
        .withMessage('Please provide a valid email address')
];

const organizationsPage = async (req, res) => {
    const organizations = await getAllOrganizations();
    //console.log(organizations);

    const title = 'Our Partner Organizations';
    res.render('organizations', { title, organizations });
};

const organizationDetailsPage = async (req, res) => {
    const organizationId = req.params.id;
    const organizationDetails = await getAllOrganizationDetails(organizationId);
    const projects = await getProjectsByOrganizationId(organizationId);
    const title = 'Organization Details';

    res.render('organization', {title, organizationDetails, projects});
}

const newOrganizationForm = async (req, res) => {
    const title = 'Add New Organization';

    res.render('new-organization', {title});
}

const editOrganizationForm = async (req, res) => {
    const organizationId = req.params.id;
    const organizationDetails = await getAllOrganizationDetails(organizationId);

    const title = 'Edit Organization';

    res.render('edit-organization', {title, organizationDetails});
}

const processNewOrganization = async (req, res) => {
    const results = validationResult(req);
    if (!results.isEmpty()) {
        // Validation failed - loop through errors
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Redirect back to the new organization form
        return res.redirect('/new-organization');
    }

    const { name, description, contactEmail } = req.body;
    const logoFilename = 'placeholder-logo.png'; // Use the placeholder logo for all new organizations

    const organizationId = await createOrganization(name, description, contactEmail, logoFilename);

    req.flash('success', 'Organization added successfully!');

    res.redirect(`/organization/${organizationId}`);
}

const processEditOrganization = async (req, res) => {
    const organizationId = req.params.id;

    const results = validationResult(req);
    if (!results.isEmpty()) {
        // Validation failed - loop through errors
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Redirect back to the new organization form
        return res.redirect(`/edit-organization/${organizationId}`);
    }

    const { name, description, contactEmail, logoFilename } = req.body;
    await updateOrganization(name, description, contactEmail, logoFilename, organizationId);

    req.flash('success', 'Organization edited successfully!');

    res.redirect(`/organization/${organizationId}`)
}

export {
    organizationsPage, 
    organizationDetailsPage, 
    newOrganizationForm, 
    processNewOrganization, 
    organizationValidation,
    editOrganizationForm,
    processEditOrganization
};