"use client";

import { SignUp } from "@clerk/nextjs";
import AuthWrapper from "@/src/components/shared/AuthWrapper";
import "../../../app/globals.css";

export default function SignupPage() {
  return (
    <AuthWrapper>
      <div className="min-h-screen flex items-center justify-center">
        <>
          <style jsx global>{`
            /* Kill Clerk's outer wrapper */
            .cl-rootBox,
            .cl-component {
              background: none !important;
              border: none !important;
              box-shadow: none !important;
              padding: 0 !important;
              margin: 0 !important;
            }

            /* Card Background - Exact match (only the inner card) */
            .cl-card {
              background: linear-gradient(
                to bottom right,
                rgba(255, 255, 255, 0.1),
                rgba(255, 255, 255, 0.05)
              ) !important;
              backdrop-filter: blur(40px) !important;
              border: 1px solid rgba(255, 255, 255, 0.2) !important;
              border-radius: 1.5rem !important;
              padding: 2rem !important;
              box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
            }

            /* Header */
            .cl-headerTitle {
              text-align: center !important;
              font-size: 2.25rem !important;
              font-weight: 700 !important;
              margin-bottom: 0.75rem !important;
              background: linear-gradient(
                to right,
                white,
                rgba(255, 255, 255, 0.7)
              ) !important;
              -webkit-background-clip: text !important;
              background-clip: text !important;
              -webkit-text-fill-color: transparent !important;
            }

            .cl-headerSubtitle {
              text-align: center !important;
              color: rgba(255, 255, 255, 0.6) !important;
              font-size: 1rem !important;
              margin-bottom: 2rem !important;
            }

            /* Form spacing */
            .cl-form {
              display: flex !important;
              flex-direction: column !important;
              gap: 1.25rem !important;
            }

            /* Labels */
            .cl-formFieldLabel {
              display: block !important;
              color: white !important;
              font-size: 0.875rem !important;
              font-weight: 600 !important;
              margin-bottom: 0.5rem !important;
            }

            /* Inputs - Exact match */
            .cl-formFieldInput,
            input.cl-formFieldInput {
              width: 100% !important;
              padding: 0.875rem 1rem !important;
              background-color: rgba(255, 255, 255, 0.1) !important;
              border: 1px solid rgba(255, 255, 255, 0.2) !important;
              border-radius: 0.75rem !important;
              color: white !important;
              transition: all 0.2s !important;
            }

            .cl-formFieldInput::placeholder {
              color: rgba(255, 255, 255, 0.4) !important;
            }

            .cl-formFieldInput:hover {
              background-color: rgba(255, 255, 255, 0.12) !important;
            }

            .cl-formFieldInput:focus {
              outline: 2px solid var(--primary, #3b82f6) !important;
              outline-offset: 0 !important;
              border-color: transparent !important;
            }

            /* Password field with eye icon */
            .cl-formFieldInput[type="password"],
            .cl-formFieldInput__password {
              padding-right: 3rem !important;
            }

            /* Password toggle button */
            .cl-formFieldInputShowPasswordButton {
              position: absolute !important;
              right: 1rem !important;
              top: 50% !important;
              transform: translateY(-50%) !important;
              color: rgba(255, 255, 255, 0.5) !important;
              background: transparent !important;
              border: none !important;
            }

            .cl-formFieldInputShowPasswordButton:hover {
              color: rgba(255, 255, 255, 0.8) !important;
            }

            /* Primary Button - Exact match */
            .cl-formButtonPrimary {
              width: 100% !important;
              margin-top: 1.5rem !important;
              padding: 0.875rem 1rem !important;
              background-color: var(--primary, #3b82f6) !important;
              color: white !important;
              font-weight: 600 !important;
              border-radius: 0.75rem !important;
              border: none !important;
              box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3) !important;
              transition: all 0.2s !important;
            }

            .cl-formButtonPrimary:hover {
              background-color: var(--primary-dark, #2563eb) !important;
              box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3) !important;
            }

            /* Divider */
            .cl-dividerRow {
              position: relative !important;
              margin: 2rem 0 !important;
            }

            .cl-dividerLine {
              background-color: rgba(255, 255, 255, 0.1) !important;
            }

            .cl-dividerText {
              padding: 0 1rem !important;
              color: rgba(255, 255, 255, 0.5) !important;
              font-size: 0.875rem !important;
            }

            /* Social buttons */
            .cl-socialButtonsBlockButton {
              width: 100% !important;
              padding: 0.875rem 1rem !important;
              background-color: rgba(255, 255, 255, 0.1) !important;
              border: 1px solid rgba(255, 255, 255, 0.2) !important;
              border-radius: 0.75rem !important;
              color: white !important;
              font-weight: 500 !important;
              transition: all 0.2s !important;
            }

            .cl-socialButtonsBlockButton:hover {
              background-color: rgba(255, 255, 255, 0.12) !important;
            }

            /* Footer */
            .cl-footer {
              margin-top: 2rem !important;
            }

            .cl-footerActionText {
              text-align: center !important;
              color: rgba(255, 255, 255, 0.6) !important;
              font-size: 0.875rem !important;
            }

            .cl-footerActionLink {
              color: var(--primary, #3b82f6) !important;
              font-weight: 600 !important;
            }

            .cl-footerActionLink:hover {
              color: var(--primary-light, #60a5fa) !important;
            }

            /* Error text */
            .cl-formFieldErrorText {
              color: #f87171 !important;
              font-size: 0.75rem !important;
              margin-top: 0.25rem !important;
            }
            .cl-footerPages__powered,
            .cl-internal-b3fm6y,
            [class*="poweredBy"] {
              display: none !important;
            }

            /* Helper text */
            .cl-formFieldHintText {
              color: rgba(255, 255, 255, 0.6) !important;
              font-size: 0.75rem !important;
            }
          `}</style>

          <div className="w-full max-w-md">
            <SignUp
              routing="hash"
              afterSignUpUrl="/dashboard"
              redirectUrl="/dashboard"
            />
          </div>
        </>
      </div>
    </AuthWrapper>
  );
}
