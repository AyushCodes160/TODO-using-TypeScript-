export enum CourseLevel {
    BEGINNER = 'Beginner',
    INTERMEDIATE = 'Intermediate',
    ADVANCED = 'Advanced'
}

export class Course {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public level: CourseLevel,
        public credits: number,
        public instructorId: string,
        public capacity: number = 30
    ) { }
}
