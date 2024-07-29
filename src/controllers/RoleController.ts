import express from "express";
import { createJobRole, getJobRoles } from "../services/JobRoleService"
import { getBands } from "../services/BandService";
import { getCapabilities } from "../services/CapabilityService";

export const getHomePage = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('homepage.html');
}
 
export const getAllJobRoles = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.render('jobRolesList.html', { roles: await getJobRoles() });
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
        res.redirect('/job-Roles/' + id);
    } catch (e) {
        res.locals.errormessage = e.message;
        res.render('jobRoleForm.html', req.body) ;
    }
}