const mongoose = require('mongoose');
const Recruiter = mongoose.model('Recruiter');

module.exports = {
    getAll: (req, res) => {
        Recruiter.find({}, { 'password': 0 })
            .then(users => res.json(users))
            .catch(err => res.json(err));
    },

    // Activate or Deactivate a recruiter
    activateOrDeactivate: (req, res) => {
        Recruiter.findOneAndUpdate(
            { _id: req.body._id },
            { "active": req.body.active },
            {
                "fields": { 'password': 0 },
                new: true
            })
            .then(recruiter => res.json(recruiter))
            .catch(err => res.json(err));
    },

    login: (req, res) => {
        Admin.findOne({ email: req.body.email })
            .then(async admin => {
                if (admin === null) {
                    return res.json("User not found!");
                }
                try {
                    if (req.body.password && await bcrypt.compare(req.body.password, admin.password)) {
                        req.session.admin = {
                            _id: admin._id,
                            first_name: admin.first_name,
                            last_name: admin.last_name,
                            email: admin.email,
                            website: admin.website,
                            companyName: admin.companyName,
                            jobs: admin.jobs
                        }
                        return res.json(req.session.admin);
                    }
                    return Promise.reject("Error: password is incorrect")
                }
                catch (err) {
                    return Promise.reject(err)
                }
            })
            .catch(err => res.json(err));
    }
}