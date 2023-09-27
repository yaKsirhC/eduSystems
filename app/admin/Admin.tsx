"use client";

import { modalContext } from "@/app/context/ModalProvider";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { FormEvent, useContext } from "react";
import { registerStudent, registerTeacher } from "../utils/serverActions";
import { toast } from "react-toastify";
import Teacher from "./maps/Teacher";
import Student from "./maps/Students";
import Link from "next/link";

interface props {
  students: any[];
  teachers: any[];
  courses: any[];
}

export default function Admin({ courses, students, teachers }: props) {
  const { setModal } = useContext(modalContext);

  async function handleCreateTeacher(e: FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email")?.toString();
    const passoword = formData.get("password")?.toString();
    const cpassword = formData.get("cpassword")?.toString();
    const name = formData.get("name")?.toString();
    const profession = formData.get("profession")?.toString();
    if (!email || !passoword || !cpassword || !name || !profession) return toast.error("missing field");

    if (cpassword !== passoword) return toast.error("Passwords do not match");
    try {
      await registerTeacher(email, passoword, name, profession);
      setModal({ element: undefined });
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.message ?? error.message);
    }
  }
  async function handleCreateStudent(e: FormEvent) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email")?.toString();
    const passoword = formData.get("password")?.toString();
    const cpassword = formData.get("cpassword")?.toString();
    const name = formData.get("name")?.toString();
    if (!email || !passoword || !cpassword || !name) return toast.error("missing field");

    if (cpassword !== passoword) return toast.error("Passwords do not match");
    try {
      await registerStudent(email, passoword, name);
      setModal({ element: undefined });
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.message ?? error.message);
    }
  }

  function showCreateTeacherModal() {
    setModal({
      title: "Register Teacher",
      element: (
        <form onSubmit={handleCreateTeacher} className="pb-4 register">
          <fieldset>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" />
          </fieldset>
          <fieldset>
            <label htmlFor="name">Profession</label>
            <input type="text" id="profession" name="profession" />
          </fieldset>
          <fieldset>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />
          </fieldset>
          <fieldset>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
          </fieldset>
          <fieldset>
            <label htmlFor="cpassword">Confirm Password</label>
            <input type="password" id="cpassword" name="cpassword" />
          </fieldset>
          <button>Register Teacher</button>
        </form>
      ),
    });
  }
  function showCreateStudentModal() {
    setModal({
      title: "Register Student",
      element: (
        <form onSubmit={handleCreateStudent} className="pb-4 register">
          <fieldset>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" />
          </fieldset>
          <fieldset>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />
          </fieldset>
          <fieldset>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
          </fieldset>
          <fieldset>
            <label htmlFor="cpassword">Confirm Password</label>
            <input type="password" id="cpassword" name="cpassword" />
          </fieldset>
          <button>Register Student</button>
        </form>
      ),
    });
  }

  return (
    <div className="admin flex">
      <main className="grid grid-cols-2 grid-rows-2 my-4 w-full gap-4 mx-4">
        <section className="courses">
          <h1>
            <span>Courses</span>
            <Link href="/admin/create-course" className="text-cgreen">
              Create a Course
              <Icon icon="material-symbols:add" color="inherit" />
            </Link>
          </h1>
          {courses.map((course) => {
            return course.id;
          })}
        </section>
        <section>
          <h1>
            <span>Students</span>
            <button onClick={showCreateStudentModal} className="text-cgreen">
              Register a Student
              <Icon icon="material-symbols:add" color="inherit" />
            </button>
          </h1>
          <div className="map">
            {students.map((student, i) => {
              return <Student key={i} student={student} />;
            })}
          </div>
        </section>
        <section>
          <h1>
            <span>Teachers</span>
            <button onClick={showCreateTeacherModal} className="text-cgreen">
              Register a Teacher
              <Icon icon="material-symbols:add" color="inherit" />
            </button>
          </h1>
          <div className="map">
            {teachers.map((teacher,i) => {
              return <Teacher key={i} teacher={teacher} />;
            })}
          </div>
        </section>
        {/* <section>
			Students
		  </section> */}
      </main>
    </div>
  );
}
