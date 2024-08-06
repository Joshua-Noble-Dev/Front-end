import express from "express";
import { getJobRoles } from "../services/JobRoleService"

const baseURL = process.env.AWS_URL || 'http://localhost:3000';

export const postCV = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.redirect('/jobRoles');
    } catch (e) {
        res.locals.errormessage = e.message;
        res.render('homepage.html', { ...req.body, errormessage: res.locals.errormessage });
    }
}; 
