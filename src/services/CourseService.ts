import { Storage } from './Storage';
import { Course, CourseLevel } from '../models/Course';

export class CourseService {
    constructor(private storage: Storage<Course>) { }

    addCourse(course: Course) {
        this.storage.add(course);
    }

    getAllCourses(): Course[] {
        return this.storage.getAll();
    }

    getCourse(id: string): Course | undefined {
        return this.storage.getById(id);
    }

    // Filter by level
    filterByLevel(level: CourseLevel): Course[] {
        return this.storage.filter(c => c.level === level);
    }

    // Sort by credits
    getSortedByCredits(ascending: boolean = true): Course[] {
        const courses = this.storage.getAll();
        return courses.sort((a, b) => ascending ? a.credits - b.credits : b.credits - a.credits);
    }

    // Pagination
    getPaginatedCourses(page: number, pageSize: number): Course[] {
        const courses = this.storage.getAll();
        const startIndex = (page - 1) * pageSize;
        return courses.slice(startIndex, startIndex + pageSize);
    }
}
