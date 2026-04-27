import { SignupForm } from "@/components/signup-form";

export default function SignupPage() {
  return (
    <div className="flex w-full items-center justify-center mt-2 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  );
}
