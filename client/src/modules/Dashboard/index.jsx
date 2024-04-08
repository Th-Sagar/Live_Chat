import React from "react";

import Avatar from "../../assets/avatar.jpg";

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
      <div className="w-[25%]  h-screen bg-white  ">
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
      <div className="w-[50%]  h-screen "></div>
      <div className="w-[25%]  h-screen "></div>
    </div>
  );
};

export default Dashboard;
