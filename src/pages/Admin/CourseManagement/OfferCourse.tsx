/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Flex } from "antd";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import FormWrapper from "../../../components/Form/Form";
import ITimePicker from "../../../components/Form/ITimePicker";
import InputValue from "../../../components/Form/Input";
import SelectComponent from "../../../components/Form/Select";
import SelectComponentWithWatch from "../../../components/Form/SelectComponentWithWatch";
import { daysOptions } from "../../../constant/CourseManagement";
import { useGetAllAcademicDepartmentQuery } from "../../../redux/features/admin/AcademicManagement/academicDepartmentApi";
import { useGetAllAcademicFacultiesQuery } from "../../../redux/features/admin/AcademicManagement/academicFacultyApi";
import {
  useCreateOfferedCourseMutation,
  useGetAllCoursesQuery,
  useGetAllRegisteredSemestersQuery,
  useGetCourseWithFacultiesQuery,
} from "../../../redux/features/admin/CourseManagement/CourseManagementApi";
import { TCreateResponse } from "../../../types";
import { toast } from "sonner";
import moment from "moment";

const OfferCourse = () => {
  const [id, setId] = useState("");

  const { data: semesterRegistration } =
    useGetAllRegisteredSemestersQuery(undefined);
  const { data: academicFaculty } = useGetAllAcademicFacultiesQuery(undefined);
  const { data: academicDepartment } =
    useGetAllAcademicDepartmentQuery(undefined);
  const { data: courses } = useGetAllCoursesQuery(undefined);
  const { data: coursesWithFaculties, isFetching: facultyFetching } =
    useGetCourseWithFacultiesQuery(id, { skip: !id });
  const [createOfferedCourse] = useCreateOfferedCourseMutation();

  const semesterOptions = semesterRegistration?.data
    ?.filter((item) => item.status === "ONGOING")
    .map((data) => ({
      value: data._id,
      label: data.academicSemester.name,
    }));

  const academicFacultyOptions = academicFaculty?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const academicDepartmentOptions = academicDepartment?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const coursesOptions = courses?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  const facultyOptions = coursesWithFaculties?.data?.faculties?.map(
    (item: any) => ({
      value: item._id,
      label: item.fullName,
    })
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const offerCourseData = {
      ...data,
      maxCapacity: Number(data.maxCapacity),
      section: Number(data.section),
      startTime: moment(new Date(data.startTime)).format("HH:mm"),
      endTime: moment(new Date(data.endTime)).format("HH:mm"),
    };

    try {
      const res = (await createOfferedCourse(
        offerCourseData
      )) as TCreateResponse;

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Offered Courses created", { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <FormWrapper onSubmit={onSubmit}>
          <SelectComponent
            label="Semester Registration"
            name="semesterRegistration"
            options={semesterOptions}
          />
          <SelectComponent
            label="Academic Faculty"
            name="academicFaculty"
            options={academicFacultyOptions}
          />
          <SelectComponent
            label="Academic Department"
            name="academicDepartment"
            options={academicDepartmentOptions}
          />
          <SelectComponentWithWatch
            label="Course"
            name="course"
            onValueChange={setId}
            options={coursesOptions}
          />

          <SelectComponent
            label="Faculty"
            name="faculty"
            options={facultyOptions}
            disabled={!id || facultyFetching}
          />

          <InputValue
            placeholder="Enter Max Capacity"
            type="text"
            name="maxCapacity"
            label="Max Capacity"
          />
          <InputValue
            placeholder="Enter section"
            type="text"
            name="section"
            label="Section"
          />
          <SelectComponent
            mode="multiple"
            name="days"
            label="Days"
            options={daysOptions}
          />
          <ITimePicker name="startTime" label="Start Time" />
          <ITimePicker name="endTime" label="End Time" />

          <Button htmlType="submit">Submit</Button>
        </FormWrapper>
      </Col>
    </Flex>
  );
};

export default OfferCourse;
