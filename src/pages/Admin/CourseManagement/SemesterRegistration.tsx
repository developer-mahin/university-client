import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import CDatePicker from "../../../components/Form/DatePicker";
import FormWrapper from "../../../components/Form/Form";
import InputValue from "../../../components/Form/Input";
import SelectComponent from "../../../components/Form/Select";
import { semesterStatusOptions } from "../../../constant/semester";
import { useGetAllAcademicSemesterQuery } from "../../../redux/features/admin/AcademicManagement/academicSemesterApi";
import { useAddRegisteredSemesterMutation } from "../../../redux/features/admin/CourseManagement/CourseManagementApi";
import { TCreateResponse } from "../../../types";

const SemesterRegistration = () => {
  const [addSemester] = useAddRegisteredSemesterMutation();
  const { data: academicSemester, isLoading } = useGetAllAcademicSemesterQuery([
    { name: "sort", value: "year" },
  ]);

  const academicSemesterOptions = academicSemester?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const semesterData = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    };

    console.log(semesterData);

    try {
      const res = (await addSemester(semesterData)) as TCreateResponse;

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Semester created", { id: toastId });
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
            label="Academic Semester"
            name="academicSemester"
            byDefault="Select..."
            disabled={isLoading}
            options={academicSemesterOptions}
          />

          <SelectComponent
            name="status"
            label="Status"
            byDefault="Select..."
            options={semesterStatusOptions}
          />
          <CDatePicker name="startDate" label="Start Date" />
          <CDatePicker name="endDate" label="End Date" />
          <InputValue
            placeholder="Enter Min Credit"
            type="text"
            name="minCredit"
            label="Min Credit"
          />
          <InputValue
            placeholder="Enter Max Credit"
            type="text"
            name="maxCredit"
            label="Max Credit"
          />

          <Button htmlType="submit">Submit</Button>
        </FormWrapper>
      </Col>
    </Flex>
  );
};

export default SemesterRegistration;
