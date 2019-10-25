const mongoose = require('mongoose');
const Recruiter = mongoose.model('Recruiter');
const bcrypt = require('bcrypt');
const passwordValidator = require('password-validator');
const jwt = require('jsonwebtoken');


module.exports = {
    getAll: (req, res) => {
        Recruiter.find({}, {'password': 0})
            .then(users => res.json(users))
            .catch(err => res.json(err));
    },

    getById: (req, res) => {
        Recruiter.findOne({ _id: req.query._id })
            .then(user => res.json(user))
            .catch(err => res.json(err));
    },

    create: (req, res) => {
        const recruiter = req.body;
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

        Recruiter.find({ email: recruiter.email })
            .then(result => {
                if (result.length > 0) {
                    return Promise.reject("Error: the email is already registered");
                }
                if (recruiter.password === undefined || schema.validate(recruiter.password) === false) {
                    return Promise.reject("Error: Enter a valid password");
                }
                let newRecruiter = recruiter
                return bcrypt.hash(newRecruiter.password, 10)
            })
            .then(hashedPassword => {
                let newRecruiter = recruiter;
                newRecruiter.password = hashedPassword;

                return Recruiter.create(newRecruiter);
            })
            .then(savedResult => {
                
                let payload = { subject: savedResult._id }
                let token = jwt.sign(payload, 'ThisIsSecret');

                req.session.recruiter = {
                    _id: savedResult._id,
                    first_name: savedResult.first_name,
                    last_name: savedResult.last_name,
                    email: savedResult.email,
                    companyName: savedResult.companyName,
                    website: savedResult.website,
                    active: savedResult.active,
                    jobs: savedResult.jobs,
                    token: token
                }
                res.json(req.session.recruiter);
                
            })
            .catch(err => res.json(err));
    },

    update: (req, res) => {
        const data = req.body;
        // console.log(data._id , data.first_name);
        
        Recruiter.findOne({ _id: data._id })
            .then(recruiter => {
                recruiter.first_name = data.first_name;
                recruiter.last_name = data.last_name;
                recruiter.email = data.email;
                recruiter.website = data.website;
                recruiter.companyName = data.companyName;
                console.log(recruiter.first_name);
                
                return recruiter.save();
            })
            .then(result => res.json(result))
            .catch(err => res.json(err));
    },

    remove: (req, res) => {
        Recruiter.deleteOne({ _id: req.query._id })
            .then(result => res.json(result))
            .catch(err => res.json(err));
    },

    login: (req, res) => {
        Recruiter.findOne({ email: req.body.email })
            .then(async recruiter => {
                if (recruiter === null) {
                    return res.json("User not found!");
                }
                try {
                    if (req.body.password && await bcrypt.compare(req.body.password, recruiter.password)) {
                        let payload = { subject: recruiter._id };
                        let token = jwt.sign(payload, 'ThisIsSecret');

                        req.session.recruiter = {
                            _id: recruiter._id,
                            first_name: recruiter.first_name,
                            last_name: recruiter.last_name,
                            email: recruiter.email,
                            website: recruiter.website,
                            companyName: recruiter.companyName,
                            jobs: recruiter.jobs,
                            active: recruiter.active,
                            token: token
                        }
                        
                        return res.json(req.session.recruiter);
                    }
                    return Promise.reject("Error: password is incorrect")
                }
                catch (err) {
                    return Promise.reject(err)
                }
            })
            .catch(err => res.json(err));
        },
        // this function the recruiter can see all jobs posted by him 
        // this simple ~ to get only the field written after ~ 
        displayJobs: (req, res) => {
            Recruiter.find({ _id: req.query._id }, '~ jobs ')
                .then(data => res.json(data))
                .catch(err => res.json(err))
        },
        // this function the recruiter can see all jobs posted by him 
        // this simple ~ to get only the field written after ~ 
        displayJobs: (req, res) => {
            Recruiter.find({ _id: req.query._id }, '~ jobs ')
                .then(data => res.json(data))
                .catch(err => res.json(err))
    
        }

    }

