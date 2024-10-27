import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import React, { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useNavigate } from "react-router-dom";
import { IListingProp } from "@/components/MyListing";
import { Textarea } from "@/components/ui/textarea";

export default function EditListing() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<IListingProp> | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchListingData = async () => {
      setLoading(true);
      const id = location.pathname.split("/")[2];

      try {
        const docSnap = await getDoc(doc(db, "listings", id));
        if (docSnap.exists()) {
          setFormData(docSnap.data() as IListingProp);
        } else {
          toast.error("Invalid Id");
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

  if (loading) return <Spinner />;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (
    name: keyof IListingProp,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (
      formData?.offer &&
      formData.discountedPrice &&
      +formData.discountedPrice > +formData.price!
    ) {
      toast.error("Discount must not be greater than the original price");
      setLoading(false);
      return;
    }

    const formDataCopy = { ...formData };
    if (!formDataCopy.offer) delete formDataCopy.discountedPrice;

    try {
      const id = location.pathname.split("/")[2];
      await updateDoc(doc(db, "listings", id), formDataCopy);
      toast.success("Listing Updated");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update listing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h1 className="my-6 text-3xl font-bold text-center">Edit Listing</h1>
      <div className="flex flex-wrap w-[90%] mx-auto gap-4 my-5 lg:w-full xl:my-10 justify-between">
        <div className="w-full md:w-3/4 xl:w-[45%] mx-auto flex items-center">
          <form className="w-full" onSubmit={onSubmit}>
            <RadioGroup
              className="flex justify-around"
              name="listingType"
              required
              value={formData?.listingType || "rent"}
              onValueChange={(value) => handleRadioChange("listingType", value)}
            >
              <div className="flex gap-2 items-center">
                <RadioGroupItem value="rent" id="rent" />
                <Label className="text-2xl">Rent</Label>
              </div>
              <div className="flex gap-2 items-center">
                <RadioGroupItem value="sale" id="sale" />
                <Label className="text-2xl">Sale</Label>
              </div>
            </RadioGroup>

            <div className="my-6 flex flex-col gap-3">
              <Label>Property Name</Label>
              <Input
                placeholder="Property Name"
                name="propertyName"
                required
                value={formData?.propertyName || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex justify-between gap-2">
              <div className="w-full flex flex-col gap-3">
                <Label>Beds</Label>
                <Input
                  type="number"
                  name="bed"
                  min={0}
                  required
                  value={formData?.bed || 0}
                  onChange={handleInputChange}
                />
              </div>

              <div className="w-full flex flex-col gap-3">
                <Label>Baths</Label>
                <Input
                  type="number"
                  name="bath"
                  min={0}
                  required
                  value={formData?.bath || 0}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="my-6 flex flex-col gap-3">
              <Label>Parking Spot</Label>
              <RadioGroup
                className="flex gap-5"
                required
                value={formData?.parking ? "yes" : "no"}
                onValueChange={(value) =>
                  handleRadioChange("parking", value === "yes")
                }
              >
                <div className="flex gap-2 items-center ">
                  <RadioGroupItem value="yes" id="yes" />
                  <Label className="text-md">Yes</Label>
                </div>
                <div className="flex gap-2 items-center">
                  <RadioGroupItem value="no" id="no" />
                  <Label className="text-md">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="my-6 flex flex-col gap-3">
              <Label>Furnished </Label>
              <RadioGroup
                className="flex gap-5"
                required
                value={formData?.furnished ? "yes" : "no"}
                onValueChange={(value) =>
                  handleRadioChange("parking", value === "yes")
                }
              >
                <div className="flex gap-2 items-center ">
                  <RadioGroupItem value="yes" id="yes" />
                  <Label className="text-md">Yes</Label>
                </div>
                <div className="flex gap-2 items-center">
                  <RadioGroupItem value="no" id="no" />
                  <Label className="text-md">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="my-6 flex flex-col gap-3">
              <Label>Address</Label>
              <Input
                placeholder="Address"
                name="address"
                type="text"
                required
                value={formData?.address}
                onChange={handleInputChange}
              />
            </div>

            <div className="my-6 flex flex-col gap-3">
              <Label>Description</Label>
              <Textarea
                placeholder="Description"
                name="description"
                required
                value={formData?.description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setFormData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </div>

            <div className="my-6 flex flex-col gap-3">
              <Label>Offer </Label>
              <RadioGroup
                className="flex gap-5"
                required
                value={formData?.offer ? "yes" : "no"}
                onValueChange={(value: string) =>
                  handleRadioChange("offer", value === "yes")
                }
              >
                <div className="flex gap-2 items-center ">
                  <RadioGroupItem value="yes" id="yes" />
                  <Label className="text-md">Yes</Label>
                </div>
                <div className="flex gap-2 items-center">
                  <RadioGroupItem value="no" id="no" />
                  <Label className="text-md">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="my-6 flex flex-col gap-3">
              <Label>
                {formData?.listingType === "rent"
                  ? "Regular Price"
                  : "Total Amount"}
              </Label>
              <div className="flex items-center gap-3">
                <Input
                  name="price"
                  type="number"
                  className="w-1/3"
                  min={0}
                  required
                  value={formData?.price}
                  onChange={handleInputChange}
                />
                <Label>
                  {formData?.listingType === "rent"
                    ? "$/Month"
                    : "$ Total Amount"}
                </Label>
              </div>
            </div>

            {formData?.offer && (
              <div className="my-6 flex flex-col gap-3">
                <Label>Discounted Price</Label>
                <div className="flex items-center gap-3">
                  <Input
                    name="discountedPrice"
                    type="number"
                    className="w-1/3"
                    required
                    value={formData?.discountedPrice}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}

            <Button
              className="bg-blue-600 w-full hover:bg-blue-700"
              type="submit"
            >
              Update Property
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
