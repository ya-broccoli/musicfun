import {toast} from 'react-toastify';
import {isErrorWithDetailArray, isErrorWithProperty, errorToast} from '@/common/utils';
import {FetchBaseQueryError} from '@reduxjs/toolkit/query';
import {trimToMaxLength} from '@/common/utils/trimToMaxLength';

export const handlerErrors = (error: FetchBaseQueryError) => {
    if (error) {
        switch (error.status) {
            case 'FETCH_ERROR':
            case 'PARSING_ERROR':
            case 'CUSTOM_ERROR':
            case 'TIMEOUT_ERROR':
                toast(error.error)
                break

            case 400:
                if(isErrorWithDetailArray(error.data)) {
                    const errorMessage = error.data.errors[0].detail
                    if(errorMessage.includes('refresh')) return
                    errorToast(trimToMaxLength(error.data.errors[0].detail))
                } else {
                    errorToast(JSON.stringify(error.data))
                }
                break

            case 403:
                if(isErrorWithDetailArray(error.data)) {
                    errorToast(trimToMaxLength(error.data.errors[0].detail))
                } else {
                    errorToast(JSON.stringify(error.data))
                }
                break

            case 404:
                if(isErrorWithProperty(error.data, 'error')) {
                    errorToast(error.data.error)
                } else {
                    errorToast(JSON.stringify(error.data))
                }
                break

            case 429:
                // ✅ 1. Type Assertions
                // toast((result.error.data as { message: string }).message, {type: 'error', theme: 'colored'})

                // ✅ 2. JSON.stringify
                // toast(JSON.stringify(result.error.data), {type: 'error', theme: 'colored'})

                // ✅ 3. Type Predicate (с помощью функции typeGuard)
                if(isErrorWithProperty(error.data, 'message')) {
                    errorToast(error.data.message)
                } else {
                    errorToast(JSON.stringify(error.data))
                }
                break

            default:
                if(error.status >= 500 && error.status < 600) {
                    errorToast('Server error occurred. Please try again later')
                } else {
                    errorToast('Some error occurred')
                }
        }
    }
}
