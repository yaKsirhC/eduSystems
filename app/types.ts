export interface Student {
	id?: string,
  name: string;
  enrollments: Course[];
  email: string;
  password: string;
  schools: School[];
  submissions: Submission[];
}

export interface Teacher {
	id?: string,
  name: string;
  profession: string;
  courses: Course[];
  email: string;
  password: string;
  schools: School[];
}

export interface Admin {
	id?: string,
	name: string,
	email: string,
	password: string,
	school: School
}

export interface School {
	id?: string,
	name: string,
	teachers: Teacher[],
	students: Student[],
	admin: Admin
}

export interface Course {
	id?: string,
	name: string,
	assignments: Assignment[],
	description: string,
	teachers: Teacher[],
	students: Student[],
	attachments: string[],
}

export interface Assignment {
	id?: string,
	name: string,
	description: string,
	attachments: string[],
	points: number,
	submissions: Submission[],
}

export interface Submission {
	id?: string,
	answer: string,
	note: string,
	grade: number,
	student: Student
}