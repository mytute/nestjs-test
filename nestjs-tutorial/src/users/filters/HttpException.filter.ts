import { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import { Request, Response } from "express";

export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        console.log(exception.getResponse());
        console.log(exception.getStatus());
        console.log(exception);
 
        const context = host.switchToHttp();
        const request = context.getRequest<Request>();
        const response = context.getResponse<Response>();

        response.sendStatus(exception.getStatus());

    }
}