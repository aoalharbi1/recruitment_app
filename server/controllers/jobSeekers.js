const mongoose = require('mongoose');
const JobSeeker = mongoose.model('JobSeeker');
const bcrypt = require('bcrypt');
const Job = mongoose.model('Job');
const passwordValidator = require('password-validator');
const jwt = require('jsonwebtoken');

module.exports = {
    getAll: (req, res) => {
        JobSeeker.find({}, { 'password': 0 })
            .then(users => res.json(users))
            .catch(err => res.json(err));
    },

    getById: (req, res) => {
        JobSeeker.findOne({ _id: req.query._id })
            .then(user => res.json(user))
            .catch(err => res.json(err));
    },

    create: (req, res) => {
        const user = req.body;
        const schema = new passwordValidator();
        schema
            .is().min(8)
            .is().max(30)
            .has().uppercase()
            .has().lowercase()
            .has().digits()
            .has().symbols()
            .has(/[!@#$%&*]/g)
            .has().not().spaces();
        
        JobSeeker.find({ email: user.email })
            .then(result => {
                if (result.length > 0) {
                    return Promise.reject("Error: the email is already registered");
                }
                if (user.password === undefined || schema.validate(user.password) === false) {
                    return Promise.reject("Error: Enter a valid password");
                }
                let newUser = user
                return bcrypt.hash(newUser.password, 10);
            })
            .then(hashedPassword => {
                let newUser = user;
                newUser.password = hashedPassword;
                return JobSeeker.create(newUser);
            })
            .then(savedResult => {    
                let payload = { subject: savedResult._id }
                let token = jwt.sign(payload, 'ThisIsSecret');

                req.session.jobSeeker = {
                    _id: savedResult._id,
                    first_name: savedResult.first_name,
                    last_name: savedResult.last_name,
                    email: savedResult.email,
                    info: savedResult.info,
                    token: token
                }

                res.json(req.session.jobSeeker);
            })
            .catch(err => res.json(err));
    },

    update: (req, res) => {
        const data = req.body;

        JobSeeker.findOne({ _id: data._id })
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
        JobSeeker.deleteOne({ _id: req.query._id })
            .then(result => res.json(result))
            .catch(err => res.json(err));
    },

    //user applied for a job
    AppliedForJob: (req, res) => {
        
        if (!req.session.jobSeeker)
            return res.json("User not signed in");

        const job = req.body;
        const jobSeeker = req.session.jobSeeker;
        Job.findOneAndUpdate({ _id: jobSeeker._id }, { $push: { jobs: job } }, { new: true })
            .then(result => res.json(result))
            .catch(err => res.json(err));
    },

    login: (req, res) => {
        JobSeeker.findOne({ email: req.body.email })
            .then(async jobSeeker => {
                if (jobSeeker === null) {
                    return res.json("User not found!");
                }
                try {
                    if (req.body.password && await bcrypt.compare(req.body.password, jobSeeker.password)) {
                        let payload = { subject: jobSeeker._id };
                        let token = jwt.sign(payload, 'ThisIsSecret');
                        
                        req.session.jobSeeker = {
                            _id: jobSeeker._id,
                            first_name: jobSeeker.first_name,
                            last_name: jobSeeker.last_name,
                            email: jobSeeker.email,
                            info: jobSeeker.info,
                            token: token
                        }
                        
                        return res.json(req.session.jobSeeker);
                    }
                    return Promise.reject("Error: password is incorrect")
                }
                catch (err) {
                    return Promise.reject(err)
                }
            })
            .catch(err => res.json(err));
    },

    displayJobs: (req, res) => {
        JobSeeker.find({_id: req.query._id} , '~ jobs')
            .then(jobs => res.json(jobs))
            .catch(err => res.json(err));
    },
}