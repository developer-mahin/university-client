import { Table, TableColumnsType, TableProps } from "antd";
import { useGetAllAcademicFacultiesQuery } from "../../../redux/features/admin/academicFacultyApi";
import { TAcademicFaculty } from "../../../types/academiManagement.types";

type TTableData = Pick<TAcademicFaculty, "name">;

const AcademicFaculty = () => {
  const { data: academicFaculties, isFetching } =
    useGetAllAcademicFacultiesQuery(undefined);

  const tableData = academicFaculties?.data?.map(({ name, _id }) => ({
    key: _id,
    name,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
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

export default AcademicFaculty;
