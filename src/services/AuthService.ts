import { Storage } from './Storage';
import { User } from '../models/User';
import { Student } from '../models/Student';
import { Instructor } from '../models/Instructor';

export class AuthService {
    private currentUser: User | null = null;

    constructor(
        private studentStorage: Storage<Student>,
        private instructorStorage: Storage<Instructor>
    ) { }

    login(email: string, password: string): User {
        // Check students
        let user: User | undefined = this.studentStorage.find(s => s.email === email && s.password === password);

        // Check instructors
        if (!user) {
            user = this.instructorStorage.find(i => i.email === email && i.password === password);
        }

        if (!user) {
            throw new Error('Invalid credentials');
        }

        this.currentUser = user;
        console.log(`User ${user.name} logged in successfully.`);
        return user;
    }

    logout(): void {
        this.currentUser = null;
        console.log('Logged out.');
    }

    getCurrentUser(): User | null {
        return this.currentUser;
    }

    registerStudent(student: Student): void {
        this.studentStorage.add(student);
    }

    registerInstructor(instructor: Instructor): void {
        this.instructorStorage.add(instructor);
    }
}
