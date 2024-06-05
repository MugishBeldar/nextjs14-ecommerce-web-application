import Image from "next/image";
import { CredentialsForm } from "@/components/auth/credentialsForm";

export default function Home() {
  return (
    <div className="flex w-full h-screen justify-center items-center bg-primary-background">
      <div className="hidden lg:visible lg:w-1/2 lg:flex lg:justify-end">
        <Image src="/Login.png" width={580} height={590} alt="login image" />
      </div>
      <div className="h-[90%] md:w-1/2 md:mx-32 flex justify-center items-center  bg-surface rounded-2xl">
        <div className="w-[200px ] px-10 lg:px-0 lg:w-[400px]">
          <h1 className="text-center text-3xl text-[whitesmoke]  font-medium">
            Sign In To Your Account
          </h1>
          <div className="flex flex-col p-10">
            <div className="border-b border-secondary-black"></div>
          </div>
          <CredentialsForm />
        </div>
      </div>
    </div>
  );
}
