"use client";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAppStore } from "@/store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";
import { RxCrossCircled } from "react-icons/rx";
import { updateProduct, getProductFromProductId, getProducts } from "@/actions/product";
import { toast } from "sonner";
import { TagsInput } from "react-tag-input-component";
import "../../style/edit-product-modal.css";
import { Textarea } from "@/components/ui/textarea";
import CloudinaryUploadImages from "../cloudinary-upload-images";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { makeSecureUrl } from "@/lib/utils";

interface ProductModalProps {
  setProductModal: Dispatch<SetStateAction<boolean>>;
  productModal: boolean;
}
const ProductModal = ({ setProductModal, productModal }: ProductModalProps) => {
  const [productName, setProductName] = useState<string | "">("");
  const [categoryName, setCategoryName] = useState<string | "">("");
  const [keyFeatures, setKeyFeatures] = useState<string[]>([]);
  const [categoryId, setCategoryId] = useState<string | "">("");
  const [tag, setTags] = useState<string[] | []>([]);
  const [price, setPrice] = useState<number>();
  const [discount, setDiscount] = useState<number>();
  const [images, setImages] = useState<string[] | []>([]);
  const [productThumbnail, setProductThumbnail] = useState<string>('');
  const [quantity, setQuantity] = useState<number>();
  const { categoriesData, setProductsData, viewingProductId, viewingProduct, setViewingProduct } = useAppStore();
  useEffect(() => {
    async function productFromId() {
      const response = await getProductFromProductId(viewingProductId);
      if (response) {
        setViewingProduct(response);
        const category = categoriesData.find(
          (c) => c.id === response.categoryId
        );
        if (category) {
          setCategoryName(category?.categoryName);
          setCategoryId(category?.id);
        }
        setProductName(response.productName);
        setDiscount(response.discount);
        setKeyFeatures(response.keyFeatures);
        setPrice(response.price);
        if (response.images) setImages([...response.images]);
        setQuantity(response.quantity);
        if (response.tags) setTags(response.tags);
      }
    }
    productFromId();
  }, [categoriesData, setViewingProduct, viewingProductId]);

  const handleUploadSuccess = (uploaded: any) => {
    if (uploaded?.event === "success") {
      setImages((prevImages) => [...prevImages, uploaded.info.url]);
    }
  };
  const removeImage = (imageUrl: string, actionFor:string) => {
    if (actionFor === 'thumbnail') {
      setProductThumbnail('');
    }
    if (actionFor === 'image'){
      setImages((prevImages) => prevImages.filter((image) => image !== imageUrl));
    }
  };

  const handleProductThumbnail = (uploaded: any) => {
    if (uploaded?.event === "success") {
      setProductThumbnail(uploaded.info.url);
    }
  }

  const handleSave = async () => {
    if (price && discount && quantity && viewingProduct) {
      const { success, error } = await updateProduct(
        viewingProduct.id,
        productName,
        categoryId,
        keyFeatures,
        tag,
        price,
        images,
        discount,
        quantity,
        productThumbnail
      );
      if (success) toast.success("Product updated successfully.");
      if (error) toast.error("Please fill valid details.");
      const response = await getProducts();
      if (response && response.length > 0) {
        setProductsData(response);
      }
    }
    setProductModal((prev) => !prev);
    setProductThumbnail('');
  };
  return (
    <Dialog open={productModal} onOpenChange={setProductModal}>
      <DialogContent className="bg-surface border border-secondary-black min-h-[800px]">
        <Tabs defaultValue="information" className="w-full">
          <div className="flex flex-col">
            <div className="flex-1">
              <DialogHeader className="w-full mt-4">
                <TabsList className="bg-transparent">
                  {["information", "pricing", "images", "inventory"].map(
                    (tab) => (
                      <TabsTrigger
                        key={tab}
                        className="data-[state=inactive]:border-b-2 data-[state=inactive]:border-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-secondary-blue rounded-none data-[state=active]:text-primary-txt data-[state=active]:bg-transparent text-primary-txt hover:bg-transparent"
                        value={tab}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </TabsTrigger>
                    )
                  )}
                </TabsList>
              </DialogHeader>

              {["information", "pricing", "images", "inventory"].map((tab) => (
                <TabsContent key={tab} value={tab} className="">
                  {tab === "information" && (
                    <div className="text-primary-txt">
                      <div className="mb-4">
                        <div className="text-custom-font">Product Name</div>
                        <div>
                          <Input
                            onChange={(e) => setProductName(e.target.value)}
                            value={productName}
                            className="font-light bg-transparent border-secondary-black focus:outline-none placeholder:text-custom-font"
                            placeholder="Enter product name"
                          />
                        </div>
                      </div>
                      
                      <div className="text-custom-font">Category</div>
                      <div className="mb-4">
                        <Select
                          onValueChange={(value) => setCategoryName(value)}
                          value={categoryName}
                        >
                          <SelectTrigger className="bg-transparent outline-none border-secondary-black">
                            <SelectValue placeholder="" />
                          </SelectTrigger>
                          <SelectContent className="font-light text-primary-txt hover:bg-surface bg-primary-background outline-none border-secondary-black">
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
                      </div>
                      <div className="mb-4 ">
                        <div className="text-custom-font ">Key features</div>
                        <div className="max-h-[300px] overflow-y-scroll scrollbar-hide ">
                        <TagsInput
                            value={keyFeatures}
                            onChange={setKeyFeatures}
                            name="keyFeatures"
                            placeHolder="Enter key features"
                            classNames={{
                              input: "bg-[#23262b]",
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="text-custom-font">Tags</div>
                        <div className="max-h-[100px] overflow-y-scroll scrollbar-hide">
                          <TagsInput
                            value={tag}
                            onChange={setTags}
                            name="tags"
                            placeHolder="Enter tags"
                            classNames={{
                              input: "bg-[#23262b]",
                            }}
                          />
                        </div>
                      </div>
                      
                    </div>
                  )}
                  {tab === "pricing" && (
                    <div className="text-primary-txt">
                      <div className="mb-4">
                        <div className="text-custom-font">Price</div>
                        <div>
                          <Input
                            onChange={(e) => setPrice(+e.target.value)}
                            value={price}
                            className="font-light bg-transparent border-secondary-black focus:outline-none placeholder:text-custom-font"
                            placeholder="Enter price"
                            type="number"
                            min={1}
                          />
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="text-custom-font">Discount</div>
                        <div>
                          <Input
                            onChange={(e) => setDiscount(+e.target.value)}
                            value={discount}
                            className="font-light bg-transparent border-secondary-black focus:outline-none placeholder:text-custom-font"
                            placeholder="Enter Discount"
                            type="number"
                            min={0}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {tab === "inventory" && (
                    <div className="text-primary-txt">
                      <div className="mb-4">
                        <div className="text-custom-font">Quantity</div>
                        <div>
                          <Input
                            onChange={(e) => setQuantity(+e.target.value)}
                            value={quantity}
                            className="font-light bg-transparent border-secondary-black focus:outline-none placeholder:text-custom-font"
                            placeholder="Enter quantity"
                            type="number"
                            min={0}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {tab === "images" && (
                    <div className="text-primary-txt">
                      <div className="mb-4">
                        <div className="border rounded-xl border-dashed border-custom-font h-[100px] flex flex-col justify-center items-center">
                          <div
                            className="flex flex-col justify-center items-center"
                            style={{ pointerEvents: "auto" }}
                          >
                            <CloudinaryUploadImages
                              handleUploadSuccess={handleProductThumbnail}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        {productThumbnail.length > 0 &&
                          // images.map((imageUrl, index) => (
                            <div key={productThumbnail} className="relative">
                              <Image
                                src={makeSecureUrl(productThumbnail)}
                                alt="image"
                                width={90}
                                height={90}
                                loading="lazy"
                              />
                              <div
                                className="absolute top-[-7px] right-[42px]"
                                onClick={() => removeImage(productThumbnail, 'thumbnail')}
                              >
                                <RxCrossCircled
                                  size={18}
                                  color="red"
                                  className="cursor-pointer"
                                />
                              </div>
                            </div>
                          // ))
                          }
                      </div>
                      <div className="mb-4">
                        <div className="border rounded-xl border-dashed border-custom-font h-[100px] flex flex-col justify-center items-center">
                          <div
                            className="flex flex-col justify-center items-center"
                            style={{ pointerEvents: "auto" }}
                          >
                            <CloudinaryUploadImages
                              handleUploadSuccess={handleUploadSuccess}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        {images.length > 0 &&
                          images.map((imageUrl, index) => (
                            <div key={index} className="relative">
                              <Image
                                src={imageUrl}
                                alt="image"
                                width={90}
                                height={90}
                                loading="lazy"
                              />
                              <div
                                className="absolute top-[-7px] right-[42px]"
                                onClick={() => removeImage(imageUrl, "image")}
                              >
                                <RxCrossCircled
                                  size={18}
                                  color="red"
                                  className="cursor-pointer"
                                />
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </TabsContent>
              ))}
            </div>
            <div className="fixed bottom-4 ">
              <Button
                onClick={handleSave}
                size={"sm"}
                className="w-[80px]	bg-secondary-blue border-none hover:bg-secondary-blue rounded-xl mr-4"
              >
                Save
              </Button>
              <Button
                size={"sm"}
                onClick={() => setProductModal(false)}
                className="w-[80px] bg-transparent border border-secondary-black hover:bg-transparent rounded-xl"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export { ProductModal };
