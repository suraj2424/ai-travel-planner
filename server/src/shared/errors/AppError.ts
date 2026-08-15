export type ErrorDetail = {
  field: string;
  message: string;
};

class AppError extends Error{
  constructor(
    public statusCode: number,
    public errorCode: string,
    message: string,
    public isOperational: boolean = true,
    public details?: ErrorDetail[]
  ) {
    super(message);
  }
}

export default AppError;