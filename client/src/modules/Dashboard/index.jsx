import React, { useEffect, useMemo, useState } from "react";
import Avatar from "../../assets/avatar.jpg";
import Input from "../../components/Input";
import { io } from "socket.io-client";

const Dashboard = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user:detail"))
  );

  const [conversation, setConversation] = useState([]);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState({});
  const [message, setMessage] = useState("");

  const [socket, setSocket] = useState(null);
  console.log(messages);
  useEffect(() => {
    setSocket(io("http://localhost:8000"));
  }, []);

  useEffect(() => {
    socket?.emit("addUser", user?.id);
    socket?.on("getUsers", (users) => {
      console.log("active users ", users);
    });
    socket?.on("getMessage", (data) => {
      console.log(data);
      setMessages((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          {
            user:data.user,
            message: data.message,
          },
        ],
      }));
    });
  }, [socket]);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user:detail"));

    const fetchConversation = async () => {
      const res = await fetch(
        `http://localhost:8000/api/conversation/${loggedInUser?.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const resData = await res.json();

      setConversation(resData);
    };

    fetchConversation();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`http://localhost:8000/auth/users/${user?.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resData = await res.json();
      setUsers(resData);
    };

    fetchUsers();
  }, []);

  const fetchMessages = async (conversationId, receiver) => {
    const res = await fetch(
      `http://localhost:8000/api/message/${conversationId}?senderId=${user?.id}&&receiverId=${receiver?.receiverId}`,
      {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const resData = await res.json();

    setMessages({ conversationId, messages: resData, receiver });
  };

  const sendMessage = async (e) => {
    socket?.emit("sendMessage", {
      senderId: user?.id,
      receiverId: messages?.receiver?.receiverId,
      message,
      conversationId: messages?.conversationId,
    });
    const res = await fetch(`http://localhost:8000/api/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        conversationId: messages?.conversationId,
        senderId: user?.id,
        message,
        receiverId: messages?.receiver?.receiverId,
      }),
    });
    const resData = await res.json();

    setMessage("");
  };
  return (
    <div className="w-screen flex">
      <div className="w-[25%]  h-screen bg-[#f9f8fa]">
        <div className="flex mx-14 items-center my-8">
          <div className=" border border-primary  rounded-full p-[2px]">
            <img src={Avatar} className="rounded-full" width={75} height={75} />
          </div>

          <div className="ml-8">
            <h3 className=" text-2xl">{user.fullName}</h3>
            <p className="text-lg font-light">{user.email}</p>
          </div>
        </div>
        <hr />

        <div className="mx-14 mt-10">
          <div className=" text-primary text-lg">Messages</div>
          <div>
            {conversation.length > 0 ? (
              conversation.map(({ conversationId, user }) => {
                return (
                  <div
                    className="flex items-center py-8 border-b border-b-gray-300 "
                    key={conversationId}
                  >
                    <div
                      className="cursor-pointer flex items-center"
                      onClick={() => fetchMessages(conversationId, user)}
                    >
                      <div>
                        <img
                          src={Avatar}
                          className="rounded-full"
                          width={60}
                          height={60}
                        />
                      </div>

                      <div className="ml-6">
                        <h3 className=" text-lg font-semibold">
                          {user?.fullName}
                        </h3>
                        <p className="text-sm font-light text-gray-600">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center text-lg font-semibold mt-24">
                No conversation
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-[50%]  h-screen bg-white flex flex-col items-center">
        {messages?.receiver?.fullName && (
          <div className="w-[75%] bg-[#f9f8fa] h-[80px] my-14 rounded-full flex items-center px-14 py-2 ">
            <div className="cursor-pointer">
              <img
                src={Avatar}
                className="rounded-full"
                width={75}
                height={75}
              />
            </div>

            <div className=" ml-6 mr-auto">
              <h3 className=" text-lg font-bold ">
                {messages?.receiver?.fullName}
              </h3>

              <p className="text-sm font-light text-gray-600">
                {messages?.receiver?.email}
              </p>
            </div>

            <div className="cursor-pointer ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-phone-outgoing"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                <path d="M15 9l5 -5" />
                <path d="M16 4l4 0l0 4" />
              </svg>
            </div>
          </div>
        )}

        <div className=" h-[75%] shadow-sm w-full overflow-y-scroll message ">
          <div className="p-14">
            {messages?.messages?.length > 0 ? (
              messages.messages.map(({ message, user: { id } = {} }) => {
                return (
                  <div
                    key={user.id}
                    className={`  max-w-[40%]  p-4 mb-6  rounded-b-xl ${
                      id === user?.id
                        ? "text-white bg-primary rounded-tl-xl ml-auto"
                        : " text-black bg-[#f9f8fa] rounded-tr-xl p-4 "
                    }`}
                  >
                    {message}
                  </div>
                );
              })
            ) : (
              <div className="text-center text-lg font-semibold mt-24">
                No message or No Conversation Selected
              </div>
            )}
          </div>
        </div>
        {messages?.receiver?.fullName && (
          <div className=" p-14 w-full flex items-center  ">
            <Input
              className="w-[75%]"
              placeholder="Type a message..."
              inputclassName="p-4 border-0 shadow-md rounded-full bg-light foucs:ring-0 focus:border-0 outline-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <div
              className={`ml-4 p-2 cursor-pointer bg-light rounded-full ${
                !message && "pointer-events-none"
              }`}
              onClick={() => sendMessage()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-send"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10 14l11 -11" />
                <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
              </svg>
            </div>

            <div
              className={`ml-4 p-2 cursor-pointer bg-light rounded-full ${
                !message && "pointer-events-none"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-circle-plus"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                <path d="M9 12h6" />
                <path d="M12 9v6" />
              </svg>
            </div>
          </div>
        )}
      </div>
      <div className="w-[25%]  h-screen bg-light px-8 py-16">
        <div className="mx-14 mt-10">
          <div className=" text-primary text-lg">People</div>
          <div>
            {users.length > 0 ? (
              users.map(({ userId, user }) => {
                return (
                  <div
                    className="flex items-center py-8 border-b border-b-gray-300 "
                    key={userId}
                  >
                    <div
                      className="cursor-pointer flex items-center"
                      onClick={() => fetchMessages("new", user)}
                    >
                      <div>
                        <img
                          src={Avatar}
                          className="rounded-full"
                          width={60}
                          height={60}
                        />
                      </div>

                      <div className="ml-6">
                        <h3 className=" text-lg font-semibold">
                          {user?.fullName}
                        </h3>
                        <p className="text-sm font-light text-gray-600">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center text-lg font-semibold mt-24">
                No conversation
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
