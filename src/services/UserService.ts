import { Storage } from './Storage';
import { User, UserRole } from '../models/User';
import { Student } from '../models/Student';
import { Instructor } from '../models/Instructor';

export class UserService {
    private studentStorage: Storage<Student>;
    private instructorStorage: Storage<Instructor>;

    constructor(studentStorage: Storage<Student>, instructorStorage: Storage<Instructor>) {
        this.studentStorage = studentStorage;
        this.instructorStorage = instructorStorage;
    }

    searchUsers(query: string): User[] {
        const students = this.studentStorage.filter(s =>
            s.name.toLowerCase().includes(query.toLowerCase()) ||
            s.email.toLowerCase().includes(query.toLowerCase())
        );
        const instructors = this.instructorStorage.filter(i =>
            i.name.toLowerCase().includes(query.toLowerCase()) ||
            i.email.toLowerCase().includes(query.toLowerCase())
        );
        return [...students, ...instructors];
    }

    getStudent(id: string): Student | undefined {
        return this.studentStorage.getById(id);
    }

    getAllStudents(): Student[] {
        return this.studentStorage.getAll();
    }
}
