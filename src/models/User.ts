export enum UserRole {
    STUDENT = 'STUDENT',
    INSTRUCTOR = 'INSTRUCTOR',
    ADMIN = 'ADMIN'
}

export interface IUser {
    id: string;
    name: string;
    email: string;
    password?: string;
    role: UserRole;
}

export abstract class User implements IUser {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public role: UserRole,
        public password?: string
    ) { }
}
