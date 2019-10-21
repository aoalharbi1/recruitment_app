const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, default: "Not added" },
    level: { type: String, required: true },
    field: { type: String, required: true },
    city: { type: String, required: true },
    type: { type: String, required: true },     // part-time
    company: { type: String, required: true },
    applied_user: [JobSeekerSchema]
}, { timestamps: { createdAt: true, updatedAt: true } });

const Job = mongoose.model('Job', JobSchema);

module.exports = Job;