export interface ValidationErrors {
  [field: string]: string;
}

export interface ErrorResponse {
  timestamp: string;
  status: number;
  message: string;
  error: string;
  path: string;
  validationErrors: ValidationErrors | null;
}
