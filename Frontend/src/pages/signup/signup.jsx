import phLogin from "../../assets/phLogin.jpg";
import SignUpForm from "./signupForm";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="bg-[#ffffff] flex-1 flex border-b border-gray-600 justify-center text-black">
      <div className="mainContainer flex flex-1">
        <div className="leftSide w-[40%] flex flex-col px-28 justify-center gap-4">
          <h1 className="text-5xl font-bold">Sign up</h1>
          <p className="text-[1.125rem] tracking-wide">
            ¿Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-500 hover:text-blue-300 transition-colors duration-200 font-bold"
            >
              Login
            </Link>
          </p>
          <SignUpForm></SignUpForm>
        </div>
        <div className="rightSide w-[60%]">
          <div className="imgContainer  h-full p-12 bg-[#c3c3c3]">
            <img className="h-full rounded-xl" src={phLogin} />
          </div>
        </div>
      </div>
    </div>
  );
}
