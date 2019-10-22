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
    },

    login: (req, res) => {
        bcrypt.hash(req.body.password, 10)
        .then(result => {
            console.log(result);
        })
        .catch(err => res.json(err));
    Recruiter.findOne({ email: req.body.email, first_name: req.body.first_name })
        .then(data => {
            if (data == null)
                res.json("User not found!")
            req.session.user = {
                _id: data._id,
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                website: data.website,
                companyName: data.companyName,
                jobs: data.jobs
            }
            console.log(data);
            res.json(req.session.user);
        })
        .catch(err => res.json(err))
    }
}