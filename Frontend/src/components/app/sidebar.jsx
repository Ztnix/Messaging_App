import disImg from "../../assets/dis.png";
import profDefImg from "../../assets/profDef.jpg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Sidebar() {
  const { setUser, user } = useAuth();
  const nav = useNavigate();
  async function handleLogout() {
    try {
      const res = await fetch("http://localhost:3000/logout", {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        setUser(null);
        nav("/");
      } else {
        console.error("Logout failed", await res.text());
      }
    } catch (err) {
      console.error("Network error", err);
    }
  }

  return (
    <div className="sidebar flex flex-col divide-y w-[90px] bg-black text-white">
      <img
        className="homeBtn p-5 w-full aspect-square flex justify-center items-center"
        src={disImg}
      ></img>
      <div className="shortcuts flex flex-col flex-1 gap-2 py-8">
        <div className="messages flex justify-center items-center h-14 hover:cursor-pointer text-gray-400 hover:text-white hover:scale-110 transition-transform duration-100">
          Mes
        </div>
        <div className="tba flex justify-center items-center h-14 hover:cursor-pointer text-gray-400 hover:text-white hover:scale-110 transition-transform duration-100">
          TM
        </div>
        <div className="tba flex justify-center items-center h-14 hover:cursor-pointer text-gray-400 hover:text-white hover:scale-110 transition-transform duration-100">
          {user.username}
        </div>
        <button
          className="tba flex justify-center items-center h-14 hover:cursor-pointer text-gray-400 hover:text-white hover:scale-110 transition-transform duration-100"
          onClick={() => handleLogout()}
        >
          Log Out
        </button>
      </div>
      <img
        className="userProfile w-full p-5 aspect-square flex justify-center items-center rounded-full"
        src={profDefImg}
      ></img>
    </div>
  );
}
