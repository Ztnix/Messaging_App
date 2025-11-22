import profDefImg from "../../assets/profDef.jpg";
import ContainerLoadingSpinner from "../../components/ui/containerLoadingSpinner";
import { useAuth } from "../../hooks/useAuth";

export default function AllUsersTab({
  setOpenTab,
  handleUserPick,
  loading,
  users,
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
                onClick={() => handleUserPick(u)}
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
