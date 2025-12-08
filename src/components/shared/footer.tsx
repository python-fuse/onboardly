import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-solid border-white/10 px-4 sm:px-10 py-8 text-white/70">
      {" "}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {" "}
        <div className="flex flex-col gap-2">
          {" "}
          <h4 className="font-bold text-white mb-2">Product</h4>{" "}
          <a className="hover:text-white transition-colors text-sm" href="#">
            Features
          </a>{" "}
          <a className="hover:text-white transition-colors text-sm" href="#">
            Demo
          </a>{" "}
          <a className="hover:text-white transition-colors text-sm" href="#">
            Pricing
          </a>{" "}
        </div>{" "}
        <div className="flex flex-col gap-2">
          {" "}
          <h4 className="font-bold text-white mb-2">Company</h4>{" "}
          <a className="hover:text-white transition-colors text-sm" href="#">
            About Us
          </a>{" "}
          <a className="hover:text-white transition-colors text-sm" href="#">
            Blog
          </a>{" "}
          <a className="hover:text-white transition-colors text-sm" href="#">
            Contact
          </a>{" "}
        </div>{" "}
        <div className="flex flex-col gap-2">
          {" "}
          <h4 className="font-bold text-white mb-2">Legal</h4>{" "}
          <a className="hover:text-white transition-colors text-sm" href="#">
            Terms of Service
          </a>{" "}
          <a className="hover:text-white transition-colors text-sm" href="#">
            Privacy Policy
          </a>{" "}
        </div>{" "}
        <div className="flex flex-col gap-2">
          {" "}
          <h4 className="font-bold text-white mb-2">Resources</h4>{" "}
          <a className="hover:text-white transition-colors text-sm" href="#">
            Docs
          </a>{" "}
          <a className="hover:text-white transition-colors text-sm" href="#">
            API Reference
          </a>{" "}
          <a className="hover:text-white transition-colors text-sm" href="#">
            Support
          </a>{" "}
        </div>{" "}
      </div>{" "}
      <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm">
        {" "}
        <p>© 2024 Guidely. All rights reserved.</p>{" "}
      </div>{" "}
    </footer>
  );
};

export default Footer;
