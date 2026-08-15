import AppError, { type ErrorDetail } from "./AppError";

class NotFoundError extends AppError {
  constructor(
    errorCode: string,
    message: string,
    details?: ErrorDetail[]
  ) { 
    super(404, errorCode, message, true, details);
  }
}

export default NotFoundError;