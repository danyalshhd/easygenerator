"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AllExceptionsFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
let AllExceptionsFilter = AllExceptionsFilter_1 = class AllExceptionsFilter {
    constructor() {
        this.logger = new common_1.Logger(AllExceptionsFilter_1.name);
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const statusCode = this.getStatusCode(exception);
        const errorResponse = {
            status: false,
            ...this.getErrorMessage(exception, statusCode),
            path: request.url,
            timestamp: new Date().toISOString(),
        };
        response.status(statusCode).json(errorResponse);
    }
    getStatusCode(exception) {
        if (exception instanceof common_1.HttpException) {
            return exception.getStatus();
        }
        else if (exception instanceof class_validator_1.ValidationError) {
            return common_1.HttpStatus.BAD_REQUEST;
        }
        else {
            return common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }
    getErrorMessage(exception, statusCode) {
        console.log({ exception });
        if (exception instanceof class_validator_1.ValidationError) {
            console.log("ValidationError");
            return {
                message: Object.values(exception.value)
                    .map((err) => err.message)
                    .join(', '),
                errors: [],
            };
        }
        else if (exception instanceof common_1.HttpException) {
            console.log("HttpException");
            const responseContent = exception.getResponse();
            let errors = [];
            if (typeof responseContent?.message === 'string') {
                errors = [responseContent?.message];
            }
            else {
                errors = responseContent?.message
                    ? responseContent?.message.map((item) => {
                        return {
                            name: statusCode === 400 ? 'ValidatorError' : 'HttpException',
                            message: item,
                        };
                    })
                    : [exception.message];
            }
            return {
                message: errors[0].message || errors[0],
                errors: errors,
            };
        }
        else if (exception instanceof Error) {
            console.log("Error ");
            const errors = [];
            if (exception['errors']) {
                for (const key of Object.keys(exception['errors'])) {
                    errors.push(exception['errors'][key]);
                }
            }
            return {
                message: exception.message,
                errors: errors,
            };
        }
        else {
            console.log("else");
            return {
                message: 'Internal server error',
                errors: [],
            };
        }
    }
};
exports.AllExceptionsFilter = AllExceptionsFilter;
exports.AllExceptionsFilter = AllExceptionsFilter = AllExceptionsFilter_1 = __decorate([
    (0, common_1.Catch)()
], AllExceptionsFilter);
//# sourceMappingURL=all-exceptions.filter.js.map