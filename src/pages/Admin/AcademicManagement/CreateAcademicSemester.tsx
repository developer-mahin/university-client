import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Flex, Typography } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { academicSemesterSchema } from "../../../Schemas/academiManagement.schema";
import FormWrapper from "../../../components/Form/Form";
import SelectComponent from "../../../components/Form/Select";
import { monthsOption } from "../../../constant/gblobal";
import { nameOptions, years } from "../../../constant/semester";
import { useCreateAcademicSemesterMutation } from "../../../redux/features/admin/AcademicManagement/academicSemesterApi";
import { TCreateResponse } from "../../../types/global.types";
import {
  errorMessage,
  loadingMessage,
  successMessage,
} from "../../../utils/sonnerToastMessage";

const CreateAcademicSemester = () => {
  const [createAcademicSemester] = useCreateAcademicSemesterMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = loadingMessage("Creating....", 2000);

    const name = nameOptions[Number(data?.code) - 1]?.label;

    const semesterData = {
      code: data.code,
      name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };

    try {
      const res = (await createAcademicSemester(
        semesterData
      )) as TCreateResponse;
      if (res.error) {
        errorMessage(res.error.data.message, 2000, toastId);
      } else {
        successMessage(res?.data?.message, 3000, toastId);
      }
    } catch (error) {
      errorMessage("Something went wrong!!", 3000, toastId);
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={8}>
        <Typography className="text-xl font-medium text-gray-800 mb-4">
          Create Academic Semester
        </Typography>
        <FormWrapper
          onSubmit={onSubmit}
          resolver={zodResolver(academicSemesterSchema)}
        >
          <SelectComponent
            byDefault="Select..."
            options={nameOptions}
            name="code"
            label="Name"
          />
          <SelectComponent
            byDefault="Select..."
            options={years}
            name="year"
            label="Year"
          />
          <SelectComponent
            options={monthsOption}
            name="startMonth"
            label="Start Month"
            byDefault="Select..."
          />
          <SelectComponent
            byDefault="Select..."
            options={monthsOption}
            name="endMonth"
            label="End Month"
          />
          <Button htmlType="submit">Submit</Button>
        </FormWrapper>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
