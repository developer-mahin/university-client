import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Flex, Typography } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { academicFacultySchema } from "../../../Schemas/academiManagement.schema";
import FormWrapper from "../../../components/Form/Form";
import SelectComponent from "../../../components/ui/Select";
import { nameOptions } from "../../../constant/academiManagement";
import { useCreateAcademicFacultyMutation } from "../../../redux/features/admin/academicFacultyApi";
import { TCreateResponse } from "../../../types";
import {
  errorMessage,
  loadingMessage,
  successMessage,
} from "../../../utils/sonnerToastMessage";

const CreateAcademicFaculty = () => {
  const [createAcademicFaculty] = useCreateAcademicFacultyMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = loadingMessage("Loading...", 2000);
    const academicFacultyData = {
      name: data.name,
    };

    try {
      const res = (await createAcademicFaculty(
        academicFacultyData
      )) as TCreateResponse;

      if (res.error) {
        errorMessage(res.error.data.message, 2000, toastId);
      } else {
        successMessage(res?.data?.message, 3000, toastId);
      }
    } catch (error) {
      errorMessage("Something Went wrong!!", 2000, toastId);
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={8}>
        <Typography className="text-xl font-medium text-gray-800 mb-4">
          Create Academic Faculty
        </Typography>
        <FormWrapper
          onSubmit={onSubmit}
          resolver={zodResolver(academicFacultySchema)}
        >
          <SelectComponent
            byDefault="Select..."
            label="Name Of Faculty"
            name="name"
            options={nameOptions}
          />
          <Button htmlType="submit">Submit</Button>
        </FormWrapper>
      </Col>
    </Flex>
  );
};

export default CreateAcademicFaculty;
