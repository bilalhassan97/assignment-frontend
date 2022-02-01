import React from "react";

interface Props {
  loading: boolean;
}

const Loader: React.FC<Props> = (props) => {
  const { loading } = props;
  return (
    <>
      {loading && (
        <div className="loaderOverlay top-0 left-0 fixed w-full h-full flex justify-center items-center z-50">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
};
export default Loader;
