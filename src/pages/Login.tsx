/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { FieldValues } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import facebook from "../assets/icons/facebook.png";
import google from "../assets/icons/google.png";
import twitter from "../assets/icons/twitter.png";
import logo from "../assets/images/Standards GPT 1.png";
import FormWrapper from "../components/Form/Form";
import InputValue from "../components/Form/Input";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { TUserDate, setUser } from "../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { decodedToken } from "../utils/jwtDecoded";
import {
  errorMessage,
  loadingMessage,
  successMessage,
} from "../utils/sonnerToastMessage";

const Login = () => {
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const { user, token } = useAppSelector((state) => state.auth) as {
    user: { role: string };
    token: string;
  };

  const defaultValues = {
    id: "2025030001",
    password: "123456234",
  };

  // new: 123456234

  const onSubmit = async (data: FieldValues) => {
    loadingMessage("Logging in...", 2000);
    try {
      const userInfo = {
        id: data.id,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();

      const user = decodedToken(res.data.accessToken);
      dispatch(setUser({ user, token: res.data.accessToken }));

      if (res.data.needsPasswordChange) {
        navigate(`/change-password`);
      } else {
        navigate(`/${(user as TUserDate)?.role}/dashboard`);
      }

      successMessage("Logged in successful", 4000);
    } catch (error: any) {
      errorMessage(error.message, 2000);
    }
  };

  // useEffect(() => {
  //   if (token) {
  //     return navigate(`/${user?.role}/dashboard`);
  //   }
  // }, [token, user, navigate]);

  return (
    <div className="bg-[#E9EEF1] h-screen flex justify-center items-center py-[150px]">
      <div className="w-[500px] mx-auto px-3">
        <div className="flex justify-center items-center">
          <img src={logo} alt="" />
          <p className="text-[#514D53] text-3xl font-extrabold font-family-lato">
            UNIVER <br /> <span className="text-[#10B981]">SITY</span>
          </p>
        </div>
        <div className="p-10  bg-white rounded-[10px] mt-10">
          <FormWrapper onSubmit={onSubmit} defaultValues={defaultValues}>
            <h4 className="text-xl font-family-lato font-extrabold text-center">
              Login
            </h4>
            <div className="mt-10">
              <InputValue
                label="ID"
                type="text"
                name="id"
                placeholder="Enter ID"
              />
              <InputValue
                type="password"
                name="password"
                placeholder="Password"
                label="Password"
              />

              <div className="mt-10">
                <button
                  type="submit"
                  className="w-full px-4 py-3 bg-[#10B981] rounded-lg font-family-lato text-white font-semibold"
                >
                  Login
                </button>
              </div>
            </div>
          </FormWrapper>

          <div>
            <p className="text-center py-5 text-gray-600">Forgot Password?</p>
            <div>
              <div className="pt-[10px]">
                <button className="flex items-center justify-center gap-4 border py-3 px-5 w-full rounded-lg">
                  <img src={google} alt="" />
                  <span className="font-family-lato text-gray-600 font-semibold text-[14px]">
                    Sign in with Google
                  </span>
                </button>
              </div>
              <div className="pt-[10px]">
                <button className="flex items-center justify-center gap-4 border py-3 px-5 w-full rounded-lg">
                  <img src={twitter} alt="" />
                  <span className="font-family-lato text-gray-600 font-semibold text-[14px]">
                    Sign in with Twitter
                  </span>
                </button>
              </div>
              <div className="pt-[10px]">
                <button className="flex items-center justify-center gap-4 border py-3 px-5 w-full rounded-lg">
                  <img src={facebook} alt="" />
                  <span className="font-family-lato text-gray-600 font-semibold text-[14px]">
                    Sign in with Facebook
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <p className="text-center text-gray-600">
              By clicking continue, you agree to our{" "}
              <Link to="/" className="text-[#10B981]">
                Terms of Service
              </Link>{" "}
              and &nbsp;
              <Link to="/" className="text-[#10B981]">
                Privacy Policy.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
