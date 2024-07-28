import jwt from "jsonwebtoken";
import userModel from "../../DB/models/user.model.js";
import { ErrorHandlerClass } from "../utils/error-class.utils.js";


export const auth = () => {
    return async (req, res, next ) => {
    
            const { token } = req.headers;

            if(!token){
                return next( new ErrorHandlerClass({message: "Please signIn first , there is no token generated", statusCode: 400, position: "at auth api"}) );
            }

            if(!token.startsWith("chatApp")){
                return next( new ErrorHandlerClass({message: "Invalid Token", statusCode: 400, position: "at auth api"}) );

            }

            const originalToken = token.split(" ")[1];

            //decode
            const decodedData = jwt.verify(originalToken, "accessToken");

            if(!decodedData?._id){
                return next( new ErrorHandlerClass({message: "Invalid Token payload", statusCode: 400, position: "at auth api"}) );     
            }

            //findUserId
            const user = await userModel.findById(decodedData._id).select("-password");

            if(!user){
                return next( new ErrorHandlerClass({message: "Please signUp and try to login", statusCode: 404, position: "at auth api"}) );
            }

            req.authUser = user;
            next();

    };
}