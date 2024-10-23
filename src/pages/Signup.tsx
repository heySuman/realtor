import { Link } from "react-router-dom";
import img from "/signin-img.jpg";
import { useState } from "react";
import OAuth from "../components/oauth";

export default function Signup() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <section>
      <h1 className="text-center font-bold text-3xl mt-6">SIGN UP</h1>
      <div className="flex flex-wrap w-[90%] mx-auto gap-4 my-5 lg:w-full xl:my-10 justify-between">
        <div className="w-full md:w-3/4 mx-auto xl:w-[50%]">
          <img
            src={img}
            alt="key photo"
            className="rounded-lg"
            loading="lazy"
          />
        </div>
        <div className="w-full md:w-3/4 xl:w-[45%] mx-auto flex items-center">
          <form className="flex flex-wrap gap-3">
            <input
              type="text"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Full Name"
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Email address"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type={"text"}
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Password"
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="w-full flex justify-between whitespace-nowrap text-sm sm:text-lg px-1">
              <p className="flex items-center">
                Have an account?
                <Link
                  className="text-red-600 hover:text-red-700 duration-200 transition ease-in-out ml-1"
                  to="/signin"
                >
                  Login
                </Link>
              </p>
              <Link
                className="text-blue-600 hover:text-blue-800 duration-200 transition ease-in-out"
                to="/forgot-password"
              >
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 p-3 rounded text-white font-bold hover:bg-blue-700"
            >
              SIGN UP
            </button>

            <div className="w-full flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
              <p className="text-center font-semibold mx-4 mb-0">OR</p>
            </div>

            <OAuth />
          </form>
        </div>
      </div>
    </section>
  );
}