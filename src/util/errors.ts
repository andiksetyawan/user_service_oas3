export const ErrorCodes = {
    API_VALIDATION_ERROR: 'API_VALIDATION_ERROR',
    CREDIT_CARD_DATA_ERROR: 'CREDIT_CARD_DATA_ERROR',
    INVALID_JSON_FORMAT: 'INVALID_JSON_FORMAT',
    REQUEST_FORBIDDEN_ERROR: 'REQUEST_FORBIDDEN_ERROR',
    USER_NOT_FOUND: 'USER_NOT_FOUND',
    CREDIT_CARD_CHARGE_NOT_FOUND_ERROR: 'CREDIT_CARD_CHARGE_NOT_FOUND_ERROR',
    GENERATE_CHECKOUT_URL_ERROR: 'GENERATE_CHECKOUT_URL_ERROR',
    DUPLICATE_PAYMENT_ERROR: 'DUPLICATE_PAYMENT_ERROR',
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR'
};
export const ErrorCodeMap: { [key: string]: number } = {
    API_VALIDATION_ERROR: 400,
    CREDIT_CARD_DATA_ERROR: 400,
    INVALID_JSON_FORMAT: 400,
    REQUEST_FORBIDDEN_ERROR: 403,
    USER_NOT_FOUND: 404,
    CREDIT_CARD_CHARGE_NOT_FOUND_ERROR: 404,
    GENERATE_CHECKOUT_URL_ERROR: 422,
    DUPLICATE_PAYMENT_ERROR: 422,
    INTERNAL_SERVER_ERROR: 500
};
