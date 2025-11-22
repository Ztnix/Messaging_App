import profDefImg from "../../assets/profDef.jpg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ContainerLoadingSpinner from "../../components/ui/containerLoadingSpinner";
import { useAuth } from "../../hooks/useAuth";
/* eslint-disable no-unused-vars */

export default function AllUsersTab({ setOpenTab }) {
  const { user } = useAuth();
  const [msg, setMsg] = useState(null);
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  async function loadUsers() {
    setMsg(null);
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/getUsers`);
      const data = await res.json();
      if (!res.ok) {
        setUsers(null);
        setLoading(false);
        setMsg(data?.errors || data?.error || "Could not fetch users");
        return;
      }
      setUsers(data.users);
    } catch (e) {
      console.log(e);
      setUsers(null);
      setMsg("Network error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  if (loading)
    return (
      <div className="filler w-[30%] h-screen">
        <ContainerLoadingSpinner></ContainerLoadingSpinner>
      </div>
    );

  return (
    <div className="userChats flex flex-col w-[30%] border-gray-400  border-r h-screen">
      <h2
        className=" text-lg px-4 py-3 border-gray-400 border-b h-[8%] flex  items-center hover:cursor-pointer"
        onClick={() => setOpenTab("Messages")}
      >
        {"<-"} All Users
      </h2>
      <div className="userChatsContainer flex flex-col flex-1 overflow-y-auto ">
        {users.map(
          (u, i) =>
            u.username !== user.username && (
              <div
                key={i}
                className="userChat w-full flex  p-4  border-b gap-3 max-w-full"
              >
                <img
                  className="userProfile w-12 aspect-square flex justify-center items-center rounded-full"
                  src={profDefImg}
                ></img>

                <div className="self-center tracking-wide"> {u.username}</div>
              </div>
            )
        )}
      </div>
    </div>
  );
}
