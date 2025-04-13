import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="p-10 w-full h-[100vh] flex justify-center items-center">
      <SignUp />
    </div>
  );
}
