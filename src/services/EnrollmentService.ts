import { Storage } from './Storage';
import { Enrollment, EnrollmentStatus } from '../models/Enrollment';
import { Course } from '../models/Course';
import { Student } from '../models/Student';


export class EnrollmentService {
    constructor(
        private enrollmentStorage: Storage<Enrollment>,
        private courseStorage: Storage<Course>,
        private studentStorage: Storage<Student>
    ) { }

    enroll(studentId: string, courseId: string): Enrollment {
        const course = this.courseStorage.getById(courseId);
        const student = this.studentStorage.getById(studentId);

        if (!course) throw new Error('Course not found');
        if (!student) throw new Error('Student not found');

        const existing = this.enrollmentStorage.find(e =>
            e.studentId === studentId &&
            e.courseId === courseId &&
            e.status === EnrollmentStatus.ACTIVE
        );
        if (existing) {
            throw new Error('Student is already enrolled in this course');
        }

        const enrolledCount = this.enrollmentStorage.filter(e =>
            e.courseId === courseId && e.status === EnrollmentStatus.ACTIVE
        ).length;

        if (enrolledCount >= course.capacity) {
            throw new Error('Course is full');
        }

        const enrollmentId = `ENR-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        const enrollment = new Enrollment(enrollmentId, studentId, courseId);

        this.enrollmentStorage.add(enrollment);

        student.enrolledCourseIds.push(courseId);
        this.studentStorage.update(studentId, student);

        return enrollment;
    }

    drop(studentId: string, courseId: string): void {
        const enrollment = this.enrollmentStorage.find(e =>
            e.studentId === studentId &&
            e.courseId === courseId &&
            e.status === EnrollmentStatus.ACTIVE
        );

        if (!enrollment) {
            throw new Error('Enrollment not found');
        }

        this.enrollmentStorage.update(enrollment.id, { status: EnrollmentStatus.DROPPED });

        const student = this.studentStorage.getById(studentId);
        if (student) {
            student.enrolledCourseIds = student.enrolledCourseIds.filter(id => id !== courseId);
            this.studentStorage.update(studentId, student);
        }
    }

    getStudentEnrollments(studentId: string): Enrollment[] {
        return this.enrollmentStorage.filter(e => e.studentId === studentId);
    }
}
