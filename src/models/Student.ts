import { User, UserRole } from './User';

export class Student extends User {
    public enrolledCourseIds: string[] = [];
    public gpa: number = 0;

    constructor(
        id: string,
        name: string,
        email: string,
        password?: string
    ) {
        super(id, name, email, UserRole.STUDENT, password);
    }
}
