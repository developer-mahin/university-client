import type { TableColumnsType, TableProps } from "antd";
import { Button, Pagination, Select, Space, Table } from "antd";
import { useState } from "react";
import { useGetAllStudentsQuery } from "../../../redux/features/admin/UserManagement/userManagementApi";
import { TStudent } from "../../../types";
import { TQueryParams } from "../../../types/academiManagement.types";
import { Link } from "react-router-dom";

export type TTableData = Pick<
  TStudent,
  "fullName" | "id" | "email" | "contactNo"
>;

const StudentData = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data: studentsData, isFetching } = useGetAllStudentsQuery([
    { name: "limit", value: limit },
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);

  const metaData = studentsData?.meta;

  const tableData = studentsData?.data?.map(
    ({ id, fullName, email, contactNo }) => ({
      key: id,
      id,
      fullName,
      email,
      contactNo,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "fullName",
      key: "name",
    },

    {
      title: "Roll No.",
      key: "id",
      dataIndex: "id",
    },

    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },

    {
      title: "Contact No.",
      key: "contactNo",
      dataIndex: "contactNo",
    },

    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <Space>
            <Link to={`/admin/student-data/${item.id}`}>
              <Button>Details</Button>
            </Link>
            <Button>Update</Button>
            <Button>Block</Button>
          </Space>
        );
      },
      width: "1%",
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParams[] = [];

      filters?.name?.forEach((element) => {
        queryParams.push({ name: "name", value: element });
      });

      filters?.year?.forEach((element) => {
        queryParams.push({ name: "year", value: element });
      });

      setParams(queryParams);
    }
  };
  return (
    <>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
      />
      <div className="flex items-center gap-4 mt-6">
        <Pagination
          onChange={(value) => setPage(value)}
          pageSize={metaData?.limit}
          total={metaData?.total}
        />
        <div>
          <Select onChange={(value) => setLimit(value)}>
            <Select.Option value="3">3</Select.Option>
            <Select.Option value="5">5</Select.Option>
            <Select.Option value="10">10</Select.Option>
            <Select.Option value="20">20</Select.Option>
          </Select>
        </div>
      </div>
    </>
  );
};

export default StudentData;
