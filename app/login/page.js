import Image from "next/image";
import Link from "next/link";
import React from "react";
import Facebook from "../assets/facebook.png";
import Instagram from "../assets/instagram.jpeg";
import Tick from "../assets/tick.svg";

export default function Logins() {
  return (
    <main className="flex items-center justify-center h-screen bg-gray-100">
      <div className="relative bg-white py-6 px-6 mx-6 rounded-3xl w-64 my-4 shadow-xl">
        <Image
          className="flex items-center absolute rounded-full shadow-xl left-6 -top-6"
          src={Facebook}
          alt="Facebook"
          width={60}
        />
        <div className="mt-8">
          <p className="text-xl font-semibold my-2">Facebook</p>
          <div className="border-t-2"></div>
          <div className="flex space-x-2 text-gray-400 text-sm my-3">
            <Image src={Tick} alt="Tick" width={15} height={15} />
            <p>Schedule Posts</p>
          </div>
          <div className="flex space-x-2 text-gray-400 text-sm my-3">
            <Image src={Tick} alt="Tick" width={15} height={15} />
            <p>Group Engagement</p>
          </div>
          <div className="flex space-x-2 text-gray-400 text-sm my-3">
            <Image src={Tick} alt="Tick" width={15} height={15} />
            <p>Private Messaging</p>
          </div>
          <Link href="/login/facebook">
            <button className=" text-white bg-[#1877F2] py-2 px-6 hover:bg-[#045ccf] rounded text-md">
              Login with Facebook
            </button>
          </Link>
        </div>
      </div>
      <div className="relative bg-white py-6 px-6 mx-6 rounded-3xl w-64 my-4 shadow-xl">
        <Image
          className="flex items-center absolute rounded-full shadow-xl left-6 -top-6"
          src={Instagram}
          alt="Instagram"
          width={60}
        />
        <div className="mt-8">
          <p className="text-xl font-semibold my-2">Instagram</p>
          <div className="border-t-2"></div>
          <div className="flex space-x-2 text-gray-400 text-sm my-3">
            <Image src={Tick} alt="Tick" width={15} height={15} />
            <p>Strategic Comments</p>
          </div>
          <div className="flex space-x-2 text-gray-400 text-sm my-3">
            <Image src={Tick} alt="Tick" width={15} height={15} />
            <p>Direct Messaging</p>
          </div>
          <Link href="/login/instagram">
            <button className=" text-white bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 py-2 px-6 rounded text-md hover:opacity-80">
              Login with Instagram
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
