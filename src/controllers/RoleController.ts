import express from "express";
import { getJobRoleById, createJobRole, getJobRoles } from "../services/JobRoleService"

const baseURL = process.env.AWS_URL || 'http://localhost:3000';
import { getBands } from "../services/BandService";
import { getCapabilities } from "../services/CapabilityService";

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
}

export const getJobRoleForm = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('jobRoleForm.html', { bands: await getBands(), capabilities: await getCapabilities() });
}

export const postJobRoleForm = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const id = await createJobRole(req.body);
        res.redirect('/jobRoles/' + id);
    } catch (e) {
        res.locals.errormessage = e.message;
        res.render('jobRoleForm.html', req.body) ;
    }
}