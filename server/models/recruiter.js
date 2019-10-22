const mongoose = require('mongoose');
const JobSchema = require('./job').schema;


const RecruiterSchema = new mongoose.Schema(
    {
        first_name: { type: String, required: true, min: 3 },
        last_name: { type: String, required: true, min: 3 },
        email: { 
            type: String,
            required: true,
            match: [/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2}))\]?$/, "Enter a valid email"]
         },
        password: { type: String, required: true },
        website: { type: String },
        companyName: { type: String },
        jobs: [JobSchema],
        active: { type: Boolean, default: false }

    }, 
    { timestamps: true }
);

module.exports = mongoose.model('Recruiter', RecruiterSchema);
