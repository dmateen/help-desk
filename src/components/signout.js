import { signOut } from "@/lib/authentication/auth";

export default function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button type="submit">Signout</button>
    </form>
  );
}
