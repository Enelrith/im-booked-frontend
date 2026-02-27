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

export interface BusinessThumbnail {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
}

export interface Business {
  id: string | null;
  name: string | File | null;
  email: string | File | null;
  phone: string | undefined;
  description: string | File | null;
  address: string | File | null;
  city: string | File | null;
  country: string | File | null;
  isActive: boolean;
}
