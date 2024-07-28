import mongoose, {Schema, model} from "mongoose";


const messageSchema = new Schema(
    {
        content: {
            type: String,
            required: true
        },
        receiverId: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {timestamps: true , versionKey: false}
);

export default mongoose.models.Message || model('Message', messageSchema);