var mongoose =require("mongoose");
const RecruiterSchema=new mongoose.Schema(
    {
        first_name:{ type:String,required:true,min:3},
        last_name:{type:String,required:true,min:3},
        email:{type:String,required:true,unique: true},
        password:{type:String,required:true},
        website:{type:String},
        companyName:{type:String},
        jobs:[],
        Active:{type:Boolean}
        
    },{ timestamps: true }
);

mongoose.model('Recruiter', RecruiterSchema);