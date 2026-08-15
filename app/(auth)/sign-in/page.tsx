"use client";

import AuthForm from "@/components/AuthForm";
import { signInSchema } from "@/lib/validation";

// ponytail: no auth backend wired yet — swap for a server action once db/auth lands.
const SignIn = () => (
  <AuthForm
    type="SIGN_IN"
    schema={signInSchema}
    defaultValues={{ email: "", password: "" }}
    onSubmit={async () => ({
      success: false,
      error: "Sign in is not wired up yet",
    })}
  />
);

export default SignIn;
