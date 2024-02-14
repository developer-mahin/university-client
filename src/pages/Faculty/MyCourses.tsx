/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FormWrapper from "../../components/Form/Form";
import SelectComponent from "../../components/Form/Select";
import { useGetAllFacultyCoursesQuery } from "../../redux/features/faculty/facultyApi";

const MyCourses = () => {
  const { data: facultyCoursesData } = useGetAllFacultyCoursesQuery(undefined);
  const navigate = useNavigate();

  console.log(facultyCoursesData);

  const semesterOptions = facultyCoursesData?.data?.map((item: any) => ({
    label: `${item.academicSemester.name} ${item.academicSemester.year}`,
    value: item.semesterRegistration._id,
  }));

  const courseOptions = facultyCoursesData?.data?.map((item: any) => ({
    label: item.course.title,
    value: item.course._id,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    navigate(`/faculty/courses/${data.semesterRegistration}/${data.course}`);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <FormWrapper onSubmit={onSubmit}>
          <SelectComponent
            options={semesterOptions}
            name="semesterRegistration"
            label="Semester"
          />
          <SelectComponent
            options={courseOptions}
            name="course"
            label="Course"
          />
          <Button htmlType="submit">Submit</Button>
        </FormWrapper>
      </Col>
    </Flex>
  );
};

export default MyCourses;
