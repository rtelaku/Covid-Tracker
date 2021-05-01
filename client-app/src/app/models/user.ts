export interface User {
    username: string;
    displayName: string;
    email: string,
    password: string,
    token: string;
    image?: string;
    photos?: Photo[];
}

export interface UserFormValues {
    email: string;
    password: string;
    displayName?: string;
    username?: string;
}

export class User implements UserFormValues {
    constructor(user: UserFormValues) {
        this.username = user.username!;
        this.displayName = user.displayName!;
        this.email = user.email;
        this.password = user.password;
    }
}

export interface Photo {
    id: string;
    url: string;
    isMain: boolean;
}