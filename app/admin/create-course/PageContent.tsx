"use client";

import Link from "next/link";
import "../../styles/createCourse.scss";
import { ChangeEvent, FormEvent, createContext, useState } from "react";
import Select from "react-select";
// import { createAssignment } from "@/app/utils/serverActions";
import { toast } from "react-toastify";
import Assignments from "./Assignments";

import { Admin, Assignment, Course, School, Student, Submission, Teacher } from "../../types";
import { createCourse } from "@/app/utils/serverActions";

interface props {
  teachers: Teacher[];
  students: Student[];
}
type contType = {
  assignment: Assignment;
  setAssignment: Function;
};

export const CourseContext = createContext<contType>({
  assignment: {
    description: "",
    submissions: [],
    id: "",
    points: 100,
    name: "",
    // @ts-ignore
    attachments: [],
  },
  setAssignment: (_pre: any) => {},
});

export default function PageContent({ students, teachers }: props) {
  const [mode, setMode] = useState("course");
  const [course, setCourse] = useState<Course>({
    assignments: [],
    attachments: [],
    description: "",
    name: "",
    students:[],
    teachers:[],
  });
  const [assignment, setAssignment] = useState<Assignment>({
    attachments: [],
    description: "",
    name: "",
    points: 100,
    submissions: [],
    id: "",
  });

  async function handleCreateCourseChange(e: ChangeEvent) {
    const target = e.target as HTMLInputElement;
    const name = target.name;
    if (name == "attachments") {
      setCourse((pre: any) => ({
        ...pre,
        [name]: ["https://edusystems.nyc3.cdn.digitaloceanspaces.com/DeepinScreenshot_select-area_20230926221803.png", "https://edusystems.nyc3.cdn.digitaloceanspaces.com/DeepinScreenshot_select-area_20230926221803.png"],
      }));
      return;
    }
    setCourse((pre: any) => ({
      ...pre,
      [name]: target.value,
    }));
  }

  async function handleSelectChange(vals: any[], name: string) {
    console.log(vals);
    setCourse((pre: any) => ({
      ...pre,
      [name]: vals.map((val) => val.value),
    }));
  }

  async function handleCreateAssignmentChange(e: ChangeEvent) {
    const target = e.target as HTMLInputElement;
    const name = target.name;
    setAssignment((pre) => ({
      ...pre,
      [name]: target.value,
    }));
  }

  async function handleCreateAssignmentSubmit(e: FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const points = formData.get("points");
    const name = formData.get("name");
    const description = formData.get("description");
    const attachments = formData.getAll("attachments").map((attach) => attach.valueOf());
    console.log(attachments);
    if (!points || !name || !description || !attachments) return toast.error("Missing Fields");
// @ts-ignore
    course.assignments.push({attachments:["https://edusystems.nyc3.digitaloceanspaces.com"],description,name,points:parseInt(points)});
    setCourse((pre) => {
      return { ...pre, assignments: course.assignments };
    });
    setMode("course");
  }

  async function handleCreateCourseSubmit(e: FormEvent) {
    e.preventDefault();
    const students = course.students.map((student) => ({
      id: student.id
    }));
    const teachers = course.teachers.map((teacher) => ({
      id: teacher.id
    }));
    console.log(course.assignments)
    try {
      const createdCourse = await createCourse(course.description, course.name, students, course.assignments, teachers);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message ?? "Unexpected Error");
    }
  }

  return (
    <CourseContext.Provider value={{ assignment, setAssignment }}>
      <form onSubmit={handleCreateCourseSubmit} className={"create-course " + (mode == "course" ? "" : "!hidden")}>
        <div className="btns flex gap-2 justify-self-end">
          <Link href="/" className="transition-all px-4 py-1 hover:bg-slate-100 rounded-full">
            Cancel
          </Link>
          <button className="transition-all px-4 py-1 rounded-full hover:bg-slate-900 bg-slate-800 text-white">Create</button>
        </div>
        <div className="flex gap-4 flex-col">
          <fieldset>
            <label htmlFor="name">Name</label>
            <input key={12} onChange={handleCreateCourseChange} type="text" name="name" id="name" placeholder="Maths 101" />
          </fieldset>
          <fieldset>
            <label htmlFor="name">Description</label>
            <textarea className="" rows={5} name="description" id="description" placeholder="The only Calculus Lecture you need for differential equations and more!" />
          </fieldset>
          <fieldset>
            <label htmlFor="name">Attachments</label>
            <input onChange={handleCreateCourseChange} type="file" multiple name="attachments" id="attachments" />
          </fieldset>
          <fieldset>
            <label htmlFor="name">Teachers</label>
            <Select onChange={(val: any) => handleSelectChange(val, "teachers")} isMulti options={teachers.map((teach) => ({ value: teach, label: teach.name }))} instanceId={11} name="teacher" id="teacher" />
            {course.teachers.length == 0 && <h2 className="text-slate-600 text-sm">No teachers assigned on this course</h2>}
            {course.teachers.length > 0 &&
              course.teachers.map((teacher, i) => {
                return <p key={i}>{teacher.name}</p>;
              })}
          </fieldset>
          <fieldset>
            <label htmlFor="name">Students</label>
            <Select onChange={(val: any) => handleSelectChange(val, "students")} isMulti options={students.map((student) => ({ value: student, label: student.name }))} instanceId={1} name="student" id="student" />
            {course.students.length == 0 && <h2 className="text-slate-600 text-sm">No Students assigned on this course</h2>}
            {course.students.length > 0 &&
              course.students.map((student, i) => {
                return <p key={i}>{student.name}</p>;
              })}
          </fieldset>
          <fieldset>
            <label htmlFor="name">Assignments</label>
            {course.assignments.length > 0 ? (
              course.assignments.map((assignment,i) => {
                // @ts-ignore
                return <Assignments key={i} assignment={assignment} />;
              })
            ) : (
              <h2 className="text-slate-600 text-sm">No Assignments in Course</h2>
            )}
            <button onClick={() => setMode("assignment")} className="px-4 py-1 hover:bg-white transition-all rounded-full bg-slate-100">
              Create Assignment
            </button>
          </fieldset>
        </div>
        <div className="preview"></div>
      </form>
      <form onSubmit={handleCreateAssignmentSubmit} className={"create-assignment " + (mode == "course" ? "!hidden" : "")}>
        <div className="btns flex gap-2 justify-self-end">
          <button type="reset" onClick={() => setMode("course")} className="transition-all px-4 py-1 hover:bg-slate-100 rounded-full">
            Cancel
          </button>
          <button type="submit" className="transition-all px-4 py-1 rounded-full hover:bg-slate-900 bg-slate-800 text-white">
            Create
          </button>
        </div>
        <div className="flex flex-wrap gap-4 h-max">
          <fieldset>
            <label htmlFor="name">Name</label>
            <input onChange={handleCreateAssignmentChange} size={3} type="text" name="name" id="name" placeholder="Maths 101" />
          </fieldset>
          <fieldset>
            <label htmlFor="name">Description</label>
            <input onChange={handleCreateAssignmentChange} size={3} type="text" multiple name="description" id="description" />
          </fieldset>
          <fieldset>
            <label htmlFor="name">Attachments</label>
            <input onChange={handleCreateAssignmentChange} size={3} type="file" multiple name="attachments" id="attachments" />
          </fieldset>
          <fieldset>
            <label htmlFor="name">Points</label>
            <input onChange={handleCreateAssignmentChange} size={3} type="number" name="points" id="number" defaultValue={100} />
          </fieldset>
        </div>
      </form>
    </CourseContext.Provider>
  );
}
