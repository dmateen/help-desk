import { Navbar } from "@/components/custom/navbar";
import SignIn from "@/components/signin";
import SignOut from "@/components/signout";
import { auth } from "@/lib/authentication/auth";
import Image from "next/image";

export default async function Home() {
  const session = await auth();
  console.log("==== auth", session);
  return (
    <>
      <Navbar />
    </>
  );
}
