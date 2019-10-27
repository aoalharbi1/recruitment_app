const mongoose = require('mongoose');
const Job = mongoose.model('Job');
const Recruiter = mongoose.model('Recruiter');
const JobSeeker = mongoose.model('JobSeeker');
const nodemailer = require('nodemailer');

module.exports = {
    getAll: (req, res) => {
        Job.find({}, { 'applied_users': 0 })
            .then(jobs => res.json(jobs))
            .catch(err => res.json(err));

            const receiver = {
                first_name: "Abdullah",
                last_name: "Alharbi",
                email: "abaaady.aa@gmail.com"
            }

            const job = {
                title: "Software Enginer",
                company: "SITE"
            }
            mail(receiver, job)
    },

    getById: (req, res) => {
        Job.findOne({ _id: req.query._id })
            .then(job => res.json(job))
            .catch(err => res.json(err));
    },

    create: (req, res) => {
        const job = req.body;
        Job.create(job)
            .then(result => {
                const recruiter = req.session.recruiter;

                return Recruiter.findOneAndUpdate({ _id: recruiter._id }, { $push: { jobs: result } }, { new: true })
            })
            .then(result => res.json(true))
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
    }
} 


function mail(receiver, job) {

    
    const transporter = nodemailer.createTransport({
        // do not forget to give permission for third party in gmail
        /*
         1- login in gmail via your browser
         2- after you are logged in paste this link in your browser https://myaccount.google.com/lesssecureapps
         3- Allow less secure apps: ON
        */

        service: 'gmail',
        auth: {
            user: 'testingbrightfuture@gmail.com‏', //Email account
            pass: '12345678Ww@' // email password
        }
    });

    const mailOptions = {
        //(the sender)
        from: 'testingbrightfuture@gmail.com‏',
        // (the receiver)
        to: receiver.email,   // */ anyMail

        // titile
        subject: `Applied to ${job.title}`,

        //body message // for multi lines use this symbol ` `
        text: `
        Dear ${receiver.first_name} ${receiver.last_name},

        Thank you for applying for ${job.title} posted by ${job.company}. We wish you the best of luck.

        Best regards,
        Bright Future` ,

        // attachments   https://nodemailer.com/message/attachments/
        attachments: [
            {   // file as an attachment
                filename: 'test.pdf',
                path: __dirname + '/files' // stream this file
            }
        ]

    };

    transporter.sendMail(mailOptions, (errorHappned, info) => {
        if (errorHappned) {
            console.log(errorHappned);
        }
        else {
            console.log('Email sent: ' + info.response);
        }

    });
}