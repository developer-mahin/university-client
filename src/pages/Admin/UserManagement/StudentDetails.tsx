import { DownloadOutlined } from "@ant-design/icons";
import { Button, Col, Row, Typography } from "antd";
import { useParams } from "react-router-dom";
import Spinner from "../../../components/Shared/Spinner";
import { useGetStudentDetailsQuery } from "../../../redux/features/admin/UserManagement/userManagementApi";

const profileButtons = [
  {
    icon: <DownloadOutlined />,
    name: "Address",
  },
  {
    icon: <DownloadOutlined />,
    name: "Address",
  },
  {
    icon: <DownloadOutlined />,
    name: "Address",
  },
  {
    icon: <DownloadOutlined />,
    name: "Address",
  },
  {
    icon: <DownloadOutlined />,
    name: "Address",
  },
  {
    icon: <DownloadOutlined />,
    name: "Address",
  },
];

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
    <Row gutter={20}>
      <Col span={6}>
        <div className="bg-[#00000017] p-4 rounded-xl flex items-center justify-center flex-col">
          <div className="bg-gradient-to-r from-[#00FFB2] to-[#006AFF] size-[144px] flex items-center justify-center rounded-full">
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

          <div className="mt-6 border-dotted border-gray-400 border-t-2 border-spacing-1 w-full">
            <div className="flex items-center justify-center flex-col gap-y-3">
              {profileButtons.map((item) => (
                <Button
                  icon={item.icon}
                  size="large"
                  className="w-full border-none hover:bg-gray-300 "
                >
                  {item.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Col>
      <Col span={18} className="bg-[#00000016] p-4 rounded-xl">
        <div className="flex flex-col items-center justify-center h-full space-y-5">
          <img
            src="https://web.programming-hero.com/static/media/discover.ffff2d99.png"
            alt=""
            className=""
          />
          <h2 className="bg-gradient-to-r from-[#006AFF] to-[#00FFB2] bg-clip-text text-transparent text-3xl font-bold font-serif text-center capitalize">
            Discover new possibilities through <br /> additional educational and
            job-related <br /> information!
          </h2>
          <p className="text-xl text-center  capitalize font-medium text-gray-600 ">
            DOM manipulation is when you use JavaScript to add, <br />
            remove, and modify elements of a website.
          </p>
        </div>
      </Col>
    </Row>
  );
};

export default StudentDetails;
