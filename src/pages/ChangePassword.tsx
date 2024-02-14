/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Row } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FormWrapper from "../components/Form/Form";
import InputValue from "../components/Form/Input";
import { useChangePasswordMutation } from "../redux/features/admin/UserManagement/userManagementApi";
import { logout } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";
import { TResponse } from "../types";

const ChangePassword = () => {
  const [changePassword] = useChangePasswordMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const res = (await changePassword(data)) as TResponse<any>;
    if (res?.data?.success) {
      dispatch(logout());
      navigate("/login");
    }
  };

  return (
    <Row className="flex items-center justify-center h-screen bg-gray-50">
      <Col span={8}>
        <FormWrapper onSubmit={onSubmit}>
          <div className="bg-gray-200 px-6 py-16 rounded-xl">
            <h4 className="text-xl font-family-lato font-extrabold text-center">
              Change Password
            </h4>
            <div className="mt-4">
              <InputValue
                label="Old Password"
                type="password"
                name="oldPassword"
                placeholder="Enter Old Password"
              />
              <InputValue
                type="password"
                name="newPassword"
                placeholder="Enter New Password"
                label="New Password"
              />

              <div className="mt-10">
                <button
                  type="submit"
                  className="w-full px-4 py-3 bg-[#10B981] rounded-lg font-family-lato text-white font-semibold"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </FormWrapper>
      </Col>
    </Row>
  );
};

export default ChangePassword;
