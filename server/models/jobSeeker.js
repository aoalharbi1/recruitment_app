const mongoose = require('mongoose');

const JopSeekerSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    jops: [Jobs],
    info: {
        dateOfbirth: { type: Date, required: true },
        gender: { type: String, required: true },
        phone: { tybe: String, required: true },
        city: { tybe: String, required: true },
        gpa: { tybe: String, required: true },
        university: { tybe: String, required: true },
        major: { tybe: String, required: true },
        education: { tybe: String, required: true },
        link: { tybe: String, required: true },
    },
    status: {},
},
    { timestamps: true }
);
mongoose.model('JopSeeker', JopSeekerSchema);