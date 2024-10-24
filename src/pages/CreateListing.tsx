import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";

export default function CreateListing() {
  interface IListing {
    listingType: "rent" | "sale";
    propertyName: string;
    offer: boolean;
    furnished: boolean;
    discountedPrice: number;
    parking: boolean;
    bed: number;
    bath: number;
    price: number;
    description: string;
    address: string;
    images: FileList | null;
  }
  const [formData, setFormData] = useState<IListing>({
    listingType: "sale",
    propertyName: "",
    offer: false,
    furnished: false,
    discountedPrice: 0,
    parking: false,
    bed: 0,
    bath: 0,
    price: 0,
    description: "",
    address: "",
    images: [],
  });

  return (
    <section>
      <h1 className="my-6 text-3xl font-bold text-center">Create Listing</h1>
      <div className="flex flex-wrap w-[90%] mx-auto gap-4 my-5 lg:w-full xl:my-10 justify-between">
        <div className="w-full md:w-3/4 xl:w-[45%] mx-auto flex items-center">
          <form className="w-full">
            <RadioGroup
              className="flex justify-around"
              name="listingType"
              required
              value={formData.listingType}
              onValueChange={(value: string) =>
                setFormData((prev) => ({ ...prev, listingType: value }))
              }
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
                value={formData.propertyName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
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
                  value={formData.bed}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="w-full flex flex-col gap-3">
                <Label>Baths</Label>
                <Input
                  type="number"
                  name="bath"
                  min={0}
                  required
                  value={formData.bath}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="my-6 flex flex-col gap-3">
              <Label>Parking Spot</Label>
              <RadioGroup
                className="flex gap-5"
                required
                value={formData.parking ? "yes" : "no"}
                onValueChange={(value: string) =>
                  setFormData((prev) => ({
                    ...prev,
                    parking: value === "yes" ? true : false,
                  }))
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
                value={formData.furnished ? "yes" : "no"}
                onValueChange={(value: string) =>
                  setFormData((prev) => ({
                    ...prev,
                    furnished: value === "yes" ? true : false,
                  }))
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
                value={formData.address}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </div>

            <div className="my-6 flex flex-col gap-3">
              <Label>Description</Label>
              <Textarea
                placeholder="Description"
                name="description"
                required
                value={formData.description}
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
                value={formData.offer ? "yes" : "no"}
                onValueChange={(value: string) =>
                  setFormData((prev) => ({
                    ...prev,
                    offer: value === "yes" ? true : false,
                  }))
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
                {formData.listingType === "rent"
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
                  value={formData.price}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                />
                <Label>
                  {formData.listingType === "rent"
                    ? "$/Month"
                    : "$ Total Amount"}
                </Label>
              </div>
            </div>

            {formData.offer && (
              <div className="my-6 flex flex-col gap-3">
                <Label>Discounted Price</Label>
                <div className="flex items-center gap-3">
                  <Input
                    name="discountedPrice"
                    type="number"
                    className="w-1/3"
                    required
                    value={formData.discountedPrice}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFormData((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            )}

            <div className="my-6 flex flex-col gap-3">
              <Label>Image</Label>
              <Input
                type="file"
                accept=".jpg,.png,.jpeg,.svg"
                required
                multiple
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData((prev) => ({ ...prev, images: e.target.files }))
                }
              />
            </div>

            <Button
              className="bg-blue-600 w-full hover:bg-blue-700"
              type="submit"
            >
              List Property
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
