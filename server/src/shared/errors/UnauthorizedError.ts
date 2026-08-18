import AppError, { type ErrorDetail } from "./AppError";

class UnauthorizedError extends AppError {
  constructor(
    error_code: string,
    message: string,
    details?: ErrorDetail[]
  ) {
    super(401, error_code, message, true, details);
  }
}

export default UnauthorizedError;