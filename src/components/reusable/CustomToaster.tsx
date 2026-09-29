import { FC } from "react";
import { Toaster } from "react-hot-toast";

export const CustomToaster: FC = () => {

  // Styling in toastHelper.tsx

  return (
    <Toaster
      position="top-center"
      gutter={0}
      containerStyle={{
        top: "64px",
        left: 0,
        right: 0,
        bottom: "auto",
        zIndex: 99999,
      }}
    />
  );
};