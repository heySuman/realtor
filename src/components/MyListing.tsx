import { getAuth } from "firebase/auth";
import { deleteDoc, doc, Timestamp } from "firebase/firestore";
import { FaLocationDot } from "react-icons/fa6";
import Moment from "react-moment";
import { FaTrash } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { db } from "@/firebase";
import { toast } from "react-toastify";

export interface IListingProp {
  imgUrls: string[];
  createdAt: Timestamp;
  userRef: string;
  listingType: "rent" | "sale";
  propertyName: string;
  offer: boolean;
  furnished: boolean;
  discountedPrice: number | undefined;
  parking: boolean;
  bed: number;
  bath: number;
  price: number;
  description: string;
  address: string;
}
export default function MyListing({
  id,
  listing,
  onEdit,
  onDelete,
}: {
  id: string;
  listing: IListingProp;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  return (
    <div className="w-full border-slate-300 p-2 border-2 flex-1 rounded sm:w-[300px] bg-white sm:max-w-[350px]">
      <img
        src={listing.imgUrls[0]}
        alt="property image"
        loading="lazy"
        className="w-full rounded"
      />
      <Moment fromNow className="bg-blue-500 p-1 rounded text-white mt-6">
        {listing.createdAt && listing.createdAt.toDate()}
      </Moment>
      <p className="flex items-center gap-2">
        <FaLocationDot fill="#3b82f6 " /> {listing.address}
      </p>
      <h2 className="font-bold text-md my-2">{listing.propertyName}</h2>
      <div className="flex gap-3">
        <p className="bg-blue-600 p-1 rounded text-white">
          {listing.bed > 0 && `${listing.bed} bedrooms`}
        </p>
        <p className="bg-blue-600 p-1 rounded text-white">
          {listing.bath > 0 && `${listing.bath} bathrooms`}
        </p>
      </div>

      <div>
        {listing.discountedPrice && listing.offer && (
          <>
            <p className="text-md text-gray-500 line-through	">
              $ {listing.price} {listing.listingType == "rent" ? "/ month" : ""}
            </p>
            <p className="text-xl font-semibold">
              $ {listing.discountedPrice}{" "}
              {listing.listingType == "rent" ? "/ month" : ""}
            </p>
          </>
        )}
        <p className="text-xl font-semibold">
          $ {listing.price} {listing.listingType == "rent" ? "/ month" : ""}
        </p>
      </div>
      {/* Delete Edit Buttons */}
      {currentUser && listing.userRef === currentUser.uid ? (
        <div className="flex gap-3 my-3">
          <button
            onClick={() => onDelete(id)}
            className="cursor-pointer flex w-1/2 bg-red-500 text-white p-2 items-center justify-center gap-3 rounded"
          >
            Delete <FaTrash />
          </button>
          <button
            onClick={() => onEdit(id)}
            className="cursor-pointer flex w-1/2 bg-blue-500 text-white p-2 items-center justify-center gap-3 rounded"
          >
            Edit <AiFillEdit />
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
