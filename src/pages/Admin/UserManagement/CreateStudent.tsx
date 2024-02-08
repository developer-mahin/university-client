import { Button, Col, Divider, Form, Input, Row } from "antd";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import CDatePicker from "../../../components/Form/DatePicker";
import FormWrapper from "../../../components/Form/Form";
import InputValue from "../../../components/Form/Input";
import SelectComponent from "../../../components/Form/Select";
import { bloodGroupOptions, genderOptions } from "../../../constant/gblobal";
import { useGetAllAcademicDepartmentQuery } from "../../../redux/features/admin/AcademicManagement/academicDepartmentApi";
import { useGetAllAcademicSemesterQuery } from "../../../redux/features/admin/AcademicManagement/academicSemesterApi";
import { useCreateStudentMutation } from "../../../redux/features/admin/UserManagement/userManagementApi";
import { TCreateResponse } from "../../../types";
import {
  errorMessage,
  loadingMessage,
  successMessage,
} from "../../../utils/sonnerToastMessage";

const defaultValue = {
  name: {
    firstName: "John",
    middleName: "Doe",
    lastName: "Smith",
  },
  gender: "male",
  bloodGroup: "A+",

  email: "mahinkhand423@gmail.com",
  contactNo: "1234567890",
  emergencyContactNo: "9876543210",
  presentAddress: "123 Main St, City",
  permanentAddress: "456 Oak St, Town",

  guardian: {
    fatherName: "Robert Doe",
    fatherOccupation: "Engineer",
    fatherContactNo: "1112223333",
    motherName: "Jane Doe",
    motherOccupation: "Teacher",
    motherContactNo: "4445556666",
  },

  localGuardian: {
    name: "Alice Johnson",
    occupation: "Doctor",
    contactNo: "7778889999",
    address: {
      village: "Village A",
      city: "City A",
      home: "Home A",
    },
  },
};

const CreateStudent = () => {
  const { data: sData, isLoading: sIsloading } =
    useGetAllAcademicSemesterQuery(undefined);

  const { data: dData, isLoading: dIsloading } =
    useGetAllAcademicDepartmentQuery(undefined, { skip: sIsloading });

  const [createStudent] = useCreateStudentMutation();

  const academicSemesterOptions = sData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const academicDepartMentOptions = dData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = loadingMessage("Loading...", 5000);

    const studentData = {
      password: "1234562",
      student: data,
    };

    const formData = new FormData();

    formData.append("data", JSON.stringify(studentData));
    formData.append("file", data.image);

    const res = (await createStudent(formData)) as TCreateResponse;
    if (res.error) {
      errorMessage(res.error?.data?.message, 3000, toastId);
    } else {
      successMessage("Successfully Created Student", 3000, toastId);
    }
  };

  return (
    <Row>
      <Col span={24}>
        <FormWrapper onSubmit={onSubmit} defaultValues={defaultValue}>
          <Row gutter={12}>
            <Divider>Personal Info.</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <InputValue
                label="First Name"
                name="name.firstName"
                placeholder="Enter first name"
                type="text"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <InputValue
                label="Middle Name"
                name="name.middleName"
                placeholder="Enter middle name"
                type="text"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <InputValue
                label="Last Name"
                name="name.lastName"
                placeholder="Enter last name"
                type="text"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <SelectComponent
                byDefault="Select..."
                options={genderOptions}
                name="gender"
                label="Gender"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <CDatePicker label="Date Of Birth" name="dateOfBirth" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <SelectComponent
                label="Blood Group"
                name="bloodGroup"
                options={bloodGroupOptions}
                byDefault="Select..."
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="image"
                render={({ field: { value, onChange, ...field } }) => (
                  <Form.Item label="Picture">
                    <Input
                      {...field}
                      name="image"
                      value={value?.fileName}
                      onChange={(e) => onChange(e.target.files?.[0])}
                      type="file"
                    />
                  </Form.Item>
                )}
              />
            </Col>
            <Divider>Contact Info.</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <InputValue
                label="Email"
                name="email"
                placeholder="Enter Email Address"
                type="email"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <InputValue
                label="Contact No"
                name="contactNo"
                placeholder="Enter Contact No"
                type="number"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <InputValue
                label="Emergency Contact No"
                name="emergencyContactNo"
                placeholder="Emergency Contact No"
                type="number"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <InputValue
                label="Present Address"
                name="presentAddress"
                placeholder="Enter Present Address"
                type="text"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <InputValue
                label="Permanent Address"
                name="permanentAddress"
                placeholder="Enter Permanent Address"
                type="text"
              />
            </Col>
            <Divider>Guardian</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <InputValue
                type="text"
                name="guardian.fatherName"
                placeholder="Father's Name"
                label="Father Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <InputValue
                type="text"
                name="guardian.fatherOccupation"
                placeholder="Father Occupation"
                label="Father Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <InputValue
                type="text"
                name="guardian.fatherContactNo"
                placeholder="Father ContactNo"
                label="Father ContactNo"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <InputValue
                type="text"
                name="guardian.motherName"
                label="Mother Name"
                placeholder="Mother's Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <InputValue
                type="text"
                name="guardian.motherOccupation"
                label="Mother Occupation"
                placeholder="Mother Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <InputValue
                type="text"
                name="guardian.motherContactNo"
                label="Mother ContactNo"
                placeholder="Mother ContactNo"
              />
            </Col>
            <Divider>Local Guardian</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <InputValue
                type="text"
                name="localGuardian.name"
                label="Guardian Name"
                placeholder="Guardian name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <InputValue
                type="text"
                name="localGuardian.occupation"
                label="Guardian Occupation"
                placeholder="Guardian occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <InputValue
                type="text"
                name="localGuardian.contactNo"
                label="Guardian ContactNo"
                placeholder="Guardian contactNo"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <InputValue
                type="text"
                name="localGuardian.address.village"
                label="Village"
                placeholder="village"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <InputValue
                type="text"
                name="localGuardian.address.city"
                label="City"
                placeholder="City"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <InputValue
                type="text"
                name="localGuardian.address.home"
                label="Home"
                placeholder="Home"
              />
            </Col>
            <Divider>Academic Info.</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <SelectComponent
                name="admissionSemester"
                label="Academic Semester"
                disabled={sIsloading}
                options={academicSemesterOptions}
                byDefault="Select..."
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <SelectComponent
                name="academicDepartment"
                label="Academic Department"
                byDefault="Select..."
                disabled={dIsloading}
                options={academicDepartMentOptions}
              />
            </Col>
          </Row>
          <Button htmlType="submit">Submit</Button>
        </FormWrapper>
      </Col>
    </Row>
  );
};

export default CreateStudent;
