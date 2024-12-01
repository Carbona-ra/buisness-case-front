export interface UserJWTHttp {
    firstName: string
    lastName: string
    roles: string[]
    username: string
    id: number
    iat: number
    exp: number
}

export interface UserJWT {
    id: number
    firstname: string
    lastname: string
    roles: string[]
    username: string
}


export namespace UserJWT {
    export function fromHttp(userJWTHttp: UserJWTHttp): UserJWT {
        return {
            id: userJWTHttp.id,
            firstname: userJWTHttp.firstName,
            lastname: userJWTHttp.lastName,
            roles: userJWTHttp.roles,
            username: userJWTHttp.username,
        }
    }
}


export interface UserHttp {
    id: number;
    email: string;
    roles: string[];
    firstname: string;
    lastname: string;
}

export interface User {
    id: number;
    email: string;
    roles: string[];
    firstname: string;
    lastname: string;
}

export namespace User {
    export function fromHttp(userHttp: UserHttp): User {
        return {
            id: userHttp.id,
            email: userHttp.email,
            roles: userHttp.roles,
            firstname: userHttp.firstname, 
            lastname: userHttp.lastname
        };
    }
}

