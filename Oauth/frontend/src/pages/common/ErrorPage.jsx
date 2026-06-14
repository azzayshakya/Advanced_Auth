import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div className="flex h-screen w-full flex-col items-center p-3 lg:w-[100%]">
      <div className="flex w-full items-center justify-between p-5 xs:p-3">
        <a
          href="/help?id=help-on-error"
          className={ "text-right"}
        >
          Help?
        </a>
      </div>

      <div className="-mt-4 flex grow flex-col items-center justify-center gap-3 text-sm md:text-base">
        <ExclamationTriangleIcon className="h-[25%] stroke-1 text-slate-100 opacity-40 md:h-[60%]" />
        <h2 className="text-xl text-destructive">Error!</h2>
        <div className="text-center">
          {error.statusText || error.message ? (
            <p>{error.statusText || error.message}</p>
          ) : (
            <p>Something went wrong</p>
          )}
        </div>
      </div>

    </div>
  );
};

export { ErrorPage };


