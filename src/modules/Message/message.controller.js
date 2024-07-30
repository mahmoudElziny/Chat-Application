import messageModel from "../../../DB/models/message.model.js";
import userModel from "../../../DB/models/user.model.js";
import { ObjectId } from 'mongodb';
import { ErrorHandlerClass } from "../../utils/error-class.utils.js";


export const addMessage = async (req, res, next) => {

    const { content, receiverId } = req.body;
    
    const isReceiverIdExists = await userModel.findById({_id: new ObjectId(receiverId)});

    const message = {
        content,
        receiverId
    }

    if(isReceiverIdExists){
        const newMessage = await messageModel.create(message);
        return res.status(201).json({message: "message sent", message: newMessage});
    }
    
    return next( new ErrorHandlerClass({
        message: "wrong receiverId",
        statusCode: 404,
        position: "at add Message",
        data: receiverId,
    }))
    
}

export const readMessage = async (req, res, next) => {

    const { _id } = req.authUser;

    const messages = await messageModel.find({receiverId: new ObjectId(_id)}).exec();

    return res.status(202).json({message: "Messages" , messages});
    
}

export const deleteMessage = async (req, res, next) => {

    const { _id } = req.authUser;
    const { messageId } = req.params;

    const message = await messageModel.findOneAndDelete( {receiverId: new ObjectId(_id), _id: new ObjectId(messageId)} ); 
    
    if(message){
        return res.status(202).json({ message: "message deleted successfully", data: message} );
    }

    return next(new ErrorHandlerClass({message: "wrong message Id"}) );
    
}