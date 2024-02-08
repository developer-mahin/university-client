import { Table, TableColumnsType, TableProps } from "antd";
import { useGetAllAcademicDepartmentQuery } from "../../../redux/features/admin/AcademicManagement/academicDepartmentApi";

type TTableData = {
  academicFacultyName: string;
  name: string;
};

const AcademicDepartment = () => {
  const { data: academicDepartments, isFetching } =
    useGetAllAcademicDepartmentQuery(undefined);

  const tableData = academicDepartments?.data?.map(
    ({ _id, academicFaculty, name }) => ({
      key: _id,
      academicFacultyName: academicFaculty.name,
      name,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Academic Faculty",
      dataIndex: "academicFacultyName",
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <Table
      columns={columns}
      loading={isFetching}
      dataSource={tableData}
      onChange={onChange}
    />
  );
};

export default AcademicDepartment;
