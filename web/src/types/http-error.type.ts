export interface HttpError {
    message: string | string[];
    error: string;
    statusCode: number;
}