import { auth } from "@/auth";
import { Header, Side } from "@/components/admin";
import { redirect } from "next/navigation";
// import { Toaster } from "sonner";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = (await auth()) as any;
  if (session?.user && session.user.role === "USER") redirect("/");
  return (
    <html lang="en">
      <body className="w-full">
        <div className="flex w-full bg-[#1D1E24]">
          <div className="sticky top-0 ">
            <Side />
          </div>
          <div className="flex flex-col w-full overflow-y-auto">
            <div className="w-full border-b py-1 border-secondary-black mt-2">
              <Header />
            </div>
            <div className="">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
