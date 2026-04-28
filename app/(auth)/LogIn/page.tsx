"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";

import CircularProgress from "@mui/material/CircularProgress";

import { LoginFormSchema } from "@/src/Schemas/Login.schema";

import { Button } from "@/components/ui/button";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof LoginFormSchema>) {
    console.log(data);

    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    console.log(res);
    if (res?.ok) {
      toast.success("Login successfully");
      router.push("/");
    } else {
      toast.error("Email or Password is incorrect.");
    }
  }

  return (
    <div className="font-[Arial] min-h-screen overflow-hidden bg-linear-to-br from-black via-zinc-950 to-zinc-900 text-white font-(--font-outfit)">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-30 -left-30 h-80 w-80 rounded-full bg-green-500/15 blur-3xl" />

        <div className="absolute -bottom-35 -right-30 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_40%)]" />
      </div>

      

      {/* Main */}
      <main className="flex min-h-screen items-center justify-center px-4 py-24">
        <div className="grid w-full max-w-6xl overflow-hidden rounded-[34px] border border-white/8 bg-white/3 shadow-[0_20px_80px_rgba(0,0,0,0.55)] backdrop-blur-2xl lg:grid-cols-2">
          {/* Left Hero */}
          <div className="relative hidden min-h-190 overflow-hidden lg:flex">
            {/* Background */}
            <div className="absolute inset-0 bg-login-hero bg-cover bg-center" />

            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-br from-green-500/20 via-black/40 to-black" />

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-end p-14">
              <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-green-400/20 bg-green-400/10 px-4 py-2 backdrop-blur-md">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-green-300">
                  Premium Facilities
                </span>
              </div>

              <h2 className="max-w-lg text-5xl font-semibold leading-[1.05] tracking-[-0.04em] text-white">
                Precision in every booking.
              </h2>

              <p className="mt-6 max-w-md text-lg leading-relaxed text-zinc-300">
                Experience the elite standard of court management. Reserve your
                spot in seconds and focus on the game.
              </p>
            </div>
          </div>

          {/* Right Form */}
          <div className="flex items-center justify-center bg-black/20 px-8 py-14 md:px-14">
            <div className="w-full max-w-md">
              {/* Heading */}
              <div className="mb-10">
                <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.04em] leading-tight text-white">
                  Welcome Back 👋
                </h1>

                <p className="mt-4 text-base leading-relaxed text-zinc-400">
                  Login to continue your journey with Sportify.
                </p>
              </div>

              {/* Form */}
              <form
                id="login-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-7"
              >
                {/* Email */}
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="mb-2 text-sm font-medium text-zinc-300">
                        Email Address
                      </FieldLabel>

                      <InputGroup className="h-14 rounded-2xl border border-white/8 bg-white/4 backdrop-blur-md transition-all duration-300 focus-within:border-green-400/60 focus-within:ring-4 focus-within:ring-green-400/10">
                        <InputGroupAddon align="inline-start">
                          <Mail className="size-4 text-zinc-500" />
                        </InputGroupAddon>

                        <InputGroupInput
                          {...field}
                          type="email"
                          placeholder="name@example.com"
                          autoComplete="email"
                          aria-invalid={fieldState.invalid}
                          className="border-0 bg-transparent text-white placeholder:text-zinc-600 focus-visible:ring-0"
                        />
                      </InputGroup>

                      {fieldState.invalid && (
                        <FieldError
                          className="mt-2 text-[13px] font-medium text-orange-200"
                          errors={[fieldState.error]}
                        />
                      )}
                    </Field>
                  )}
                />

                {/* Password */}
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <div className="mb-2 flex items-center justify-between">
                        <FieldLabel className="text-sm font-medium text-zinc-300">
                          Password
                        </FieldLabel>

                        <Link
                          href="/forgot-password"
                          className="text-sm font-medium text-green-400 transition-colors hover:text-green-300"
                        >
                          Forgot password?
                        </Link>
                      </div>

                      <InputGroup className="h-14 rounded-2xl border border-white/8 bg-white/4 backdrop-blur-md transition-all duration-300 focus-within:border-green-400/60 focus-within:ring-4 focus-within:ring-green-400/10">
                        <InputGroupAddon align="inline-start">
                          <LockKeyhole className="size-4 text-zinc-500" />
                        </InputGroupAddon>

                        <InputGroupInput
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          autoComplete="current-password"
                          aria-invalid={fieldState.invalid}
                          className="border-0 bg-transparent text-white placeholder:text-zinc-600 focus-visible:ring-0"
                        />

                        <InputGroupAddon
                          align="inline-end"
                          className="cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <Eye className="size-4 text-zinc-500 transition-colors hover:text-white" />
                          ) : (
                            <EyeOff className="size-4 text-zinc-500 transition-colors hover:text-white" />
                          )}
                        </InputGroupAddon>
                      </InputGroup>

                      {fieldState.invalid && (
                        <FieldError
                          className="mt-2 text-[13px] font-medium text-orange-200"
                          errors={[fieldState.error]}
                        />
                      )}
                    </Field>
                  )}
                />

                {/* Buttons */}
                <div className="flex gap-4 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => form.reset()}
                    className="h-12 flex-1 rounded-xl border border-white/8 bg-white/3 text-zinc-300 transition-all hover:bg-white/6 hover:text-white"
                  >
                    Reset
                  </Button>

                  <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="h-12 flex-1 rounded-xl bg-linear-to-r from-green-500 to-emerald-600 font-semibold text-white shadow-lg shadow-green-500/20 transition-all duration-300 hover:scale-[1.015] hover:shadow-green-500/40 active:scale-[0.99]"
                  >
                    {form.formState.isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <CircularProgress size={18} sx={{ color: "white" }} />
                        Loading...
                      </div>
                    ) : (
                      "Login"
                    )}
                  </Button>
                </div>
              </form>

              {/* Footer */}
              <footer className="mt-10 border-t border-white/8 pt-6 text-center">
                <p className="text-sm text-zinc-400">
                  Don&apos;t have an account?
                  <Link
                    href="/register"
                    className="ml-2 font-semibold text-green-400 transition-colors hover:text-green-300"
                  >
                    Register
                  </Link>
                </p>
              </footer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
