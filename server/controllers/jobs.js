const mongoose = require('mongoose');
const Job = mongoose.model('Job');

module.exports = {
    index: (req, res) => {
        Job.find()
            .then(jobs => res.json(jobs))
            .catch(err => res.json(err));
    },

    getById: (req, res) => {
        Job.findOne({_id: req.body._id})
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
                job.description = req.body.description;
                return job.save();
            })
            .then(result => res.json(result))
            .catch(err => res.json(err));
    },

    remove: (req, res) => {
        Job.deleteOne({_id: req.body._id})
            .then(result => res.json(result))
            .catch(err => res.json(err));
    }
} 