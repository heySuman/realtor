import MyListing, { IListingProp } from "@/components/MyListing";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { db } from "@/firebase";
import {
  collection,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Rent() {
  const [rentListing, setRentListing] = useState<
    { id: string; data: IListingProp }[] | null
  >(null);
  const [lastFetched, setLastFetched] = useState<QueryDocumentSnapshot<
    DocumentData,
    DocumentData
  > | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);
        const r = collection(db, "listings");
        const q = query(
          r,
          where("listingType", "==", "rent"),
          orderBy("createdAt", "desc"),
          limit(8)
        );

        const querySnap = await getDocs(q);
        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetched(lastVisible);

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
        toast.error("Could not load offers!");
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  async function onFetchMoreListings() {
    try {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("offer", "==", true),
        orderBy("timestamp", "desc"),
        startAfter(lastFetched),
        limit(4)
      );
      const querySnap = await getDocs(q);
      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetched(lastVisible);

      const listings: { id: string; data: IListingProp }[] = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setRentListing((prevState) => prevState && [...prevState, ...listings]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Could not fetch listing");
    }
  }

  if (loading) return <Spinner />;
  return (
    <section className="p-6">
      <h1 className="text-3xl font-bold text-center my-6">Rent</h1>

      <div className="flex gap-3 flex-wrap">
        {rentListing &&
          rentListing.map((i) => (
            <MyListing key={i.id} listing={i.data} id={i.id} />
          ))}
      </div>
      {rentListing && rentListing?.length > 8 && (
        <div className="w-full grid place-items-center">
          <Button onClick={onFetchMoreListings}>Load More</Button>
        </div>
      )}
    </section>
  );
}
