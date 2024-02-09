import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import FormWrapper from "../../../components/Form/Form";
import InputValue from "../../../components/Form/Input";
import SelectComponent from "../../../components/Form/Select";
import {
  useAddCourseMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/CourseManagement/CourseManagementApi";
import { TResponse } from "../../../types";
import { TCourse } from "../../../types/CourseManagement";
import {
  errorMessage,
  loadingMessage,
  successMessage,
} from "../../../utils/sonnerToastMessage";

const CreateCourse = () => {
  const [createCourse] = useAddCourseMutation();
  const { data: courses, isFetching } = useGetAllCoursesQuery(undefined);

  const preRequisiteCoursesOptions = courses?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = loadingMessage("Creating...");

    const courseData = {
      ...data,
      code: Number(data.code),
      credit: Number(data.credit),
      isDeleted: false,
      preRequisiteCourses: data.preRequisiteCourses
        ? data.preRequisiteCourses?.map((item: string) => ({
            course: item,
            isDeleted: false,
          }))
        : [],
    };

    try {
      const res = (await createCourse(courseData)) as TResponse<TCourse>;

      if (res.error) {
        errorMessage(res.error.data.message, 3000, toastId);
      } else {
        successMessage("Course Created Successful", 3000, toastId);
      }
    } catch (err) {
      errorMessage("Something went wrong", 3000);
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <FormWrapper onSubmit={onSubmit}>
          <InputValue
            placeholder="Enter Title"
            type="text"
            name="title"
            label="Title"
          />
          <InputValue
            placeholder="Enter Prefix"
            type="text"
            name="prefix"
            label="Prefix"
          />
          <InputValue
            placeholder="Enter Code"
            type="text"
            name="code"
            label="Code"
          />
          <InputValue
            placeholder="Enter Credits"
            type="text"
            name="credit"
            label="Credits"
          />
          <SelectComponent
            mode="multiple"
            options={preRequisiteCoursesOptions}
            name="preRequisiteCourses"
            label="Pre Requisite Courses"
            disabled={isFetching}
          />
          <Button htmlType="submit">Submit</Button>
        </FormWrapper>
      </Col>
    </Flex>
  );
};

export default CreateCourse;
