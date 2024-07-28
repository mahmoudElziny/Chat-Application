import mongoose, {Schema, model} from "mongoose";


const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
        },
        OTB: {
            type: String
        },
        OTBExpireDate: {
            type: Date
        },
        isConfirmed: {
            type: Boolean,
            default: false
        },
        loggedIn: {
            type: Boolean,
            default: false
        }
    },
    {timestamps: true , versionKey: false}
);

export default mongoose.models.User || model('User', userSchema);