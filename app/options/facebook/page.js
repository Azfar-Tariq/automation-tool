"use client";

import React, { useState } from "react";
import { Tabs, TabsHeader, Tab } from "@material-tailwind/react";
import Image from "next/image";
import Logo from "../../assets/facebook.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Facebook() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [groupId, setGroupId] = useState([]);
  const [publish, setPublish] = useState("");
  const [comment, setComment] = useState("");
  const [privateMessage, setPrivateMessage] = useState("");
  const [limit, setLimit] = useState("");
  const [activeTab, setActiveTab] = useState("publish");
  const data = [
    {
      label: "Publish",
      value: "publish",
    },
    {
      label: "Comment",
      value: "comment",
    },
    {
      label: "Private Messages",
      value: "private-messages",
    },
  ];

  const activeTabData = data.find((tab) => tab.value === activeTab);
  const activeTabLabel = activeTabData ? activeTabData.label : "";

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleGroupIdChange = (event) => {
    const numericRegex = /^[\d,]*$/;
    const newValue = event.target.value;
    if (numericRegex.test(newValue)) {
      const newGroupId = newValue.split(",").map((num) => Number(num.trim()));
      setGroupId(newGroupId);
    }
  };

  const handleChoiceChange = (event) => {
    const { value } = event.target;
    switch (activeTabLabel) {
      case "Publish":
        setPublish(value);
        break;
      case "Comment":
        setComment(value);
        break;
      case "Private Messages":
        setPrivateMessage(value);
        break;
      default:
        break;
    }
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const isButtonDisabled = () => {
    switch (activeTabLabel) {
      case "Publish":
        return !(username && password && groupId.length > 0 && publish);
      case "Comment":
        return !(
          username &&
          password &&
          groupId.length > 0 &&
          comment &&
          limit
        );
      case "Private Messages":
        return !(
          username &&
          password &&
          groupId.length > 0 &&
          privateMessage &&
          limit
        );
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    if (isButtonDisabled()) {
      return;
    }

    let dataToSend = {
      username,
      password,
      groupId,
      [activeTabLabel.toLowerCase()]:
        activeTabLabel === "Publish"
          ? publish
          : activeTabLabel === "Comment"
          ? comment
          : privateMessage,
    };

    if (activeTabLabel === "Comment" || activeTabLabel === "Private Messages") {
      dataToSend = {
        ...dataToSend,
        limit,
      };
    }

    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts", // Replace with your actual API endpoint
        dataToSend,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
        toast.success(
          "Request Recieved. You will be notified through email at the end of the campaign."
        )
      );

      console.log("Data: ", response.data);
    } catch (error) {
      console.error("Error:", error.message);
    }

    setUsername("");
    setPassword("");
    setGroupId([]);
    setPublish("");
    setComment("");
    setPrivateMessage("");
    setLimit("");
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <ToastContainer />
      <Image
        className="rounded-full shadow-xl mb-4 mt-6"
        src={Logo}
        alt="Facebook"
        width={90}
      />
      <Tabs value={activeTab}>
        <TabsHeader
          className="rounded-none border-blue-gray-50 bg-transparent p-0"
          indicatorProps={{
            className:
              "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
          }}
        >
          {data.map(({ label, value }) => (
            <div className="flex" key={label}>
              <Tab
                key={value}
                value={value}
                onClick={() => setActiveTab(value)}
                className={
                  activeTab === value
                    ? "text-black font-medium rounded-lg m-2 p-2 cursor-pointer hover:bg-gray-200 hover:transition hover:duration-300 hover:ease-in-out"
                    : "text-gray-400 rounded-lg m-2 p-2 cursor-pointer hover:bg-gray-200 hover:transition hover:duration-300 hover:ease-in-out"
                }
              >
                {label}
              </Tab>
            </div>
          ))}
        </TabsHeader>
        <label
          htmlFor="username"
          className="block mb-1 mt-2 text-base font-medium text-gray-900"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg w-full mb-3 p-2"
          required
        />
        <label
          htmlFor="password"
          className="block mb-1 text-base font-medium text-gray-900 relative"
        >
          Password
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg w-full mb-3 p-2"
            required={!isButtonDisabled}
          />
          <div
            onClick={handleTogglePassword}
            className="absolute right-2 top-[43px] transform -translate-y-1/2 cursor-pointer"
          >
            {showPassword ? (
              <svg
                onClick={handleTogglePassword}
                className="relative"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 9a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0-4.5c5 0 9.27 3.11 11 7.5c-1.73 4.39-6 7.5-11 7.5S2.73 16.39 1 12c1.73-4.39 6-7.5 11-7.5M3.18 12a9.821 9.821 0 0 0 17.64 0a9.821 9.821 0 0 0-17.64 0"
                />
              </svg>
            ) : (
              <svg
                onClick={handleTogglePassword}
                className="relative"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M2 5.27L3.28 4L20 20.72L18.73 22l-3.08-3.08c-1.15.38-2.37.58-3.65.58c-5 0-9.27-3.11-11-7.5c.69-1.76 1.79-3.31 3.19-4.54zM12 9a3 3 0 0 1 3 3a3 3 0 0 1-.17 1L11 9.17A3 3 0 0 1 12 9m0-4.5c5 0 9.27 3.11 11 7.5a11.79 11.79 0 0 1-4 5.19l-1.42-1.43A9.862 9.862 0 0 0 20.82 12A9.821 9.821 0 0 0 12 6.5c-1.09 0-2.16.18-3.16.5L7.3 5.47c1.44-.62 3.03-.97 4.7-.97M3.18 12A9.821 9.821 0 0 0 12 17.5c.69 0 1.37-.07 2-.21L11.72 15A3.064 3.064 0 0 1 9 12.28L5.6 8.87c-.99.85-1.82 1.91-2.42 3.13"
                />
              </svg>
            )}
          </div>
        </label>
        <label
          htmlFor="groupId"
          className="block mb-1 text-base font-medium text-gray-900"
        >
          Group ID <small>(comma separated)</small>
        </label>
        <input
          type="text"
          id="groupId"
          value={groupId}
          onChange={handleGroupIdChange}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg w-full mb-3 p-2"
          required
        />
        <label
          htmlFor="choice"
          className="block mb-1 text-base font-medium text-gray-900"
        >
          {activeTabLabel == "Comment"
            ? "No of Posts"
            : "" || activeTabLabel == "Private Messages"
            ? "No of Accounts"
            : "" || activeTabLabel == "Publish"
            ? "Text"
            : ""}
        </label>
        <input
          id="choice"
          value={
            activeTabLabel === "Publish"
              ? publish
              : activeTabLabel === "Comment"
              ? comment
              : activeTabLabel === "Private Messages"
              ? privateMessage
              : ""
          }
          onChange={handleChoiceChange}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg w-full mb-3 p-2"
          required
        />
        <label
          htmlFor="limit"
          className="block mb-1 text-base font-medium text-gray-900"
        >
          {activeTabLabel == "Comment" || activeTabLabel == "Private Messages"
            ? "Limit"
            : ""}
        </label>
        {activeTabLabel == "Comment" || activeTabLabel == "Private Messages" ? (
          <input
            id="limit"
            value={limit}
            onChange={handleLimitChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg w-full mb-3 p-2"
            required
          />
        ) : (
          <div></div>
        )}
        <div className="flex justify-center">
          <button
            type="submit"
            className={`text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold px-5 py-2 my-2 text-center ${
              isButtonDisabled() ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleSubmit}
            disabled={isButtonDisabled()}
          >
            Start
          </button>
        </div>
      </Tabs>
    </main>
  );
}
