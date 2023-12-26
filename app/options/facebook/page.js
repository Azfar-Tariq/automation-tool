"use client";

import React, { useState } from "react";
import { Tabs, TabsHeader, Tab } from "@material-tailwind/react";
import Image from "next/image";
import Logo from "../../assets/facebook.png";
import axios from "axios";

export default function Facebook() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [groupId, setGroupId] = useState([]);
  const [publish, setPublish] = useState("");
  const [comment, setComment] = useState("");
  const [privateMessage, setPrivateMessage] = useState("");
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

  const isButtonDisabled = () => {
    switch (activeTabLabel) {
      case "Publish":
        return !(username && password && groupId.length > 0 && publish);
      case "Comment":
        return !(username && password && groupId.length > 0 && comment);
      case "Private Messages":
        return !(username && password && groupId.length > 0 && privateMessage);
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    if (isButtonDisabled()) {
      return;
    }

    const dataToSend = {
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

    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts", // Replace with your actual API endpoint
        dataToSend,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Data Sent Successfully");
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
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <Image
        className="rounded-full shadow-xl mb-4"
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
          className="block mb-1 text-base font-medium text-gray-900"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg w-full mb-3 p-2"
          required
        />
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
