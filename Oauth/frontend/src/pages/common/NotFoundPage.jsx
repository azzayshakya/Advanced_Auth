import React from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center p-3 lg:w-[100%]">
      <div className="xs:p-3 flex w-full items-center justify-between p-5">
        {/* <AppLogo doNotShowAppName={true} /> */}
        <a href="/help?id=help-on-not-found" className={"text-right"}>
          Help?
        </a>
      </div>

      <div className="-mt-4 flex grow flex-col items-center justify-center gap-3 text-sm md:text-base">
        <ExclamationTriangleIcon className="h-[25%] stroke-1 text-slate-100 opacity-40 md:h-[60%]" />
        <h2 className="text-destructive text-xl">404 - Page Not Found</h2>
        <div className="text-center">
          <p>The page you're looking for could not be found.</p>
        </div>
        <div className="mt-4">
          <Link to="/" className={"text-center"}>
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export { NotFoundPage };
