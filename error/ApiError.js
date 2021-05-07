import { BAD_REQUEST_STATUS, INTERNAL_STATUS, FORBIDDEN_STATUS } from '../constants';

export default class ApiError extends Error {
    constructor(status, message) {
        super();
        this.status = status;
        this.message = message;
    }

    static badRequest(message) {
        return new ApiError(BAD_REQUEST_STATUS, message);
    }

    static internal(message) {
        return new ApiError(INTERNAL_STATUS, message);
    }

    static forbidden(message) {
        return new ApiError(FORBIDDEN_STATUS, message);
    }
}
