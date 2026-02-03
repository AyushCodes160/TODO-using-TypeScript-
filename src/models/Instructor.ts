import { User, UserRole } from './User';

export class Instructor extends User {
    public teachingCourseIds: string[] = [];

    constructor(
        id: string,
        name: string,
        email: string,
        department: string,
        password?: string
    ) {
        super(id, name, email, UserRole.INSTRUCTOR, password);
        this.department = department; // Assigning property dynamically or we can declare it
    }

    public department: string;
}
