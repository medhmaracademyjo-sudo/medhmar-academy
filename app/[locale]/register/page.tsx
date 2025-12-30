"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { registerAction } from "./(actions)/registerAction";
import { newUserSchema } from "@/app/server/users/validators";
import TextInput from "@/components/inputs/TextInput";
import EmailInput from "@/components/inputs/EmailInput";
import { toast } from "sonner";
import PasswordInput from "@/components/inputs/PasswordInput";
import Button2 from "@/components/ui/Button2";
import Button1 from "@/components/ui/Button1";

const clientRegisterSchema = newUserSchema;
type FormValues = z.infer<typeof clientRegisterSchema>;

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(clientRegisterSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      const result = await registerAction(data);
      if (!result.success) {
        toast.error(result.message ?? "Registration failed");
        setLoading(false);
        return;
      }
      const signInResult = await signIn("credentials", {
        callbackUrl: "/",
        email: data.email,
        password: data.password,
      });
      if (signInResult?.error) {
        toast.error(signInResult.error);
        setLoading(false);
        return;
      }
    } catch (err) {
      toast.error("An unexpected error occurred.");
      setLoading(false);
    }
  };
  const handleGoogleSignIn = async () => {
    await signIn("google", { callbackUrl: "/" });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto p-6 bg-white rounded"
    >
        <h1 className="text-2xl flex justify-center border-b-2 border-[#397a34] mb-4 pb-2 dark:text-black">
          Register
        </h1>
      <TextInput
        register={register("first_name")}
        label="First Name"
        error={errors.first_name}
      />
      <TextInput
        register={register("last_name")}
        label="Last Name"
        error={errors.last_name}
      />
      <EmailInput
        register={register("email")}
        label="Email"
        error={errors.email}
      />
      <PasswordInput
        register={register("password")}
        label="Password"
        error={errors.password}
      />
      <PasswordInput
        register={register("confirmPassword")}
        label="Confirm Password"
        error={errors.confirmPassword}
      />
      <Button2 type="submit" disabled={loading} className="w-full px-4 py-2">
        {loading ? "Creating account..." : "Create account"}
      </Button2>

      <div className="my-4 flex items-center gap-4">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs font-bold text-gray-500">OR</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>
      <Button1
        type="button"
        className="w-full mt-3 flex justify-center items-center gap-2 px-5 py-2 text-sm font-medium"
        onClick={handleGoogleSignIn}
      >
        <FcGoogle className="w-5 h-5 " />
        Continue With Google
      </Button1>
    </form>
  );
}
