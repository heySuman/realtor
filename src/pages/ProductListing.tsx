import { IListingProp } from "@/components/MyListing";
import { Spinner } from "@/components/spinner";
import { db } from "@/firebase";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaParking } from "react-icons/fa";
import { FaBath, FaBed, FaChair, FaShare } from "react-icons/fa6";
import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper/modules";
import "swiper/css/bundle";
import Contact from "@/components/contact";

export default function ProductListing() {
  const [listing, setLisiting] = useState<IListingProp | null>(null);
  const [loading, setLoading] = useState(false);
  const [contactLandlord, setContactLandlord] = useState(false);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);

  useEffect(() => {
    const fetchListingData = async () => {
      setLoading(true);
      const id = location.pathname.split("/")[2];

      try {
        const docSnap = await getDoc(doc(db, "listings", id));
        if (docSnap.exists()) {
          setLisiting(docSnap.data() as IListingProp);
        } else {
          toast.error("Could not fetch the listing");
        }
      } catch (error) {
        toast.error("Failed to fetch listing data");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchListingData();
  }, []);

  const auth = getAuth();
  if (loading) return <Spinner />;
  return (
    <section>
      <Swiper
        slidesPerView={1}
        navigation
        pagination={{ type: "progressbar" }}
        effect="fade"
        modules={[EffectFade]}
        autoplay={{ delay: 3000 }}
      >
        {listing?.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full overflow-hidden h-[300px]"
              style={{
                background: `url(${listing.imgUrls[index]}) center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className="fixed top-[13%] right-[3%] z-10 bg-white cursor-pointer border-2 border-gray-400 rounded-full w-12 h-12 flex justify-center items-center"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkCopied(true);
          setTimeout(() => {
            setShareLinkCopied(false);
          }, 2000);
        }}
      >
        <FaShare className="text-lg text-slate-500" />
      </div>
      {shareLinkCopied && (
        <p className="fixed top-[23%] right-[5%] font-semibold border-2 border-gray-400 rounded-md bg-white z-10 p-2">
          Link Copied
        </p>
      )}

      <div className="m-4 flex flex-col md:flex-row max-w-6xl lg:mx-auto p-4 rounded-lg shadow-lg bg-white lg:space-x-5">
        <div className=" w-full ">
          <p className="text-2xl font-bold mb-3 text-blue-900">
            {listing?.propertyName} - ${" "}
            {/* {listing?.offer
              ? listing?.discountedPrice?
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" ? " / month" : ""} */}
          </p>
          <p className="flex items-center mt-6 mb-3 font-semibold">
            <FaMapMarkerAlt className="text-green-700 mr-1" />
            {listing?.address}
          </p>
          <div className="flex justify-start items-center space-x-4 w-[75%]">
            <p className="bg-red-800 w-full max-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md">
              {listing?.listingType === "rent" ? "Rent" : "Sale"}
            </p>
          </div>
          <p className="mt-3 mb-3">
            <span className="font-semibold">Description - </span>
            {listing?.description}
          </p>
          <ul className="flex items-center space-x-2 sm:space-x-10 text-sm font-semibold mb-6">
            <li className="flex items-center whitespace-nowrap">
              <FaBed className="text-lg mr-1" />
              {listing?.bed && +listing.bed > 1
                ? `${listing?.bed} Beds`
                : "1 Bed"}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaBath className="text-lg mr-1" />
              {listing?.bath && +listing?.bath > 1
                ? `${listing.bath} Baths`
                : "1 Bath"}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaParking className="text-lg mr-1" />
              {listing?.parking ? "Parking spot" : "No parking"}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaChair className="text-lg mr-1" />
              {listing?.furnished ? "Furnished" : "Not furnished"}
            </li>
          </ul>
          {listing?.userRef !== auth.currentUser?.uid && !contactLandlord && (
            <div className="mt-6">
              <button
                onClick={() => setContactLandlord(true)}
                className="px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg w-full text-center transition duration-150 ease-in-out "
              >
                Contact Landlord
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
