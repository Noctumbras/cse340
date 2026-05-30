import { getAllProjects, getUpcomingProjects, getProjectDetails } from '../models/projects.js';
import { getAllCategoriesFromProject } from '../models/categories.js';

const NUMBER_OF_UPCOMING_PROJECTS = 5;

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

export {projectsPage, projectDetailsPage};