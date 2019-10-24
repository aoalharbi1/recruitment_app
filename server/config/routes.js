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
    app.get('/jobs', verifyToken, (req, res) => {
        // if (!req.session.user)
        //     return res.redirect("/unauthorized");

        jobs.getAll(req, res);
    });

    app.get('/job', verifyToken, (req, res) => {
        jobs.getById(req, res);
    });

    app.post('/job', verifyToken, (req, res) => {
        jobs.create(req, res);
    });

    app.put('/job', verifyToken, (req, res) => {
        jobs.update(req, res);
    });

    app.delete('/job', verifyToken, (req, res) => {
        jobs.remove(req, res);
    });

    app.post('/job/user/applied', verifyToken, (req, res) => {
        jobs.userApplied(req, res);
    });

    // *********************** Recruiter routes ***********************
    app.get('/recruiters', verifyToken, (req, res) => {
        recruiters.getAll(req, res);
    });
    app.get('/recruiter', verifyToken, (req, res) => {
        recruiters.getById(req, res);
    });

    app.post('/recruiter', verifyToken, (req, res) => {
        recruiters.create(req, res);
    });

    app.put('/recruiter', verifyToken, (req, res) => {
        recruiters.update(req, res);
    });

    app.delete('/recruiter', verifyToken, (req, res) => {
        recruiters.remove(req, res);
    });
    // the testing route will be something like this:
    // 127.0.0.1:8000/recruiter/jobs/?_id=5daf17d53d379b26336928c8
    app.get('/recruiter/jobs', verifyToken, (req, res) => {
        recruiters.displayJobs(req, res);
    });

    app.post('/recruiter/login', (req, res) => {
        recruiters.login(req, res);
    });

    // *********************** JobSeeker routes ***********************
    app.get('/users', verifyToken, (req, res) => {
        jobSeekers.getAll(req, res);
    });

    app.get('/user', verifyToken, (req, res) => {
        jobSeekers.getById(req, res);
    });

    app.post('/user', verifyToken, (req, res) => {
        jobSeekers.create(req, res);
    });

    app.put('/user', verifyToken, (req, res) => {
        jobSeekers.update(req, res);
    });

    app.delete('/user', verifyToken, (req, res) => {
        jobSeekers.remove(req, res);
    });

    //user applied for a job
    app.post('/user/applied', verifyToken, (req, res) => {
        jobSeekers.AppliedForJob(req, res);
    });

    app.post('/user/login', (req, res) => {
        jobSeekers.login(req, res);
    });

    // view the jobs from the jobSeeker
    app.get('/user/jobs', verifyToken, (req, res) => {
        jobSeekers.displayJobs(req, res);
    });

    // *********************** Admin routes ***********************
    app.get('/admin/recruiters', verifyToken, (req, res) => {
        admin.getAll(req, res);
    });

    app.put('/admin/activate', verifyToken, (req, res) => {
        admin.activateOrDeactivate(req, res);
    });

    app.post('/admin/login', verifyToken, (req, res) => {
        admin.login(req, res);
    });

    app.all("*", (req, res, next) => {
        res.sendFile(path.resolve("./public/dist/public/index.html"))
    });
}