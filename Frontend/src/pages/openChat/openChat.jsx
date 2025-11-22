import profDefImg from "../../assets/profDef.jpg";
import disImg from "../../assets/dis.png";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
/* eslint-disable no-unused-vars */

export default function OpenChat({ selectedChat, refreshChats }) {
  let selected;
  let messages;

  if (selectedChat) {
    selected = selectedChat.users[1];
    messages = selectedChat.messages;
  }

  const { user } = useAuth();

  const [form, setForm] = useState({
    message: "",
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
      const payload = { form, selectedChat };
      const res = await fetch("http://localhost:3000/newMessage", {
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

      setForm({ message: "" });
      refreshChats();
    } catch (err) {
      console.log(err);
      setMsg("Network error");
    }
  }

  return (
    <div className="openChat flex flex-col w-[70%] h-screen">
      {selectedChat ? (
        <>
          <div className="topChatContainer flex flex-none max-h-[8%] py-3 border-b border-gray-400">
            <div className="h-full flex justify-center items-center px-4">
              <img
                className="userProfile w-10 aspect-square flex justify-center items-center rounded-full"
                src={profDefImg}
              />
            </div>
            <div className="topChatContent flex flex-1 flex-col justify-center">
              <div> {selected.name}</div>

              <div className="text-black tracking-wide font-bold text-[.85rem]">
                {selected.username}
              </div>
            </div>
            <div className="topChatOptions">:</div>
          </div>

          <div className="chatContainer relative overflow-y-auto p-4 gap-6 flex flex-1 flex-col-reverse bg-[#005eff14] bg-[radial-gradient(rgba(0,0,255,.3)_1px,transparent_1px)] bg-size-[25px_25px]">
            <>
              <form
                onSubmit={onSubmit}
                className="mt-auto sticky bottom-4 mb-4 flex w-full bg-white px-4 py-2 rounded-lg shadow-lg"
              >
                <input
                  type="text"
                  className="w-full"
                  name="message"
                  value={form.message}
                  onChange={onChange}
                />
              </form>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`chatMsg min-w-[120px] max-w-[600px] flex flex-col w-fit ${
                    msg.userId === user.id ? `ml-auto` : `mr-auto`
                  }`}
                >
                  <div className="chatMsgMain bg-[#1447e6] text-white p-2 rounded-lg flex justify-between gap-2">
                    <div className="content">{msg.content}</div>
                    <div className="seen">
                      {msg.seen ? (
                        <div className="text-green-400">✓✓</div>
                      ) : (
                        <div className="text-gray-400">✓✓</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </>
          </div>
        </>
      ) : (
        <div className="flex-1 flex justify-center items-center">
          <div className="filler w-[500px] h-[200px] bg-white flex flex-col justify-center items-center gap-4 shadow-lg border-2 border-blue-600">
            <img src={disImg} alt="" className="h-[40%] aspect-square" />
            <p className="text-3xl font-bold">Welcome to fake discord!</p>
          </div>
        </div>
      )}
    </div>
  );
}
