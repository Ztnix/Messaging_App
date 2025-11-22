import profDefImg from "../../assets/profDef.jpg";
import disImg from "../../assets/dis.png";
import { useAuth } from "../../hooks/useAuth";

export default function OpenChat({ selectedChat }) {
  const selected = selectedChat.users[1];

  const { user } = useAuth();

  const messages = selectedChat.messages;

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

              <div className="text-gray-400 text-[.85rem]">
                {selected.username}
              </div>
            </div>
            <div className="topChatOptions">:</div>
          </div>

          <div className="chatContainer relative overflow-y-auto p-4 gap-6 flex flex-1 flex-col bg-[#005eff14] bg-[radial-gradient(rgba(0,0,255,.3)_1px,transparent_1px)] bg-size-[25px_25px]">
            <>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`chatMsg min-w-[120px] max-w-[600px] flex flex-col w-fit ${
                    msg.author === user ? `ml-auto` : `mr-auto`
                  }`}
                >
                  <div className="chatMsgMain bg-[#1447e6] text-white p-2 rounded-lg flex justify-between">
                    <div className="content">{msg.message}</div>
                    <div className="seen">
                      {msg.seen ? (
                        <div className="text-blue-400">✓✓</div>
                      ) : (
                        <div className="text-gray-400">✓✓</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-auto sticky bottom-4 mb-4 flex w-full bg-white px-4 py-2 rounded-lg shadow-lg">
                <input type="text" className="w-full" />
              </div>
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
