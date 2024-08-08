import express from "express";
import { getJobRoleById, getJobRoles } from "../services/JobRoleService"

const baseURL = process.env.AWS_URL || 'http://localhost:3000';

export const getHomePage = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('homepage.html', {baseURL} );
}
 
export const getAllJobRoles = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.render('jobRolesList.html', { baseURL, roles: await getJobRoles() });
    } catch (e) {
        res.locals.errormessage = e.message;
        res.render('jobRolesList.html');
    }
}

export const getSingleJobRole = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.render('jobRoleDetail.html', { baseURL, jobRole: await getJobRoleById(req.params.id) });
    } catch (e) {
        res.locals.errormessage = e.message;
        res.render('jobRolesList.html');
    }
};


export const postCV = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.redirect('/jobRoles');
    } catch (e) {
        res.locals.errormessage = e.message;
        res.render('homepage.html', { ...req.body, errormessage: res.locals.errormessage });
    }
}; 

export const getApplyPage = async (req: express.Request, res: express.Response): Promise<void> => {
    // res.render('/apply', { baseURL, jobRole: await getJobRoleById(req.params.id) });
    res.render(`jobRoles/${req.params.id}/apply`, { baseURL, jobRole: await getJobRoleById(req.params.id) });

}
