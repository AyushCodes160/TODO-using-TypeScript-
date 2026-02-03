import * as readline from 'readline';
import { Student } from './models/Student';
import { Instructor } from './models/Instructor';
import { Course, CourseLevel } from './models/Course';
import { Enrollment } from './models/Enrollment';
import { Storage } from './services/Storage';
import { UserService } from './services/UserService';
import { CourseService } from './services/CourseService';
import { EnrollmentService } from './services/EnrollmentService';
import { AuthService } from './services/AuthService';
import { UserRole } from './models/User';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const ask = (query: string): Promise<string> => {
    return new Promise(resolve => rl.question(query, resolve));
};

const run = async () => {
    console.log('--- Student Course Enrollment System (Interactive) ---\n');

    const studentStorage = new Storage<Student>();
    const instructorStorage = new Storage<Instructor>();
    const courseStorage = new Storage<Course>();
    const enrollmentStorage = new Storage<Enrollment>();

    const userService = new UserService(studentStorage, instructorStorage);
    const courseService = new CourseService(courseStorage);
    const enrollmentService = new EnrollmentService(enrollmentStorage, courseStorage, studentStorage);
    const authService = new AuthService(studentStorage, instructorStorage);

    // Seed some initial data for convenience
    const defaultInstructor = new Instructor('I1', 'Dr. Smith', 'smith@uni.edu', 'CS', 'p');
    authService.registerInstructor(defaultInstructor);
    courseService.addCourse(new Course('C1', 'CS101', 'Intro', CourseLevel.BEGINNER, 3, 'I1'));

    while (true) {
        console.log('\nPlease select an action:');
        console.log('1. Add Student');
        console.log('2. List Students');
        console.log('3. Add Course');
        console.log('4. List Courses');
        console.log('5. Enroll Student');
        console.log('6. Exit');

        const answer = await ask('Enter choice (1-6): ');

        switch (answer.trim()) {
            case '1':
                const sName = await ask('Name: ');
                const sEmail = await ask('Email: ');
                const sId = `S${Date.now()}`; // Simple auto ID
                const student = new Student(sId, sName, sEmail, 'pass123');
                authService.registerStudent(student);
                console.log(`Student ${sName} added with ID: ${sId}`);
                break;
            case '2':
                const students = userService.getAllStudents();
                console.log('\n--- Students ---');
                if (students.length === 0) console.log('No students found.');
                students.forEach(s => console.log(`[${s.id}] ${s.name} (${s.email})`));
                break;
            case '3':
                const cTitle = await ask('Course Title: ');
                const cDesc = await ask('Description: ');
                const cCredits = await ask('Credits: ');
                const cId = `C${Date.now()}`;
                const course = new Course(cId, cTitle, cDesc, CourseLevel.BEGINNER, parseInt(cCredits), defaultInstructor.id);
                courseService.addCourse(course);
                console.log(`Course ${cTitle} added with ID: ${cId}`);
                break;
            case '4':
                const courses = courseService.getAllCourses();
                console.log('\n--- Courses ---');
                if (courses.length === 0) console.log('No courses found.');
                courses.forEach(c => console.log(`[${c.id}] ${c.title} - ${c.credits} Credits`));
                break;
            case '5':
                const enrollSId = await ask('Student ID: ');
                const enrollCId = await ask('Course ID: ');
                try {
                    enrollmentService.enroll(enrollSId, enrollCId);
                    console.log('Enrollment Successful!');
                } catch (e: any) {
                    console.log(`Error: ${e.message}`);
                }
                break;
            case '6':
                console.log('Goodbye!');
                rl.close();
                process.exit(0);
            default:
                console.log('Invalid option.');
        }
    }
};

run();
