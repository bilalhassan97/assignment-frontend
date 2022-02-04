import React from "react";

import { icons } from "assets";

interface Props {
  src: string;
  onClick?: any;
  className?: string;
  style?: object;
}

const ImageAsset: React.FC<Props> = (props) => {
  const { src, className, onClick, style } = props;
  return (
    <img
      alt="icon"
      src={icons[src]}
      className={`${className}`}
      onClick={onClick}
      style={style}
    />
  );
};

export default ImageAsset;
