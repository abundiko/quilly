import React from "react";

const AppLoader = ({
  className,
  dotsClass
}: {
  className?: string;
  dotsClass?: string;
}) => {
  return (
    <div
      className={`flex w-full gap-2 py-1 justify-center app-loader ${className}`}
    >
      {[1, 2, 3].map(item =>
        <div
          key={item}
          style={
            {
              "--delay": item
            } as React.CSSProperties
          }
          className={`dot h-3 w-3 app-theme app-bg-opacity rounded-full ${dotsClass}`}
        />
      )}
    </div>
  );
};

export default AppLoader;
