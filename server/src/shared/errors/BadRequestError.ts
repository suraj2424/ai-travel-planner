import AppError, { type ErrorDetail } from "./AppError";

class BadRequestError extends AppError {
  constructor(
    errorCode: string,
    message: string,
    details?: ErrorDetail[]
  ) {
    super(400, errorCode, message, true, details);
  }
}

export default BadRequestError;