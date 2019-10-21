const AdminSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    // recruiter schema should be here
},
    { timestamp: {createdAt: true, updatedAt: true} },

);

mongoose.model('Admin', AdminSchema);