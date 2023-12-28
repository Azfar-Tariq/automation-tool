"use client";

import React, { useState } from "react";
import Image from "next/image";
import Logo from "../../assets/instagram.jpeg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Instagram() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [limit, setLimit] = useState("");
  const [hashtag, setHashtag] = useState("");
  const [comment, setComment] = useState("");
  const [privateMessage, setPrivateMessage] = useState("");
  const [commentChecked, setCommentChecked] = useState(false);
  const [privateMessageChecked, setPrivateMessageChecked] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handleHashtagChange = (event) => {
    let newValue = event.target.value;

    // Allow only numbers and alphabets
    const alphanumericRegex = /^[a-zA-Z0-9]*$/;
    if (!alphanumericRegex.test(newValue)) {
      // Remove any non-alphanumeric characters
      newValue = newValue.replace(/[^a-zA-Z0-9]/g, "");
    }

    // Add a hashtag if the user doesn't provide one
    if (!newValue.startsWith("#")) {
      newValue = "#" + newValue;
    }

    setHashtag(newValue);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handlePrivateMessageChange = (event) => {
    setPrivateMessage(event.target.value);
  };

  const handleCommentCheckboxChange = () => {
    setCommentChecked(!commentChecked);
  };

  const handlePrivateMessageCheckboxChange = () => {
    setPrivateMessageChecked(!privateMessageChecked);
  };

  const isCommentDisabled = !commentChecked;
  const isPrivateMessageDisabled = !privateMessageChecked;

  const isButtonDisabled =
    !(commentChecked || privateMessageChecked) ||
    !username ||
    !password ||
    !limit ||
    !hashtag ||
    (commentChecked && !comment) ||
    (privateMessageChecked && !privateMessage);

  const handleSubmit = async () => {
    if (isButtonDisabled) {
      return;
    }

    const data = {
      username,
      password,
      limit,
      hashtag,
      comment: commentChecked ? comment : "",
      privateMessage: privateMessageChecked ? privateMessage : "",
    };

    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        data,
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
      console.error("Error: ", error.message);
    }

    setUsername("");
    setPassword("");
    setLimit("");
    setHashtag("");
    setComment("");
    setPrivateMessage("");
    setCommentChecked(false);
    setPrivateMessageChecked(false);
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <ToastContainer />
      <Image
        className="rounded-full shadow-xl mt-40 mb-4"
        src={Logo}
        alt="Facebook"
        width={90}
      />
      <div className="w-96">
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
          required={!isButtonDisabled}
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
          htmlFor="limit"
          className="block mb-1 text-base font-medium text-gray-900"
        >
          Limit
        </label>
        <input
          id="limit"
          type="number"
          value={limit}
          onChange={handleLimitChange}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg w-full mb-3 p-2"
          required={!isButtonDisabled}
        />
        <label
          htmlFor="hashtag"
          className="block mb-1 text-base font-medium text-gray-900"
        >
          Hashtags
        </label>
        <input
          id="hashtag"
          value={hashtag}
          onChange={handleHashtagChange}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg w-full mb-3 p-2"
          required={!isButtonDisabled}
        />
        <label
          htmlFor="comment"
          className="block mb-1 text-base font-medium text-gray-900"
        >
          Comment
        </label>
        <input
          id="comment"
          value={comment}
          onChange={handleCommentChange}
          className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg w-full mb-3 p-2 ${
            isCommentDisabled ? "opacity-60 cursor-not-allowed" : ""
          }`}
          required={commentChecked}
          disabled={isCommentDisabled}
        />
        <label
          htmlFor="private-message"
          className="block mb-1 text-base font-medium text-gray-900"
        >
          Private Message
        </label>
        <input
          id="private-message"
          value={privateMessage}
          onChange={handlePrivateMessageChange}
          className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg w-full mb-3 p-2 ${
            isPrivateMessageDisabled ? "opacity-60 cursor-not-allowed" : ""
          }`}
          required={privateMessageChecked}
          disabled={isPrivateMessageDisabled}
        />
        <div className="flex justify-center items-center">
          <label htmlFor="comment-checkbox" className="text-gray-900 text-base">
            Comment
          </label>
          <input
            type="checkbox"
            id="comment-checkbox"
            className="m-2 w-4 h-4"
            checked={commentChecked}
            onChange={handleCommentCheckboxChange}
          />
          <label
            htmlFor="private-message-checkbox"
            className="text-gray-900 text-base"
          >
            Private Message
          </label>
          <input
            type="checkbox"
            id="private-message-checkbox"
            className="m-2 w-4 h-4"
            checked={privateMessageChecked}
            onChange={handlePrivateMessageCheckboxChange}
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className={`text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold px-5 py-2 my-2 text-center ${
              isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleSubmit}
          >
            Start
          </button>
        </div>
      </div>
    </main>
  );
}
