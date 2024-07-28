



export class ErrorHandlerClass extends Error {
    constructor({message, statusCode, stack, position, data}){
        super(message,stack)
        this.statusCode = statusCode,
        this.position = position ? position : "Error",
        this.data = data ? data : null
    }
}