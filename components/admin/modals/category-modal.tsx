import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CategoryTypes, CategoryWithProductCount } from "@/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAppStore } from "@/store";
import { getAllCategorisWithProductCount, getCategories, updateCategory } from "@/actions/category";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CategoryModalProps {
  setCategoryModal: Dispatch<SetStateAction<boolean>>;
  categoryModal: boolean;
}

export const CategoryModal = ({
  setCategoryModal,
  categoryModal,
}: CategoryModalProps) => {
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const { setCategoriesData, viewingCategoryId } = useAppStore();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    async function getCategoriesProduct() {
      const result = await getAllCategorisWithProductCount();
      const categoryDetails = result.find((c) => c.id === viewingCategoryId);
      if (categoryDetails) {
        categoryDetails;
        setNewCategoryName(categoryDetails?.categoryName);
      }
    }
    getCategoriesProduct();
  }, [viewingCategoryId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategoryName(e.target.value);
  };

  const handleSave = async () => {
    const { error, success } = await updateCategory(
      newCategoryName,
      viewingCategoryId
    );
    if (error) {
      toast.error("Please provide a unique category name.");
      setCategoryModal(false);
    }
    if (success) {
      toast.success("Category updated successfully");
      setCategoryModal(false);
    }
    const response = await getCategories();
    if (response && response.length) {
      setCategoriesData(response);
    }
  };

  if (!isMounted) {
    return null;
  }
  return (
    <div className="z-50">
      <Dialog open={categoryModal} onOpenChange={setCategoryModal}>
        <DialogContent className="bg-surface border border-secondary-black">
          <DialogHeader>
            <DialogTitle className="text-xl text-primary-text">
              Edit Category
            </DialogTitle>
            <DialogDescription className="text-white">
              <div className="mt-3">
                <p className="text-custom-font">Category Name</p>
                <Input
                  type="text"
                  className="mb-5 mt-2 bg-transparent border-secondary-black focus:outline-none placeholder:text-custom-font"
                  value={newCategoryName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Button
                  size={"sm"}
                  onClick={handleSave}
                  className="w-1/4 bg-secondary-blue border-none hover:bg-secondary-blue rounded-xl mr-4"
                >
                  Save
                </Button>
                <Button
                  size={"sm"}
                  onClick={() => setCategoryModal(false)}
                  className="w-1/4 bg-transparent border border-secondary-black hover:bg-transparent rounded-xl"
                >
                  Cancel
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

