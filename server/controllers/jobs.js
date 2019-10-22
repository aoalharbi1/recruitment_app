const mongoose = require('mongoose');
const Job = mongoose.model('Job');
const JobSeeker = mongoose.model('JobSeeker');

module.exports = {
    index: (req, res) => {
        Job.find()
            .then(jobs => res.json(jobs))
            .catch(err => res.json(err));
    },

    getById: (req, res) => {
        Job.findOne({ _id: req.query._id })
            .then(job => res.json(job))
            .catch(err => res.json(err));
    },

    create: (req, res) => {
        const job = req.body;
        Job.create(job)
            .then(result => res.json(result))
            .catch(err => res.json(err));
    },

    update: (req, res) => {
        Job.findOne({ _id: req.body._id })
            .then(job => {
                job.title = req.body.title;
                job.level = req.body.level;
                job.field = req.body.field;
                job.city = req.body.city;
                job.type = req.body.type;
                job.company = req.body.company;
                job.description = req.body.description;
                return job.save();
            })
            .then(result => res.json(result))
            .catch(err => res.json(err));
    },

    remove: (req, res) => {
        Job.deleteOne({ _id: req.query._id })
            .then(result => res.json(result))
            .catch(err => res.json(err));
    },

    // User's info must be in session, so the user could apply for jobs
    userApplied: (req, res) => {
        if (!req.session.jobSeeker)
            res.json("User not signed in");

        const job = req.body;
        const jobSeeker = req.session.user;
        Job.findOneAndUpdate({ _id: job._id }, { $push: { applied_users: jobSeeker } })
            .then(result => {
                res.json(result);
            })
            .catch(err => res.json(err));
    }
} 