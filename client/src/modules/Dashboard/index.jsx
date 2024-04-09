import React from "react";

import Avatar from "../../assets/avatar.jpg";
import Input from "../../components/Input";

const Dashboard = () => {
  const contacts = [
    {
      name: "John",
      status: "Available",
      img: Avatar,
    },
    {
      name: "Harry",
      status: "Available",
      img: Avatar,
    },
    {
      name: "Rohit",
      status: "Available",
      img: Avatar,
    },
    {
      name: "Adam",
      status: "Available",
      img: Avatar,
    },
    {
      name: "Liam",
      status: "Available",
      img: Avatar,
    },
    {
      name: "Chester",
      status: "Available",
      img: Avatar,
    },
  ];
  return (
    <div className="w-screen flex">
      <div className="w-[25%]  h-screen bg-[#f9f8fa]">
        <div className="flex mx-14 items-center my-8">
          <div className=" border border-primary  rounded-full p-[2px]">
            <img src={Avatar} className="rounded-full" width={75} height={75} />
          </div>

          <div className="ml-8">
            <h3 className=" text-2xl">Tutorial Dev</h3>
            <p className="text-lg font-light">My Account</p>
          </div>
        </div>
        <hr />

        <div className="mx-14 mt-10">
          <div className=" text-primary text-lg">Messages</div>
          <div>
            {contacts?.map(({ name, status, img }) => {
              return (
                <div
                  className="flex items-center py-8 border-b border-b-gray-300 "
                  key={name}
                >
                  <div className="cursor-pointer flex items-center">
                    <div>
                      <img
                        src={img}
                        className="rounded-full"
                        width={60}
                        height={60}
                      />
                    </div>

                    <div className="ml-6">
                      <h3 className=" text-lg font-semibold">{name}</h3>
                      <p className="text-sm font-light text-gray-600">
                        {status}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="w-[50%]  h-screen bg-white flex flex-col items-center">
        <div className="w-[75%] bg-[#f9f8fa] h-[80px] my-14 rounded-full flex items-center px-14 ">
          <div className="cursor-pointer">
            <img src={Avatar} className="rounded-full" width={75} height={75} />
          </div>

          <div className=" ml-6 mr-auto">
            <h3 className=" text-lg font-bold ">Chester</h3>

            <p className="text-sm font-light text-gray-600">Online</p>
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

        <div className=" h-[75%] shadow-sm   w-full overflow-y-scroll message ">
          <div className="p-14">
            <div className=" max-w-[40%] bg-[#f9f8fa] rounded-b-xl rounded-tr-xl p-4 mb-6">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Praesentium assumenda voluptates atque dignissimos amet maiores!
            </div>

            <div className=" text-white max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl ml-auto p-4 mb-6">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            </div>

            <div className=" max-w-[40%] bg-[#f9f8fa] rounded-b-xl rounded-tr-xl p-4 mb-6">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Praesentium assumenda voluptates atque dignissimos amet maiores!
            </div>

            <div className=" text-white max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl ml-auto p-4 mb-6">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            </div>

            <div className=" text-white max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl ml-auto p-4 mb-6">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            </div>

            <div className=" max-w-[40%] bg-[#f9f8fa] rounded-b-xl rounded-tr-xl p-4 mb-6">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Praesentium assumenda voluptates atque dignissimos amet maiores!
            </div>

            <div className=" text-white max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl ml-auto p-4 mb-6">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            </div>
          </div>
        </div>

        <div className=" p-14 w-full flex items-center  ">
          <Input
            className="w-[75%]"
            placeholder="Type a message..."
            inputclassName="p-4 border-0 shadow-md rounded-full bg-light foucs:ring-0 focus:border-0 outline-none"
          />

          <div className="ml-4 p-2 cursor-pointer bg-light rounded-full">
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

          <div  className="ml-4 p-2 cursor-pointer bg-light rounded-full"> 
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
      </div>

      <div className="w-[25%]  h-screen bg-light"></div>
    </div>
  );
};

export default Dashboard;
