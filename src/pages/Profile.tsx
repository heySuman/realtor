import MyListing, { IListingProp } from "@/components/MyListing";
import { db } from "@/firebase";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IListing } from "./CreateListing";

export default function Profile() {
  const auth = getAuth();
  const user = auth.currentUser;

  const [formData, setFormData] = useState({
    name: user?.displayName,
    email: user?.email,
  });
  const { name, email } = formData;
  const [editActive, setEditActive] = useState(false);
  const [listing, setListing] = useState<
    { id: string; data: IListingProp }[] | null
  >(null);
  const [loading, setLoading] = useState(false);

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

  // fetch the listings created by the user
  useEffect(() => {
    async function fetchUserListings() {
      setLoading(true);
      if (auth.currentUser) {
        const listingRef = collection(db, "listings");
        const q = query(
          listingRef,
          where("userRef", "==", auth.currentUser.uid),
          orderBy("createdAt", "desc")
        );

        const querySnap = await getDocs(q);
        const listings: { id: string; data: IListing }[] = [];
        querySnap.forEach((doc) =>
          listings.push({
            id: doc.id,
            data: doc.data(),
          })
        );
        setListing(listings);
      }
      setLoading(false);
    }

    fetchUserListings();
  }, [auth.currentUser]);

  const onDelete = async (listingId: string) => {
    if (confirm("Are you sure you want to delete the listing?")) {
      try {
        const docRef = doc(db, "listings", listingId);
        await deleteDoc(docRef);
        toast.success("Listing deleted successfully!");
        const updatedListings =
          listing && listing.filter((i) => i.id !== listingId);
        setListing(updatedListings);
      } catch (error) {
        toast.error("Could not delete the listing");
        console.log(error);
      }
    }
  };

  function onEdit(listingID: string) {
    navigate(`/edit-listing/${listingID}`);
  }
  return (
    <>
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
      <section>
        {!loading && listing && listing.length > 0 && (
          <>
            <h2 className="font-bold text-3xl text-center my-6">My Listings</h2>
            <ul className="flex w-[90%] mx-auto gap-4 flex-wrap justify-center align-center mb-6">
              {listing &&
                listing.map((i) => (
                  <MyListing
                    key={i.id}
                    listing={i.data}
                    id={i.id}
                    onDelete={() => onDelete(i.id)}
                    onEdit={() => onEdit(i.id)}
                  />
                ))}
            </ul>
          </>
        )}
      </section>
    </>
  );
}
