export default function Notification({ setNotification, notificationDetails }) {
  setTimeout(() => {
    setNotification(false);
  }, 1000);
  return (
    <>
      <div className="notif fixed top-28  ">
        <div
          className={`w-[300px] rounded-lg p-2 text-2xl text-center border-2 border-white ${
            notificationDetails.isFound ? "bg-[#61bc6d]" : "bg-[#d93636]"
          }`}
        >
          {notificationDetails.message}
        </div>
      </div>
    </>
  );
}
