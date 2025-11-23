import api from "../Lib/api";
import { HandleAxiosError } from "../Lib/ErrorHandler";
import type { LoginResult, RefreshTokenData, User } from "../Models/User";

//*************************************//
//*********** POST METHODS ************//
//*************************************//

/**
 * Authenticates a user with Google using the provided token.
 * @param token The Google ID token.
 * @returns The login result or undefined if authentication fails.
 */
export const AuthGoogle = async (token: string): Promise<LoginResult | undefined> => {
    try {
        const response = await api.post<LoginResult>("/api/Auth/google", {
            token: token,
        });
        return response.data;
    } catch (error) {
        HandleAxiosError(error);
    }
};

/**
 * Refreshes the authentication token using the provided refresh token.
 * @param refreshData The refresh token data.
 * @returns The new login result or undefined if the refresh fails.
 */
export const RefreshToken = async (
    refreshData: RefreshTokenData
): Promise<LoginResult | undefined> => {
    try {
        const response = await api.post<LoginResult>("/api/Auth/refresh", refreshData);
        return response.data;
    } catch (error) {
        HandleAxiosError(error);
    }
};

/**
 * Adds a new user to the system.
 * @param newUserData The data for the new user.
 * @returns The result of the new user creation or undefined if it fails.
 */
export const AddUser = async (newUserData: User): Promise<boolean> => {
    try {
        const response = await api.post("/api/Auth/user", newUserData);
        return response.status === 200;
    } catch (error) {
        HandleAxiosError(error);
        return false;
    }
};

//************************************//
//*********** GET METHODS ************//
//************************************//

/**
 * Retrieves the user's profile information.
 * @returns The user's profile or undefined if not found.
 */
export const GetUserProfile = async (): Promise<User | undefined> => {
    try {
        const response = await api.get<User>("/api/Auth/me");
        return response.data;
    } catch (error) {
        HandleAxiosError(error);
    }
};

/**
 * Retrieves a list of users.
 * @returns A list of users.
 */
export const GetUsers = async (): Promise<User[]> => {
    try {
        const response = await api.get<User[]>("/api/Auth/users");
        return response.data;
    } catch (error) {
        HandleAxiosError(error);
        return [];
    }
};

//**************************************//
//*********** PATCH METHODS ************//
//**************************************//

/**
 * Updates the authenticated user's profile information.
 * @param updateData The data to update the user's profile.
 * @returns True if the update was successful, false otherwise.
 */
export const UpdateMe = async (updateData: User): Promise<boolean> => {
    try {
        const response = await api.patch("/api/Auth/me", updateData);
        return response.status === 200;
    } catch (error) {
        HandleAxiosError(error);
        return false;
    }
};

//***************************************//
//*********** DELETE METHODS ************//
//***************************************//

/**
 * Deletes a user from the system.
 * @param deleteData The data for the user to delete.
 * @returns True if the deletion was successful, false otherwise.
 */
export const DeleteUser = async (deleteData: User): Promise<boolean> => {
    try {
        const response = await api.delete("/api/Auth/user", {
            data: deleteData,
        });
        return response.status === 200;
    } catch (error) {
        HandleAxiosError(error);
        return false;
    }
};
