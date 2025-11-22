import profDefImg from "../../assets/profDef.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
/* eslint-disable no-unused-vars */

export default function NewChat({ targetUser }) {
  const [form, setForm] = useState({
    initialMessage: "",
  });
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  function onChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setMsg(null);

    try {
      const payload = { form, targetUser };
      const res = await fetch("http://localhost:3000/newChat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const body = await res.json();

      if (!res.ok) {
        setMsg(body.errors || "Blog Creation failed");
        return;
      }

      navigate(body.redirect || "/home");
    } catch (err) {
      console.log(err);
      setMsg("Network error");
    }
  }

  return (
    <div className="openChat flex flex-col w-[70%] h-screen">
      <div className="topChatContainer flex flex-none max-h-[8%] py-3 border-b border-gray-400">
        <div className="h-full flex justify-center items-center px-4">
          <img
            className="userProfile w-10 aspect-square flex justify-center items-center rounded-full"
            src={profDefImg}
          />
        </div>
        <div className="topChatContent flex flex-1 flex-col justify-center">
          <div className="text-gray-400 text-[.85rem]">
            {targetUser.username}
          </div>
        </div>
        <div className="topChatOptions">:</div>
      </div>

      <div className="chatContainer relative overflow-y-auto p-4 gap-6 flex flex-1 flex-col bg-[#005eff14] bg-[radial-gradient(rgba(0,0,255,.3)_1px,transparent_1px)] bg-size-[25px_25px]">
        <form
          onSubmit={onSubmit}
          className="mt-auto sticky bottom-4 mb-4 flex w-full bg-white px-4 py-2 rounded-lg shadow-lg"
        >
          <input
            type="text"
            className="w-full"
            name="initialMessage"
            value={form.initialMessage}
            onChange={onChange}
          />
        </form>
      </div>
    </div>
  );
}
