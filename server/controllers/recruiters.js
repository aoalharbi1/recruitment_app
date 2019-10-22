const mongoose = require('mongoose');
const Recruiter = mongoose.model('Recruiter');

module.exports = {
    getAll: (req, res) => {
        Recruiter.find()
            .then(users => res.json(users))
            .catch(err => res.json(err));
    },

    getById: (req, res) => {        
        Recruiter.findOne({ _id: req.query._id })
            .then(user =>  res.json(user))
            .catch(err => res.json(err));
    },

    create: (req, res) => {
        const recruiter = req.body;
        Recruiter.create(recruiter)
            .then(result => res.json(result))
            .catch(err => res.json(err));
    },

    update: (req, res) => {
        const data = req.body;
        
        Recruiter.findOne({_id: data._id})
        .then(recruiter => {
            recruiter.first_name = data.first_name;
            recruiter.last_name = data.last_name;
            recruiter.email = data.email;
            recruiter.website = data.website;
            recruiter.companyName = data.companyName;

            return user.save();
        })
        .then(result => res.json(result))
        .catch(err => res.json(err));
    },

    remove: (req, res) => {
        Recruiter.deleteOne({_id: req.query._id})
        .then(result => res.json(result))
        .catch(err => res.json(err));
    }
}