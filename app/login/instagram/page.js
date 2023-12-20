"use client";

import React, { useState } from "react";
import Image from "next/image";
import Logo from "../../assets/instagram.jpeg";

export default function Instagram() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
    !hashtag ||
    (commentChecked && !comment) ||
    (privateMessageChecked && !privateMessage);

  const handleSubmit = () => {
    if (isButtonDisabled) {
      return;
    } else {
      console.log("username", username);
      console.log("password", password);
      console.log("hashtag", hashtag);
      console.log("comment", comment);
      console.log("privateMessage", privateMessage);
      console.log("commentChecked", commentChecked);
      console.log("privateMessageChecked", privateMessageChecked);
    }
    setUsername("");
    setPassword("");
    setHashtag("");
    setComment("");
    setPrivateMessage("");
    setCommentChecked(false);
    setPrivateMessageChecked(false);
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <Image
        className="rounded-full shadow-xl mb-2"
        src={Logo}
        alt="Facebook"
        width={85}
      />
      <div className="w-96">
        <label
          htmlFor="username"
          className="block mb-1 mt-2 text-sm font-medium text-gray-900"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full mb-2 p-2"
          required={!isButtonDisabled}
        />
        <label
          htmlFor="password"
          className="block mb-1 text-sm font-medium text-gray-900"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full mb-2 p-2"
          required={!isButtonDisabled}
        />
        <label
          htmlFor="hashtag"
          className="block mb-1 text-sm font-medium text-gray-900"
        >
          Hashtags
        </label>
        <input
          id="hashtag"
          value={hashtag}
          onChange={handleHashtagChange}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full mb-2 p-2"
          required={!isButtonDisabled}
        />
        <label
          htmlFor="comment"
          className="block mb-1 text-sm font-medium text-gray-900"
        >
          Comment
        </label>
        <input
          id="comment"
          value={comment}
          onChange={handleCommentChange}
          className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full mb-2 p-2 ${
            isCommentDisabled ? "opacity-60 cursor-not-allowed" : ""
          }`}
          required={commentChecked}
          disabled={isCommentDisabled}
        />
        <label
          htmlFor="private-message"
          className="block mb-1 text-sm font-medium text-gray-900"
        >
          Private Message
        </label>
        <input
          id="private-message"
          value={privateMessage}
          onChange={handlePrivateMessageChange}
          className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full mb-2 p-2 ${
            isPrivateMessageDisabled ? "opacity-60 cursor-not-allowed" : ""
          }`}
          required={privateMessageChecked}
          disabled={isPrivateMessageDisabled}
        />
        <div className="flex justify-center items-center">
          <label htmlFor="comment-checkbox" className="text-gray-900 text-sm">
            Comment
          </label>
          <input
            type="checkbox"
            id="comment-checkbox"
            className="m-2 w-3"
            checked={commentChecked}
            onChange={handleCommentCheckboxChange}
          />
          <label
            htmlFor="private-message-checkbox"
            className="text-gray-900 text-sm"
          >
            Private Message
          </label>
          <input
            type="checkbox"
            id="private-message-checkbox"
            className="m-2 w-3"
            checked={privateMessageChecked}
            onChange={handlePrivateMessageCheckboxChange}
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className={`text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-sm px-4 py-2 my-2 text-center ${
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
