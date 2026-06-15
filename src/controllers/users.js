import bcrypt from 'bcrypt';
import { createNewUser, authenticateUser, getAllUsers } from '../models/users.js';
import { getProjectsByUserId, removeUserFromProject } from '../models/projects.js';

const userRegistrationForm = async (req, res) => {
    const title = "Register";

    res.render('register', {title});
};

const processUserRegistrationForm = async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
        // Create the hash
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const userId = await createNewUser(name, email, passwordHash);

        req.flash('success', 'User added successfully!');
        res.redirect(`/`);
    } catch (error) {
        console.error('Error registering user:', error);
        req.flash('error', 'An error occurred during registration. Please try again.');
        res.redirect('/register');
    }
};

const loginForm = async (req, res) => {
    const title = "Login";

    res.render('login', {title});
};

const processLoginForm = async (req, res) => {
    const { email, password } = req.body;

    try {
        const authenticatedUser = await authenticateUser(email, password);

        if (authenticatedUser) {
            req.session.user = authenticatedUser;
            req.flash('success', 'You are now logged in!');
            //console.log(authenticatedUser);
            res.redirect('/dashboard');
        }
        else {
            req.flash('error', 'Invalid email or password.');
            res.redirect('/login');
        }
    } catch (error) {
        console.error('Error during login:', error);
        req.flash('error', 'An error occurred during login. Please try again.');
        res.redirect('/login');
    }
};

const processLogout = async (req, res) => {
    if (req.session.user) {
        delete req.session.user;
    }

    req.flash('success', 'You have been logged out.');
    res.redirect('/login');
};

const requireLogin = (req, res, next) => {
    if (!req.session || !req.session.user) {
        req.flash('error', 'You must be logged in to access that page.');
        return res.redirect('/login');
    }

    next();
};

const dashboardPage = async (req, res) => {
    const user = req.session.user;

    const name = user.name;
    const email = user.email;
    const title = 'Dashboard';

    const userProjects = await getProjectsByUserId(user.user_id) || null;

    res.render('dashboard', {name, email, title, userProjects});
};

const requireRole = (role) => {
    return (req, res, next) => {
        if (!req.session || !req.session.user) {
            req.flash('error', 'You must be logged in to access that page.');
            return res.redirect('/login');
        }
        else if (req.session.user.role_name != role) {
            req.flash('error', 'You do not have the authority to access that page.');
            return res.redirect('/');
        }
        
        next();
    };
};

const usersPage = async (req, res) => {
    const usersList = await getAllUsers();
    const title = "Users";

    res.render('users', {usersList, title});
}

const processUnvolunteerDashboard = async (req, res) => {
    const projectId = req.params.id;

    try {
        const userId = req.session.user.user_id;
        await removeUserFromProject(userId, projectId);
    } catch (error) {
        req.flash('error', 'There was an error removing you from the project.');
        //console.log(error);
        return res.redirect(`/dashboard`)
    }

    req.flash('success', 'Successfully removed you from the project.');
    res.redirect(`/dashboard`);
}

export { 
    userRegistrationForm, 
    processUserRegistrationForm, 
    loginForm, 
    processLoginForm, 
    processLogout,
    requireLogin,
    dashboardPage,
    requireRole,
    usersPage,
    processUnvolunteerDashboard
 };