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
                    dateOfBirth: savedResult.dateOfBirth,
                    jobSeeker: true,
                    token: token
                }

                res.json(req.session.jobSeeker);
            })
            .catch(err => res.json(err));
    },

    update: (req, res) => {
        const data = req.body;


        JobSeeker.findOne({ _id: data._id }, { jobs: 0 })
            .then(user => {
                user.first_name = data.first_name;
                user.last_name = data.last_name;
                user.email = data.email;
                user.info.gender = data.gender;
                user.info.phone = data.phone;
                user.info.city = data.city;
                user.info.university = data.university;
                user.info.major = data.major;
                user.info.education = data.education;
                user.info.link = data.link;
                user.info.gpa = data.gpa;
                if(user.info.dateOfBirth != data.dateOfBirth){
                    user.info.dateOfBirth = data.dateOfBirth;
                }

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

        JobSeeker.updateOne({ _id: jobSeeker._id, 'jobs._id': { $ne: job._id } }, { $addToSet: { jobs: job } }, { new: true })
            .then(result => {
                res.json(result.n);
            })
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
                            jobs: jobSeeker.jobs,
                            jobSeeker: true,
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
        const id = req.session.jobSeeker._id; // getting the _id from the session
        JobSeeker.findOne({ _id: id }, '~ jobs')
            .then(data => res.json(data.jobs)) // this will return the jobs only
            .catch(err => res.json(err));
    },
}