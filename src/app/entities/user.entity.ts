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

// Adresse Interface
export interface Adresse {
    city: string;
    streetName: string;
    adresseNumber: number;
    country: string;
    postalCode: number;
}

// Advertise Interface
export interface Advertise {
    id: number;
    title: string;
}

// Reaction Interface
export interface Reaction {
    note: number;
    isFavorite: boolean;
    user: string;
    Advertise: Advertise;
}

// Reservation Interface
export interface Reservation {
    user: string;
    Advertise: Advertise;
}

// UserHttp Interface (complétée)
export interface UserHttp {
    id: number;
    email: string;
    roles: string[];
    firstname: string;
    lastname: string;
    adresse?: Adresse;
    Advertise?: Advertise[];
    reactions?: Reaction[];
    reservations?: Reservation[];
}

// User Interface (complétée)
export interface User {
    id: number;
    email: string;
    roles: string[];
    firstname: string;
    lastname: string;
    adresse?: Adresse;
    advertises?: Advertise[];
    reactions?: Reaction[];
    reservations?: Reservation[];
}

// User Namespace (méthode fromHttp complétée)
export namespace User {
    export function fromHttp(userHttp: UserHttp): User {
        return {
            id: userHttp.id,
            email: userHttp.email,
            roles: userHttp.roles,
            firstname: userHttp.firstname,
            lastname: userHttp.lastname,
            adresse: userHttp.adresse,
            advertises: userHttp.Advertise || [],
            reactions: userHttp.reactions || [],
            reservations: userHttp.reservations || []
        };
    }
}