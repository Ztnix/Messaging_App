import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <div
      className={`flex justify-center  px-12 bg-[#162942] text-white border-b border-gray-600`}
    >
      <div className="w-3/4 flex justify-between text-[1.2rem]">
        <div className="headerLogo flex items-center">Your Messaging app!</div>
        <div className="flex items-center">
          <button className="headerOption" onClick={() => navigate("/")}>
            Homepage
          </button>
        </div>
      </div>
    </div>
  );
}
