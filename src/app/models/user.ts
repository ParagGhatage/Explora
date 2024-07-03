import mongoose,{Document,Schema} from 'mongoose'

export interface User extends Document {//Interface to fix type
    userName:string;
    password:string;
    email:string;
}

const UserSchema:Schema<User> = new Schema({//type of this UserSchema is interface User

    userName:{
        type:String,
        required:[true,"userName is required"],
        unique:false,
        trim:true
    },

    password:{
        type:String,
        required:[true,"password is required"]
    },
    email:{
        type:String,
        required:[true,"email is required"]
    }
    
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || 
(mongoose.model<User>("User",UserSchema))

export default UserModel;
