import MyListing, { IListingProp } from "@/components/MyListing";
import { Spinner } from "@/components/spinner";
import { db } from "@/firebase";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Home() {
  const [offers, setOffers] = useState<
    { id: string; data: IListingProp }[] | null
  >(null);
  const [rentListing, setRentListing] = useState<
    { id: string; data: IListingProp }[] | null
  >(null);
  const [saleListing, setSaleListing] = useState<
    { id: string; data: IListingProp }[] | null
  >(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);
        const r = collection(db, "listings");
        const q = query(
          r,
          where("offer", "==", true),
          orderBy("createdAt", "desc"),
          limit(8)
        );

        const querySnap = await getDocs(q);

        const listings: { id: string; data: IListingProp }[] = [];
        querySnap.forEach((doc) =>
          listings.push({
            id: doc.id,
            data: doc.data(),
          })
        );

        setOffers(listings);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("Could not load offers!");
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        setLoading(true);
        const r = collection(db, "listings");
        const q = query(
          r,
          where("listingType", "==", "sale"),
          orderBy("createdAt", "desc"),
          limit(4)
        );

        const querySnap = await getDocs(q);

        const listings: { id: string; data: IListingProp }[] = [];
        querySnap.forEach((doc) =>
          listings.push({
            id: doc.id,
            data: doc.data(),
          })
        );

        setSaleListing(listings);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("Could not load places for sales!");
        setLoading(false);
      }
    };
    fetchSales();
  }, []);

  useEffect(() => {
    const fetchRents = async () => {
      try {
        setLoading(true);
        const r = collection(db, "listings");
        const q = query(
          r,
          where("listingType", "==", "rent"),
          orderBy("createdAt", "desc"),
          limit(4)
        );

        const querySnap = await getDocs(q);

        const listings: { id: string; data: IListingProp }[] = [];
        querySnap.forEach((doc) =>
          listings.push({
            id: doc.id,
            data: doc.data(),
          })
        );

        setRentListing(listings);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("Could not load places for rent!");
        setLoading(false);
      }
    };
    fetchRents();
  }, []);

  if (loading) return <Spinner />;

  return (
    <>
      <section className="p-6">
        <h2 className="text-2xl font-bold mt-6">Recent Offers</h2>
        <Link to={"/offers"} className="mb-6 block underline text-orange-600">
          See more offers
        </Link>
        <div className="flex gap-3 flex-wrap">
          {offers &&
            offers.map((i) => (
              <MyListing key={i.id} listing={i.data} id={i.id} />
            ))}
        </div>
      </section>

      <section className="p-6">
        <h2 className="text-2xl font-bold mt-6">Places for rent</h2>
        <Link to={"/rent"} className="mb-6 block underline text-orange-600">
          Show more places to rent
        </Link>
        <div className="flex gap-3">
          {rentListing &&
            rentListing.map((i) => (
              <MyListing key={i.id} listing={i.data} id={i.id} />
            ))}
        </div>
      </section>
      <section className="p-6">
        <h2 className="text-2xl font-bold mt-6">Places for sale</h2>
        <Link to={"/sales"} className="mb-6 block underline text-orange-600">
          Show more places to buy
        </Link>
        <div className="flex gap-3">
          {saleListing &&
            saleListing.map((i) => (
              <MyListing key={i.id} listing={i.data} id={i.id} />
            ))}
        </div>
      </section>
    </>
  );
}
