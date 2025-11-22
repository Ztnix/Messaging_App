import Sidebar from "../../components/app/sidebar";
import UserChats from "../userChats/userChats";
import OpenChat from "../openChat/openChat";
import AllUsersTab from "../allUsersTab/allUsersTab";
import NewChat from "../newChat/newChat";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
/* eslint-disable no-unused-vars */

export default function HomeScreen() {
  const [msg, setMsg] = useState(null);
  const [users, setUsers] = useState(null);
  const [chats, setChats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openTab, setOpenTab] = useState("Messages");
  const [selectedChat, setSelectedChat] = useState(null);
  const [createMode, setCreateMode] = useState(null);
  const [targetUser, setTargetUser] = useState(null);
  const { user } = useAuth();

  function handleUserPick(tUser) {
    if (!chats || chats.length === 0) {
      setSelectedChat(null);
      setTargetUser(tUser);
      setCreateMode(true);
      return;
    }

    const chat = chats.find((c) => {
      const ids = c.users.map((u) => u.id);
      return ids.includes(user.id) && ids.includes(tUser.id);
    });

    chat
      ? (setSelectedChat(chat), setCreateMode(false), setTargetUser(null))
      : (setSelectedChat(null), setCreateMode(true), setTargetUser(tUser));
  }

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

  async function loadChats() {
    setMsg(null);
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/getChats`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        setChats(null);
        setLoading(false);
        setMsg(data?.errors || data?.error || "Could not fetch chats");
        return;
      }
      setChats(data.chats);
    } catch (e) {
      console.log(e);
      setChats(null);
      setMsg("Network error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
    loadChats();
  }, []);

  return (
    <div className="mainContainer flex flex-1">
      <Sidebar></Sidebar>
      <div className="content  flex flex-1">
        {openTab === "Messages" ? (
          <UserChats
            setOpenTab={setOpenTab}
            setSelectedChat={setSelectedChat}
            chats={chats}
            loading={loading}
          ></UserChats>
        ) : (
          <AllUsersTab
            setOpenTab={setOpenTab}
            handleUserPick={handleUserPick}
            users={users}
            loading={loading}
          ></AllUsersTab>
        )}

        {createMode ? (
          <NewChat targetUser={targetUser}></NewChat>
        ) : (
          <OpenChat selectedChat={selectedChat}></OpenChat>
        )}
      </div>
    </div>
  );
}
