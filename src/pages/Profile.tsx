import { getAuth, signOut, updateProfile } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Profile() {
  const auth = getAuth();
  const user = auth.currentUser;

  const [formData, setFormData] = useState({
    name: user?.displayName,
    email: user?.email,
  });
  const { name, email } = formData;
  const [editActive, setEditActive] = useState(false);

  const navigate = useNavigate();

  const handleNameChange = async () => {
    if (user) {
      try {
        await updateProfile(user, { displayName: name });
        toast.success("Name changed successfully");
        setEditActive(false);
      } catch (error) {
        toast.error("Could not update the name!");
        console.log(error);
      }
    } else {
      navigate("/signin");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <section>
      <h1 className="my-6 text-3xl font-bold text-center">Profile</h1>
      <div className="w-[90%] md:w-3/4 xl:w-[45%] mx-auto flex items-center flex-col">
        <form className="flex flex-wrap gap-3 mx-auto">
          <input
            type="text"
            disabled={!editActive}
            name="name"
            value={name}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          />
          <input
            type="email"
            disabled
            name="email"
            value={email}
            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          />

          <div className="w-full flex justify-between whitespace-nowrap text-md sm:text-lg px-1">
            <p className="flex items-center">
              Change the name?
              {editActive ? (
                <button
                  className="text-red-600 hover:text-red-700 hover:underline duration-200 transition ease-in-out ml-1"
                  type="button"
                  onClick={handleNameChange}
                >
                  Save Changes
                </button>
              ) : (
                <button
                  className="text-red-600 hover:text-red-700 hover:underline duration-200 transition ease-in-out ml-1"
                  type="button"
                  onClick={() => setEditActive((prev) => !prev)}
                >
                  Edit
                </button>
              )}
            </p>
            <button
              className="text-blue-600 hover:text-blue-800 duration-200 transition ease-in-out"
              type="button"
              onClick={handleLogout}
            >
              Sign Out
            </button>
          </div>
        </form>
        <div className="w-full my-10">
          <Link to={"/create-listing"}>
            <button
              type="submit"
              className="w-full bg-blue-600 p-3 rounded text-white font-bold hover:bg-blue-700"
            >
              SELL OR RENT YOUR HOME
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
