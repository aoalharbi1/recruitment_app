const jobs = require('../controllers/jobs.js');
const jobSeekers = require('../controllers/jobSeekers');

module.exports = function (app) {
    app.get('/jobs', (req, res) => {
        jobs.index(req, res);
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

    // user routes 
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

}