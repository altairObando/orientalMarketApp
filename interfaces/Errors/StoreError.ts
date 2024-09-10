import { ErrorState } from './ErrorState';

export interface StoreError {
    id:        ErrorState;
    storeName: ErrorState;
    storeDesc: ErrorState;
    user:      ErrorState;
    address1:  ErrorState;
    address2:  ErrorState;
    contact:   ErrorState;
    idNumber:  ErrorState;
    latitude:  ErrorState;
    longitude: ErrorState;
    email: ErrorState;
    phone: ErrorState;    
}

export const extractStoreError = (errorData: any): StoreError => {
    let errorResult = {} as StoreError;    
    Object.keys(errorData).forEach((key: string) => {
        if (errorData[key]) {
            let newState: ErrorState = {
                errorMsg: errorData[key].join(),
                hasError: true
            };
            errorResult[key as keyof StoreError] = newState;
        } else {
            // Si no hay error para esta clave, aseguramos que el estado por defecto está presente
            errorResult[key as keyof StoreError] = { hasError: false, errorMsg: '' };
        }
    });
    
    return errorResult;
}
