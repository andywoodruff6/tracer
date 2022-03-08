import React from "react";

export const Footer = () => {
  return (
    <>
      <div className="block sm:flex sm:justify-around">
        <div className=" pb-4 sm:p-4">
          <div className="flex justify-center rounded-2xl bg-white py-5 px-7 sm:px-2">
            <a href="https://github.com/andywoodruff6/tracer" target="blank">
              <h5 className="font-mono text-lg font-semibold sm:text-2xl">
                Github Repo
              </h5>
            </a>
            <img src="../Assets/GitHub-Mark-32px.png" alt="GitHub-Mark" />
          </div>
        </div>
        <div className="pb-4 sm:p-4">
          <div className="flex justify-center rounded-2xl bg-white py-5 px-7 sm:px-2">
            <h5 className="font-mono text-lg font-semibold sm:text-2xl">
              Built by:
            </h5>
            <h5 className="pl-1 font-mono text-xl font-semibold sm:text-2xl">
              {" "}
              THENEWBADGER.crypto
            </h5>
          </div>
        </div>
      </div>
    </>
  );
};
