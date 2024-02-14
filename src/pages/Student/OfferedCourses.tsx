/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Row } from "antd";
import {
  useEnrolCourseMutation,
  useGetAllOfferedCoursesQuery,
} from "../../redux/features/student/studentApi";
import Spinner from "../../components/Shared/Spinner";

type TCourse = {
  [index: string]: any;
};

const OfferedCourse = () => {
  const { data: offeredCourseData, isLoading } =
    useGetAllOfferedCoursesQuery(undefined);
  const [enroll] = useEnrolCourseMutation();

  if (isLoading) {
    return <Spinner size="large" />;
  }

  const singleObject = offeredCourseData?.data?.reduce((acc: TCourse, item) => {
    const key = item.course.title;
    acc[key] = acc[key] || { courseTitle: key, sections: [] };
    acc[key].sections.push({
      section: item.section,
      _id: item._id,
      days: item.days,
      startTime: item.startTime,
      endTime: item.endTime,
    });
    return acc;
  }, {});

  const modifiedData = Object.values(singleObject ? singleObject : {});

  const handleEnroll = async (id: string) => {
    const enrollData = {
      offeredCourse: id,
    };

    const res = await enroll(enrollData);
    console.log(res);
  };

  if (!modifiedData.length) {
    return <p>No available courses</p>;
  }

  return (
    <Row gutter={[0, 20]}>
      {modifiedData.map((item, index) => {
        return (
          <Col span={24} style={{ border: "solid #d4d4d4 2px" }} key={index}>
            <div style={{ padding: "10px" }}>
              <h2>{item.courseTitle}</h2>
            </div>
            <div>
              {item.sections.map((section: any, index: number) => {
                return (
                  <Row
                    key={index}
                    justify="space-between"
                    align="middle"
                    style={{ borderTop: "solid #d4d4d4 2px", padding: "10px" }}
                  >
                    <Col span={5}>Section: {section.section} </Col>
                    <Col span={5}>
                      days:{" "}
                      {section.days.map((day: string, index: number) => (
                        <span key={index}> {day} </span>
                      ))}
                    </Col>
                    <Col span={5}>Start Time: {section.startTime} </Col>
                    <Col span={5}>End Time: {section.endTime} </Col>
                    <Button onClick={() => handleEnroll(section._id)}>
                      Enroll
                    </Button>
                  </Row>
                );
              })}
            </div>
          </Col>
        );
      })}
    </Row>
  );
};

export default OfferedCourse;
