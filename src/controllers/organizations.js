import { getAllOrganizations, getAllOrganizationDetails } from '../models/organizations.js';
import { getProjectsByOrganizationId } from '../models/projects.js';

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

export {organizationsPage, organizationDetailsPage};