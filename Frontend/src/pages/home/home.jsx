import Sidebar from "../../components/app/sidebar";
import UserChats from "../userChats/userChats";
import OpenChat from "../openChat/openChat";
import AllUsersTab from "../allUsersTab/allUsersTab";
import { useState } from "react";

export default function HomeScreen() {
  const [openTab, setOpenTab] = useState("Messages");
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="mainContainer flex flex-1">
      <Sidebar></Sidebar>
      <div className="content  flex flex-1">
        {openTab === "Messages" ? (
          <UserChats
            setOpenTab={setOpenTab}
            setSelectedChat={setSelectedChat}
          ></UserChats>
        ) : (
          <AllUsersTab setOpenTab={setOpenTab}></AllUsersTab>
        )}

        <OpenChat selectedChat={selectedChat}></OpenChat>
      </div>
    </div>
  );
}
