export enum EnrollmentStatus {
    ACTIVE = 'Active',
    DROPPED = 'Dropped',
    COMPLETED = 'Completed'
}

export class Enrollment {
    constructor(
        public id: string,
        public studentId: string,
        public courseId: string,
        public enrollmentDate: Date = new Date(),
        public status: EnrollmentStatus = EnrollmentStatus.ACTIVE
    ) { }
}
