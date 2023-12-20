import Link from "next/link";

export default function Home() {
  return (
    <main className="flex h-screen flex-col justify-center items-center gap-10">
      <div className="bg-gray-200 rounded-lg w-10/12">
        <div className="flex flex-col gap-4 p-6">
          <h2 className="flex justify-center font-bold text-2xl text-center">
            Revolutionize Your Social Media Presence with Our Powerful
            Automation Tools!
          </h2>
          <p className="flex justify-center text-gray-600 text-sm text-center">
            Unlock the full potential of your Facebook and Instagram marketing
            with our cutting-edge automation solutions. Seamlessly manage your
            social media tasks with precision and efficiency. From publishing
            content effortlessly to engaging with your audience in a
            personalized manner, we've got you covered.
          </p>
        </div>
      </div>
      <Link href="/login">
        <button className="bg-blue-600 px-6 py-3 text-white rounded-xl font-bold text-lg">
          Try Now
        </button>
      </Link>
    </main>
  );
}
