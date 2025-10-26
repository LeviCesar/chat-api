export interface ITokenJwt {
    sub: number;
    username: string;
    exp: number;
    iat: number;
    tokenType: string;
    jti: string;
}