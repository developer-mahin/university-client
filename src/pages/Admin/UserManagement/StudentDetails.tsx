import { useParams } from "react-router-dom";
import { useGetStudentDetailsQuery } from "../../../redux/features/admin/UserManagement/userManagementApi";
import Spinner from "../../../components/Shared/Spinner";
import { Col, Row, Typography } from "antd";

const StudentDetails = () => {
  const { studentId } = useParams();

  const { data: studentDetails, isLoading } =
    useGetStudentDetailsQuery(studentId);

  if (isLoading) {
    return <Spinner size="large" />;
  }

  const {
    id,
    email,
    contactNo,
    emergencyContactNo,
    fullName,
    bloodGroup,
    dateOfBirth,
    gender,
    guardian,
    localGuardian,
    address,
    name,
    permanentAddress,
    presentAddress,
    user,
    profileImage,
  } = studentDetails?.data || {};

  return (
    <Row>
      <Col
        span={6}
        className="bg-[#00000017] p-4 rounded-xl flex items-center justify-center flex-col"
      >
        <div className="bg-gradient-to-r from-[#00FFB2] to-[#006AFF] size-[140px] flex items-center justify-center rounded-full">
          <img
            src={profileImage}
            className="size-32 object-cover rounded-full"
            alt=""
          />
        </div>
        <div>
          <Typography className="text-lg text-center font-bold text-gray-700">
            {fullName}
          </Typography>
          <Typography className="text-lg text-center font-medium text-gray-700">
            {id}
          </Typography>
          <Typography className="text-lg text-center font-medium text-gray-700">
            {email}
          </Typography>
          <Typography className="text-lg text-center font-medium text-gray-700">
            {contactNo}
          </Typography>
        </div>
      </Col>
      <Col
        span={24}
        className="bg-[#00000010] p-4 rounded-xl flex items-center justify-center flex-col mt-10"
      ></Col>
    </Row>
  );
};

export default StudentDetails;
