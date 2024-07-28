import { ErrorHandlerClass } from "../utils/error-class.utils.js";


export const errorHandle = (API) => {
    return (req, res, next) => {
        API(req, res, next).catch(
            (err) => {
                console.log("Error in errorHandle middleware", err);
                next( new ErrorHandlerClass( {message: err.message, statusCode: err.statusCode, stack: err.stack, position: err.position, data: err.data} ) );
            }
        );       
    };
};

export const globalResponse = (err, req, res, next) => {
    if(err){
        res.status(err["statusCode"] || 500 ).json({
            message: "Error",
            error: err.message,
            stack: err.stack,
            position: err.position,
            data: err.data
        });    
    }
}