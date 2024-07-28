import { compareSync, hashSync } from "bcrypt";
import userModel from "../../../DB/models/user.model.js";
import jwt from "jsonwebtoken";
import { sendEmailService } from "../../services/send-email.service.js";
import { ErrorHandlerClass } from "../../utils/error-class.utils.js";
import { ObjectId } from 'mongodb';


export const registration = async (req, res, next) => {
    
    const { name, email, password } = req.body;
    
    if (name && email && password) {
        const isEmailExists = await userModel.findOne({ email });

        if (isEmailExists) {
            return next( new ErrorHandlerClass({
                message:"Email already exists",
                statusCode: 409,
                position: "at registration api",
                data: email
                })
            );
        }

        const hashedPassword = hashSync(password, 12);
        const OTB = Math.floor(100000 + Math.random() * 900000);
        const expDate = new Date(+ new Date() + (60000*3));

        const userObject = new userModel({
            name,
            email,
            password: hashedPassword,
            OTB,
            OTBExpireDate: expDate
        });  
        
        //sending email
        const isEmailSent = await sendEmailService({
            to: email,
            subject: "Welcome to ChatApp - verify your email address",
            html: `<h1>Your OTB is ${OTB}</h1>`
        });

        if(isEmailSent.rejected.length){
            return next(new ErrorHandlerClass({
            message: "Verification Email is failed",
            statusCode: 500,
            position: "at registration api",
            data: isEmailSent
        }
        ));
        }
        
        const user = await userObject.save();

        return res.status(201).json({ message: "user created", user });

    } else {
        return next(new ErrorHandlerClass({
            message: "Initialize All Fields",
            statusCode: 400,
            position: "at registration api"
        }  
        ));
    }
}


export const verifyEmail = async (req, res, next) => {

    const { _id , OTB } = req.query;

    const user = await userModel.findById( {_id: new ObjectId(_id)} );

    const date = new Date(); 
    
    if(OTB == user.OTB && date <= user.OTBExpireDate ){
        const userConfirmation = await userModel.findByIdAndUpdate({ _id: new ObjectId(_id) }, { isConfirmed: true }, { new: true });
        if(!userConfirmation){
            return next( new ErrorHandlerClass({message: "user not found", statusCode: 404, position: "at verifyEmail api"}));
        }
        res.status(200).json({ message: "user verified successfully", userConfirmation });
    }else{
        return next( new ErrorHandlerClass({message: "wrong or Expired OTB try again", statusCode: 404, position: "at verifyEmail api"}));  
    }   
} 

export const login = async (req, res, next) => {


    const { email, password } = req.body;

    if (email && password) {
        const user = await userModel.findOneAndUpdate({ email }, { loggedIn: true }, { new: true });

        if (!user) {
            return next( new ErrorHandlerClass({message: "Invalid login credentials", statusCode: 404, position: "at Login api"} ) );
        }

        const passCheck = compareSync(password, user.password);

        if (!passCheck) {
            return next( new ErrorHandlerClass({message: "Invalid login credentials", statusCode: 404, position: "at Login api"} ) ); 
        }

        const token = jwt.sign(
            {
                _id: user._id,
                email: user.email
            },
            "accessToken",
            {
                expiresIn: "20d"
            }
        );

        res.status(200).json({ message: "User logged in ", token });

    } else {
        return next( new ErrorHandlerClass({message: "Initialize All Fields", statusCode: 400, position: "at Login api"} ) );
    }
}