"use client";

import { SignIn } from "@clerk/nextjs";
import AuthWrapper from "@/src/components/shared/AuthWrapper";
import "../../../app/globals.css";

export default function LoginPage() {
  return (
    <AuthWrapper>
      <div className="min-h-screen flex items-center justify-center">
        <>
          <div className="w-full max-w-md">
            <SignIn
              routing="hash"
              afterSignInUrl="/dashboard"
              redirectUrl="/dashboard"
            />

            {/* Terms */}
            <p className="mt-6 text-center text-white/40 text-xs">
              By continuing, you agree to our Terms and Privacy Policy
            </p>
          </div>
        </>
      </div>
    </AuthWrapper>
  );
}
