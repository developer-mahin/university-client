import { useGetAllAcademicSemesterQuery } from "../../../redux/features/academicSemester/academicSemester";

const AcademicSemester = () => {
  const { data } = useGetAllAcademicSemesterQuery(undefined);
  console.log(data);

  return (
    <div>
      <h2>Welcome to the AcademicSemester page</h2>
    </div>
  );
};

export default AcademicSemester;
