import profDefImg from "../../assets/profDef.jpg";
import ContainerLoadingSpinner from "../../components/ui/containerLoadingSpinner";
import { useAuth } from "../../hooks/useAuth";

export default function UserChats({
  setOpenTab,
  setSelectedChat,
  loading,
  chats,
}) {
  const { user } = useAuth();

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
        onClick={() => setOpenTab("Users")}
      >
        {"<-"} User Chats
      </h2>
      <div className="userChatsContainer flex flex-col flex-1 overflow-y-auto ">
        {!chats || chats.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No chats to show</div>
        ) : (
          chats.map((chat, i) => (
            <div
              key={i}
              className="userChat w-full flex  px-4 py-6 border-b gap-3 max-w-full"
              onClick={() => setSelectedChat(chat)}
            >
              <img
                className="userProfile w-12 aspect-square flex justify-center items-center rounded-full"
                src={profDefImg}
              />
              <div className="userChatContent flex flex-1 flex-col justify-center">
                <div className="userChatTop flex w-full justify-between ">
                  <div className="font-bold">
                    {" "}
                    {chat.users.find((u) => u.id !== user.id).username}
                  </div>
                  {/* <div> {chat.date}</div> */}
                </div>
                {chat.messages.length > 0 && (
                  <div className="userChatBottom flex w-full justify-between">
                    <div className="text-gray-400 truncate w-70">
                      {chat.messages[0].content}
                    </div>
                    <div>
                      {chat.messages[0].read ? (
                        <div className="text-green-400">✓✓</div>
                      ) : (
                        <div className="text-gray-400">✓✓</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
