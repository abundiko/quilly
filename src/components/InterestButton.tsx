import React from "react";

type InterestButtonProps = {
  title: string;
  onClick: () => void;
};

export const InterestButton = ({ title, onClick }: InterestButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="app-theme app-borders border rounded-lg py-2 px-3 flex-shrink-0"
    >
      {title}
    </button>
  );
};

export const InterestButtonSelected = ({
  title,
  onClick
}: InterestButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="app-bg-success app-bg-opacity app-borders border rounded-lg py-2 px-3 flex-shrink-0"
    >
      {title}
    </button>
  );
};
