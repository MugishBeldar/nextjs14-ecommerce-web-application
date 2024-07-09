"use client";

import * as z from "zod";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RxCrossCircled } from "react-icons/rx";
import { TagsInput } from "react-tag-input-component";
import { toast } from "sonner";

import "../style/add-product-form.css";
import CloudinaryUploadImages from "./cloudinary-upload-images";
import { useAppStore } from "@/store";
import { ProductSchema } from "@/schemas";
import { getCategories } from "@/actions/category";
import { createProduct, getProducts } from "@/actions/product";

import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const AddProductForm = () => {
  const [tagError, setTagError] = useState<boolean>(false);
  const [keyFeaturesError, setKeyFeaturesError] = useState<boolean>(false);
  const [selectedTags, setSelectedTags] = useState<string[] | []>([]);
  const [selectedKeyFeatures, setSelectedKeyFeatures] = useState<string[] | []>([]);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string[] | []>([]);
  const [productThumbnail, setProductThumbnail] = useState<string>('');
  const { setProductsData, setToggleSheet, setCategoriesData, categoriesData } = useAppStore();

  useEffect(() => {
    async function fetchCategories() {
      const response = await getCategories();
      if (response && response.length > 0) {
        setCategoriesData(response);
      }
    }
    fetchCategories();
  }, [setCategoriesData]);

  const form = useForm({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      productName: "",
      // description: "",
      category: "",
      price: "",
      discount: "",
      qty: "",
    },
  });

  const handleUploadSuccess = (uploaded: any) => {
    if (uploaded?.event === "success") {
      setUploadedImageUrl((prev) => [...prev, uploaded.info.url]);
    }
  };

  const handleProductThumbnail = (uploaded: any) => {
    if (uploaded?.event === "success") {
      setProductThumbnail(uploaded.info.url);
    }
  }

  const onSubmit = async (values: z.infer<typeof ProductSchema>) => {
    const isTagError = !selectedTags.length;
    const isKeyFeatureError = !selectedKeyFeatures.length;

    if (!isTagError && !isKeyFeatureError) {
      // setTagError(true);
      const tags = selectedTags;
      const keyFeatures = selectedKeyFeatures;
      const category = categoriesData.find(
        (category) => category.categoryName === values.category
      );
      if (category) {
        const { error, success } = await createProduct(
          values,
          uploadedImageUrl,
          category?.id,
          tags,
          keyFeatures,
          productThumbnail
        );
        if (error) {
          toast.error("Please provide a valid product data.");
          setToggleSheet(false);
          setTagError(false);
        }
        if (success) {
          toast.success("Product created successfully.");
          setTagError(false);
          setKeyFeaturesError(false);
          setToggleSheet(false);
        }
        setUploadedImageUrl([]);
        setProductThumbnail('');
      }
      const response = await getProducts();
      if (response && response.length) {
        setProductsData(response);
      } else {
        setProductsData([]);
      }
      form.reset();
      return;
    } else {
      if (isTagError) {
        setTagError(true);
      }
      if (isKeyFeatureError) {
        setKeyFeaturesError(true);
      }
      return;
    }
  };

  const removeImage = async (url: string, actionFor: string) => {
    if (actionFor === 'thumbnail') {
      setProductThumbnail('');
    }
    if (actionFor === 'image'){
      setUploadedImageUrl((prev) => prev.filter((item) => item !== url));
    }
  };

  const handleCancle = () => {
    setUploadedImageUrl([]);
    setToggleSheet(false);
    form.reset();
  };
  const isLoading = form.formState.isSubmitting;

  return (
    <div className="h-full ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="h-full">
          <div className="flex h-full flex-col">
            <div className="h-full ">
              <div className="w-[98%] ml-1 my-6 text-primary-txt">
                <FormField
                  control={form.control}
                  name="productName"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel className="text-custom-font">
                        Product Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className=" bg-transparent border-secondary-black focus:outline-none placeholder:text-custom-font"
                          placeholder="Enter product name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-[98%] ml-1 my-6 text-primary-txt">
                {/* <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel className="text-custom-font">
                        Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          disabled={isLoading}
                          className="  bg-transparent border-secondary-black focus:outline-none placeholder:text-custom-font"
                          placeholder="Type something"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                <FormField
                  name=""
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel className="text-custom-font">Key Features</FormLabel>
                      <FormControl >
                        <TagsInput
                          value={selectedKeyFeatures}
                          onChange={setSelectedKeyFeatures}
                          name="keyFeatures"
                          placeHolder="Enter key features"
                          classNames={{
                            input: "bg-[#23262b]",
                          }}
                        />
                      </FormControl>
                      {tagError ? (
                        <div className="text-red-600 font-medium">
                          Tag is required
                        </div>
                      ) : (
                        ""
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-[98%] ml-1 my-6 text-primary-txt">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel className="text-custom-font">
                        Category
                      </FormLabel>
                      <FormControl>
                        <Select
                          {...field}
                          onValueChange={(value) => {
                            field.onChange(value);
                          }}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-[98%] ml-1  bg-transparent outline-none border-secondary-black">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent className="placeholder:text-red-900 text-primary-txt hover:bg-surface  bg-primary-background outline-none border-secondary-black">
                            {categoriesData.map((category) => (
                              <SelectItem
                                key={category.id}
                                className="hover:bg-surface"
                                value={category.categoryName}
                              >
                                {category.categoryName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-[98%] ml-1 flex gap-4 my-6 text-primary-txt">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel className="text-custom-font">Price</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="w-[98%] ml-1  bg-transparent border-secondary-black focus:outline-none placeholder:text-custom-font"
                          placeholder="Enter price"
                          {...field}
                          type="number"
                          min={0}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel className="text-custom-font">
                        Discount
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="w-[98%] ml-1  bg-transparent border-secondary-black focus:outline-none placeholder:text-custom-font"
                          placeholder="Enter discount"
                          {...field}
                          type="number"
                          min={0}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="qty"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel className="text-custom-font">
                        Qauntity
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="  bg-transparent border-secondary-black focus:outline-none placeholder:text-custom-font"
                          placeholder="Enter quantity"
                          {...field}
                          type="number"
                          min={0}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-[98%] ml-1 my-6 text-primary-txt">
                <FormField
                  name=""
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel className="text-custom-font">Tags</FormLabel>
                      <FormControl >
                        <TagsInput
                          value={selectedTags}
                          onChange={setSelectedTags}
                          name="tags"
                          placeHolder="Enter tags"
                          classNames={{
                            input: "bg-[#23262b]",
                          }}
                        />
                      </FormControl>
                      {tagError ? (
                        <div className="text-red-600 font-medium">
                          Tag is required
                        </div>
                      ) : (
                        ""
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="my-6 text-primary-txt">
                <p className="text-custom-font">Product Thumbnail</p>
                <div className="border rounded-xl border-dashed border-custom-font my-2 h-[100px] flex flex-col justify-center items-center">
                  <div
                    className="flex flex-col justify-center items-center"
                  >
                    <CloudinaryUploadImages
                      handleUploadSuccess={handleProductThumbnail}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {productThumbnail.length > 0 &&
                    <>
                      <div className="relative">
                        <Image
                          src={productThumbnail}
                          alt="image"
                          key={productThumbnail}
                          width={90}
                          height={90}
                          loading="lazy"
                        />
                        <div
                          className="absolute top-0 right-2"
                          onClick={() => removeImage(productThumbnail, "thumbnail")}
                        >
                          <RxCrossCircled
                            size={18}
                            color="red"
                            className="cursor-pointer"
                          />
                        </div>
                      </div>
                    </>
                  }
                </div>
              </div>

              <div className="my-6 text-primary-txt">
                <p className="text-custom-font">Product Images</p>
                <div className="border rounded-xl border-dashed border-custom-font my-2 h-[100px] flex flex-col justify-center items-center">
                  <div
                    className="flex flex-col justify-center items-center"
                  >
                    <CloudinaryUploadImages
                      handleUploadSuccess={handleUploadSuccess}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {uploadedImageUrl.length > 0 &&
                    uploadedImageUrl.map((imageUrl, index) => {
                      return (
                        <>
                          <div className="relative">
                            <Image
                              src={imageUrl}
                              alt="image"
                              key={index}
                              width={90}
                              height={90}
                              loading="lazy"
                            />
                            <div
                              className="absolute top-0 right-2"
                              onClick={() => removeImage(imageUrl, 'image')}
                            >
                              <RxCrossCircled
                                size={18}
                                color="red"
                                className="cursor-pointer"
                              />
                            </div>
                          </div>
                        </>
                      );
                    })}
                </div>
              </div>

            </div>
            <div className="fixed bottom-0 right-0 w-[384px] bg-surface  p-4 flex justify-end gap-4">
              <div className="w-full">
                <Button
                  size={"sm"}
                  type="submit"
                  disabled={isLoading}
                  className="w-1/4 bg-secondary-blue border-none hover:bg-secondary-blue rounded-xl mr-4"
                >
                  Save
                </Button>
                <Button
                  size={"sm"}
                  type="reset"
                  disabled={isLoading}
                  onClick={handleCancle}
                  className="w-1/4 bg-transparent border border-secondary-black hover:bg-transparent rounded-xl"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddProductForm;
