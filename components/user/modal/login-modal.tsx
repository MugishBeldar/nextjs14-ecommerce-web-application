"use client";
import { GoogleSignInButton } from "@/components/auth/authButtons";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useAppStore } from "@/store";
// import { CreateAccountForm } from "../create-account/create-account-form";
// import { LoginForm } from "../login/login-form";

const LoginModal = () => {
  const { setOpenModal, openModal } = useAppStore();

  return (
    <div>
      <Dialog open onOpenChange={setOpenModal}>
        <DialogContent className="bg-primary-dark border-none ">
          <DialogHeader>
            <div className="flex items-center justify-center gap-5 text-primary-txt text-4xl" >
              <div>
                <p>logo</p>
              </div>
              <div>
                <p>ABC</p>
              </div>
            </div>
          </DialogHeader>
          <div className="p-4">
            <GoogleSignInButton />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoginModal;
