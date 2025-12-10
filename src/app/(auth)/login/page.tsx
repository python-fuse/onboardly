"use client";

import { SignIn } from "@clerk/nextjs";
import AuthWrapper from "@/src/components/shared/AuthWrapper";
import "../../../app/globals.css";

export default function LoginPage() {
  return (
    <AuthWrapper>
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md">
          {/* Only Google OAuth */}
          <SignIn
            routing="hash"
            afterSignInUrl="/dashboard"
            redirectUrl="/dashboard"
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8",
                headerTitle: "text-3xl font-bold text-white text-center mb-2",
                headerSubtitle: "text-white/60 text-center mb-6",
                socialButtonsBlockButton:
                  "bg-white hover:bg-gray-100 text-gray-900 font-medium py-3 px-4 rounded-xl transition-all",
                socialButtonsBlockButtonText: "font-medium",
                formButtonPrimary:
                  "bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-xl transition-all",
                footerActionLink: "text-purple-400 hover:text-purple-300",
                identityPreviewText: "text-white",
                formFieldLabel: "text-white font-medium",
                formFieldInput:
                  "bg-white/10 border-white/20 text-white rounded-xl",
                dividerLine: "bg-white/20",
                dividerText: "text-white/60",
              },
            }}
          />

          {/* Terms */}
          <p className="mt-6 text-center text-white/40 text-xs">
            By continuing, you agree to our Terms and Privacy Policy
          </p>
        </div>
      </div>
    </AuthWrapper>
  );
}
