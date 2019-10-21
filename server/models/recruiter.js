const mongoose = require('mongoose');
const JobSchema = require('./job').schema;


const RecruiterSchema = new mongoose.Schema(
    {
        first_name: { type: String, required: true, min: 3 },
        last_name: { type: String, required: true, min: 3 },
        email: { type: String, required: true },
        password: { type: String, required: true },
        website: { type: String },
        companyName: { type: String },
        jobs: [JobSchema],
        active: { type: Boolean }

    }, 
    { timestamps: true }
);

module.exports = mongoose.model('Recruiter', RecruiterSchema);
