const jobs = require('../controllers/jobs.js');
const jobSeekers = require('../controllers/jobSeekers');
const recruiters = require('../controllers/recruiters');
const admin = require('../controllers/admins');
const path = require('path');
const jwt = require('jsonwebtoken');

module.exports = function (app) {
    function verifyToken(req, res, next) {
        if (!req.headers.authorization) {
            return res.status(401).send('Unauthorized request');
        }

        let token = req.headers.authorization.split(' ')[1];

        if (token === 'null') {
            return res.status(401).send('Unauthorized request');
        }

        try {
            let payload = jwt.verify(token, 'ThisIsSecret');
            if (!payload) {
                return res.status(401).send('Unauthorized request');
            }
            req.userId = payload.subject;
            next();
        } catch (err) {
            return res.status(401).send('Unauthorized request');
        }
    }

    // *********************** Job routes ***********************
    app.get('/jobs', (req, res) => {
        jobs.getAll(req, res);
    });

    app.get('/job', verifyToken, (req, res) => {
        jobs.getById(req, res);
    });

    app.post('/job', verifyToken, (req, res) => {
        if (!req.session.recruiter)
            return res.redirect("/unauthorized");   

        jobs.create(req, res);
    });

    app.put('/job', verifyToken, (req, res) => {
        if (!req.session.recruiter)
            return res.redirect("/unauthorized");

        jobs.update(req, res);
    });

    app.delete('/job', verifyToken, (req, res) => {
        if (!req.session.recruiter)
            return res.redirect("/unauthorized");
            
        jobs.remove(req, res);
    });

    app.post('/job/user/applied', verifyToken, (req, res) => {
        if (!req.session.jobSeeker)
            return res.redirect("/unauthorized");
            
        jobs.userApplied(req, res);
    });

    // *********************** Recruiter routes ***********************
    app.get('/recruiters', verifyToken, (req, res) => {
        if (!req.session.admin)
            return res.redirect("/unauthorized");

        recruiters.getAll(req, res);
    });
    app.get('/recruiter', verifyToken, (req, res) => {
        if (!req.session.admin)
            return res.redirect("/unauthorized");

        recruiters.getById(req, res);
    });

    app.post('/recruiter', (req, res) => {
        recruiters.create(req, res);
    });

<<<<<<< HEAD
    app.put('/recruiter',  (req, res) => {
=======
    app.put('/recruiter', verifyToken, (req, res) => {
        if (!req.session.recruiter)
            return res.redirect("/unauthorized");

>>>>>>> a2f2fbc70bb9d36a9daf9f2ef0ec39cd2f6d2da7
        recruiters.update(req, res);
    });

    app.delete('/recruiter', verifyToken, (req, res) => {
        if (!req.session.admin)
            return res.redirect("/unauthorized");

        recruiters.remove(req, res);
    });
    // the testing route will be something like this:
    // 127.0.0.1:8000/recruiter/jobs/?_id=5daf17d53d379b26336928c8
    app.get('/recruiter/jobs', verifyToken, (req, res) => {
        if (req.session.recruiter)
            return res.redirect("/unauthorized");

        recruiters.displayJobs(req, res);
    });

    app.post('/recruiter/login', (req, res) => {
        recruiters.login(req, res);
    });

    // *********************** JobSeeker routes ***********************
    app.get('/users', verifyToken, (req, res) => {
        if (!req.session.admin)
            return res.redirect("/unauthorized");

        jobSeekers.getAll(req, res);
    });

    app.get('/user', verifyToken, (req, res) => {
        if (!req.session.admin)
            return res.redirect("/unauthorized");

        jobSeekers.getById(req, res);
    });

    app.post('/user', (req, res) => {
        jobSeekers.create(req, res);
    });

    app.put('/user', verifyToken, (req, res) => {
        if (!req.session.jobSeeker)
            return res.redirect("/unauthorized");

        jobSeekers.update(req, res);
    });

    app.delete('/user', verifyToken, (req, res) => {
        if (req.session.admin)
            return res.redirect("/unauthorized");

        jobSeekers.remove(req, res);
    });

    //user applied for a job
    app.put('/user/applied', verifyToken, (req, res) => {
        if (!req.session.jobSeeker)
            return res.redirect("/unauthorized");

        jobSeekers.AppliedForJob(req, res);
    });

    app.post('/user/login', (req, res) => {
        jobSeekers.login(req, res);
    });

    // view the jobs from the jobSeeker
    app.get('/user/jobs', verifyToken, (req, res) => {
        if (!req.session.jobSeeker)
            return res.redirect("/unauthorized");

        jobSeekers.displayJobs(req, res);
    });

    // *********************** Admin routes ***********************
    app.get('/admin/recruiters', verifyToken, (req, res) => {
        if (!req.session.admin)
            return res.redirect("/unauthorized");

        admin.getAll(req, res);
    });

    app.put('/admin/activate', verifyToken, (req, res) => {
        if (!req.session.admin)
            return res.redirect("/unauthorized");

        admin.activateOrDeactivate(req, res);
    });

    app.post('/admin/login', (req, res) => {
        admin.login(req, res);
    });
    
    // for testing, this will create and admin account
    app.post('/admin', (res,req)=> {
        admin.create(req, res);
    });

    app.get('/sign_out', (req, res) => {
        req.session.destroy();
        
        return res.json("signed out");
    });

    app.all("*", (req, res, next) => {
        res.sendFile(path.resolve("./public/dist/public/index.html"))
    });
}