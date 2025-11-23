export type User = {
    firstName?: string;
    lastName?: string;
    email?: string;
};

export type LoginResult = {
    token: string;
    refreshToken: string;
};

export type RefreshTokenData = {
    refreshToken: string;
};
