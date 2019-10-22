const jobs = require('../controllers/jobs.js');
const jobSeekers = require('../controllers/jobSeekers');
const recruiters = require('../controllers/recruiters');

module.exports = function (app) {
    // *********************** Job routes ***********************
    app.get('/jobs', (req, res) => {
        jobs.getAll(req, res);
    });

    app.get('/job', (req, res) => {
        jobs.getById(req, res);
    });

    app.post('/job', (req, res) => {
        jobs.create(req, res);
    });

    app.put('/job', (req, res) => {
        jobs.update(req, res);
    });

    app.delete('/job', (req, res) => {
        jobs.remove(req, res);
    });

    app.post('/job/user/applied', (req, res) => {
        jobs.userApplied(req, res);
    });

    // *********************** Recruiter routes ***********************
    app.get('/recruiters', (req, res) => {
        recruiters.getAll(req, res);
    });
    app.get('/recruiter', (req, res) => {
        recruiters.getById(req, res);
    });

    app.post('/recruiter', (req, res) => {
        recruiters.create(req, res);
    });

    app.put('/recruiter', (req, res) => {
        recruiters.update(req, res);
    });

    app.delete('/recruiter', (req, res) => {
        recruiters.remove(req, res);
    });
    // the testing route will be something like this:
    // 127.0.0.1:8000/recruiter/jobs/?_id=5daf17d53d379b26336928c8
    app.get('/recruiter/jobs', (req ,res) =>{
        recruiters.displayJobs(req,res);
    });

    app.post("/login_rec", (req, res) => {
        recruiters.login(req, res);
    });

    // *********************** user routes ***********************
    app.get('/users', (req, res) => {
        jobSeekers.getAll(req, res);
    });

    app.get('/user', (req, res) => {
        jobSeekers.getById(req, res);
    });

    app.post('/user', (req, res) => {
        jobSeekers.create(req, res);
    });

    app.put('/user', (req, res) => {
        jobSeekers.update(req, res);
    });

    app.delete('/user', (req, res) => {
        jobSeekers.remove(req, res);
    });

    //user applied for a job
    app.post('/user/applied', (req, res) => {
        jobSeekers.AppliedForJob(req, res);
    });

    app.post('/login', (req, res) => {
        jobSeekers.login(req, res);
    });

    // view the jobs from the jobSeeker
    app.get('/user/jobs' , (req,res)=>{
        jobSeekers.displayJobs(req , res);
    });

}