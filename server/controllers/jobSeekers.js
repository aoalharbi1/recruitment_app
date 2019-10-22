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
        const data = req.body;
        
        JobSeeker.findOne({_id: data._id})
        .then(user => {
            user.first_name = data.first_name;
            user.last_name = data.last_name;
            user.email = data.email;
            user.info.dateOfBirth = data.info.dateOfBirth;
            user.info.gender = data.info.gender;
            user.info.phone = data.info.phone;
            user.info.city = data.info.city;
            user.info.university = data.info.university;
            user.info.major = data.info.major;
            user.info.education = data.info.education;
            user.info.link = data.info.link;

            return user.save();
        })
        .then(result => res.json(result))
        .catch(err => res.json(err));
    },

    remove: (req, res) => {
        JobSeeker.deleteOne({_id: req.query._id})
        .then(result => res.json(result))
        .catch(err => res.json(err));
    }
}