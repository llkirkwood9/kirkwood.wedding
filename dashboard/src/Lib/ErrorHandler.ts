import axios from "axios";
import { Toast } from "./Toast";
import type { NavigateFunction } from "react-router-dom";

export let navigate: NavigateFunction | null = null;

export const setNavigateFunction = (navFunc: NavigateFunction) => {
    navigate = navFunc;
};

/**
 * Handles errors from Axios requests.
 * @param error The error object returned from Axios.
 */
export const HandleAxiosError = (error: any) => {
    if (axios.isAxiosError(error)) {
        const err = error.response;
        const status = err?.status;
        const data = err?.data; // The response data from the server

        if (status === 400 || status === 404) {
            if (data?.error) {
                Toast.ApiError(`Error ${status}: ${data.error}`);
            } else {
                Toast.ApiError("An error has occurred. Code: " + status);
            }
        } else if (status === 500) {
            let defaultError = "Internal Server Error";
            if (navigate)
                navigate("/error", {
                    state: {
                        code: 500,
                        errorMessage: data?.error || defaultError,
                        exception: data?.exception,
                    },
                });
            else {
                Toast.ApiError(`Error ${status}: ${data?.error || defaultError}`);
            }
        } else if (status === 403) {
            Toast.ApiError(`Error ${status}: You are not allowed to do that`);
        } else if (status === 401) {
            Toast.ApiError(`Error ${status}: Please login`);
        } else if (status) {
            Toast.ApiError(`Error ${status}: An error has occurred.`);
        } else {
            Toast.ApiError("An error has occurred.");
        }
    }
};
