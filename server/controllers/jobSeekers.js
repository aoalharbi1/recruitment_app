const mongoose = require('mongoose');
const JobSeeker = mongoose.model('JobSeeker');

module.exports = {
    getAll: (req, res) => {
        JobSeeker.find()
            .then(users => res.json(users))
            .catch(err => res.json(err));
    },

    getById: (req, res) => {        
        JobSeeker.findOne({ _id: req.query._id })
            .then(user =>  res.json(user))
            .catch(err => res.json(err));
    },

    create: (req, res) => {
        const user = req.body;
        JobSeeker.create(user)
            .then(result => res.json(result))
            .catch(err => res.json(err));
    },

    update: (req, res) => {
        JobSeeker.findOne({_id: req.body._id})
        .then(user => {            
            user.first_name = req.body.first_name;
            user.last_name = req.body.last_name;
            user.email = req.body.email;
        })
        .then(result => res.josn(result))
        .catch(err => res.json(err));
    },

    remove: (req, res) => {
        JobSeeker.deleteOne({_id: req.query._id})
        .then(result => res.json(result))
        .catch(err => res.json(err));
    },
    
    //ali
     AppliedForJob: (req, res) => {
        if (!req.session.jobSeeker)
            res.json("User not signed in");

        const job = req.body;
        const jobSeekerID = req.session._id;
        Job.findOneAndUpdate({ _id: jobSeekerID }, { $push: { jobs: job } })
        
        .then(result => {res.json(result);
        })
        .catch(err => res.json(err));
    }
}