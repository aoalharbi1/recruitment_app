const mongoose = require('mongoose');

const JobSeekerSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    jobs: [Jobs],
    info: {
        dateOfbirth: { type: Date, required: true },
        gender: { type: String, required: true },
        phone: { type: String, required: true },
        city: { type: String, required: true },
        gpa: { type: String, required: true },
        university: { type: String, required: true },
        major: { type: String, required: true },
        education: { type: String, required: true },
        link: { type: String, required: true },
    },
    status: {},
},
    { timestamps: true }
);
mongoose.model('JobSeeker', JobSeekerSchema);