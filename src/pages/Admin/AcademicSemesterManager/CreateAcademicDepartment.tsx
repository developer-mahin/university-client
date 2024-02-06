import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Flex, Typography } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { academicDepartmentSchema } from "../../../Schemas/academiManagement.schema";
import FormWrapper from "../../../components/Form/Form";
import SelectComponent from "../../../components/ui/Select";
import { nameOfDepartment } from "../../../constant/academiManagement";
import { useCreateAcademicDepartmentMutation } from "../../../redux/features/admin/academicDepartmentApi";
import {
  errorMessage,
  loadingMessage,
  successMessage,
} from "../../../utils/sonnerToastMessage";
import { TCreateResponse } from "../../../types";

const CreateAcademicDepartment = () => {
  const [createAcademicDepartment] = useCreateAcademicDepartmentMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = loadingMessage("Loading...", 3000);
    const findData = nameOfDepartment.find((item) => item.value === data.name);

    const departmentData = {
      name: findData?.label,
      academicFaculty: findData?.value,
    };
    try {
      const res = (await createAcademicDepartment(
        departmentData
      )) as TCreateResponse;

      if (res.error) {
        errorMessage(res.error.data.message, 3000, toastId);
      } else {
        successMessage(res.data.message, 3000, toastId);
      }
    } catch (error) {
      errorMessage("Something went wrong!!", 2000);
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={8}>
        <Typography className="text-xl font-medium text-gray-800 mb-4">
          Create Academic Department
        </Typography>
        <FormWrapper
          onSubmit={onSubmit}
          resolver={zodResolver(academicDepartmentSchema)}
        >
          <SelectComponent
            byDefault="Select..."
            label="Name Of Department"
            name="name"
            options={nameOfDepartment}
          />
          <Button htmlType="submit">Submit</Button>
        </FormWrapper>
      </Col>
    </Flex>
  );
};

export default CreateAcademicDepartment;
