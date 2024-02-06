import { z } from "zod";

export const academicSemesterSchema = z.object({
  code: z.string({ required_error: "Please enter a name" }),
  year: z.string({ required_error: "Please enter a year" }),
  startMonth: z.string({ required_error: "Please enter a start month" }),
  endMonth: z.string({ required_error: "Please enter a end month" }),
});

export const academicFacultySchema = z.object({
  name: z.string({ required_error: "Please enter a name" }),
});

export const academicDepartmentSchema = z.object({
  name: z.string({ required_error: "Please enter a name" }),
});
