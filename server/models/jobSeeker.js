const mongoose = require('mongoose');
const JobSchema = require('./job').schema;
var DateOnly = require('mongoose-dateonly')(mongoose);

const JobSeekerSchema = new mongoose.Schema(
    {
        first_name: { type: String, required: [true, "The first name is required"], minlength: 3, maxlength: 30 },
        last_name: { type: String, required: [true, "The last name is required"], minlength: 3, maxlength: 30 },
        email: {
            type: String,
            required: true,
            match: [/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2}))\]?$/, "Enter a valid email"]
        },
        password: { type: String, required: [true, "The password is required"] },
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
        user_status: [{
            status: { type: String, default: "applied" }
        }],
    },
    { timestamps: true }
);

module.exports = mongoose.model('JobSeeker', JobSeekerSchema);
