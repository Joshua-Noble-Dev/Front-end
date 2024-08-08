// import express from "express";

// const baseURL = process.env.AWS_URL || 'http://localhost:3000';

// export const postCV = async (req: express.Request, res: express.Response): Promise<void> => {
//     try {
//         res.redirect('/jobRoles');
//     } catch (e) {
//         res.locals.errormessage = e.message;
//         res.render('homepage.html', { ...req.body, errormessage: res.locals.errormessage });
//     }
// }; 

// export const getApplyPage = async (req: express.Request, res: express.Response): Promise<void> => {
//     res.render('apply.html', {baseURL} );
// }
