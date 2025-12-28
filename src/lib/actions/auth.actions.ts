"use server";

import { auth } from "@/lib/better-auth/auth";
import { inngest } from "@/lib/inngest/client";
import { headers } from "next/headers";

export const signUpWithEmail = async ({
  fullName,
  email,
  password,
  preferredIndustry,
  country,
  riskTolerance,
  investmentGoals,
}: SignUpFormData) => {
  try {
    // signUp
    const response = await auth?.api.signUpEmail({
      body: { name: fullName, password, email },
    });

    if (response) {
      // trigger the inngest function
      await inngest.send({
        name: "app/user.created",
        data: {
          email,
          name: fullName,
          country,
          investmentGoals,
          preferredIndustry,
          riskTolerance,
        },
      });
    }

    return { success: true, data: response };
  } catch (error) {
    console.log(`Sign Up Failed`, error);
    return { success: false, error };
  }
};

export const signInWithEmail = async ({ email, password }: SignInFormData) => {
  try {
    const response = await auth?.api.signInEmail({
      body: { password, email },
    });

    return { success: true, data: response };
  } catch (error) {
    console.log(`Sign In Failed`, error);
    return { success: false, error };
  }
};

export const signOut = async () => {
  try {
    await auth.api.signOut({ headers: await headers() });
  } catch (error) {
    console.error("Signout Failed", error);
    return { success: false, error };
  }
};
