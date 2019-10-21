const mongoose = require('mongoose');
const JobSchema = require('./job').schema;
var DateOnly = require('mongoose-dateonly')(mongoose);

const JobSeekerSchema = new mongoose.Schema(
    {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        jobs: [JobSchema],
        info: {
            dateOfBirth: { type: DateOnly, required: true },
            gender: { type: String, required: true },
            phone: { type: String, required: true },
            city: { type: String, required: true },
            gpa: { type: String, required: true },
            university: { type: String, required: true },
            major: { type: String, required: true },
            education: { type: String, required: true },
            link: { type: String, required: true },
        },
        user_status: {
            user_id: { type: String, required: true }, status: { type: String, default: "applied" }
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('JobSeeker', JobSeekerSchema);
