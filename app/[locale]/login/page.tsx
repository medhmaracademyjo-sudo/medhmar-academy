"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";
import { loginSchema } from "@/app/server/users/validators";
import { toast } from "sonner";
import PasswordInput from "@/components/inputs/PasswordInput";
import EmailInput from "@/components/inputs/EmailInput";
type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        callbackUrl:"/",
        email: data.email,
        password: data.password,
      });
      if (result?.ok) {
        toast.error("Invalid email or password. Please try again.");
      }
    } catch (err) {
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleSignIn = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <main>
      <form
        className="max-w-lg mx-auto shadow-lg shadow-slate-500/50 p-7 rounded-lg bg-white dark:bg-gray-300 mt-28 mb-20"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl flex justify-center border-b-2 border-[#676e32] mb-4 pb-2 dark:text-black">
          Login
        </h1>
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
        <button
          disabled={loading}
          type="submit"
          className="text-white bg-[#676e32] hover:bg-[#848e38] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full px-5 py-2.5 text-center cursor-pointer"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <Link
          href="/forgot-password"
          className="block pt-4 text-center text-sm text-[#676e32] underline-offset-4 hover:underline m-2"
        >
          Forgot your password?
        </Link>

        <div className="my-2 flex w-auto items-center">
          <div className="bg-border h-px flex-1"></div>
          <span className="mx-2 font-black text-[#676e32]">OR</span>
          <div className="bg-border h-px flex-1"></div>
        </div>
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full mt-3 flex justify-center cursor-pointer items-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200"
        >
          <FcGoogle className="w-5 h-5" />
          Login with Google
        </button>
        <Link
          href="/register"
          className="block pt-4 text-center text-sm underline-offset-4 text-[#676e32] hover:underline m-2"
        >
          Don`t have an account?
        </Link>
      </form>
    </main>
  );
};

export default Login;
