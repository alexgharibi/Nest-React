import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { FC } from "react";

interface ActionButtonProps {
  text: string;
  extraClass?: string;
  onClick: () => void;
  withLoading?: boolean;
  isLoading?: boolean;
}

export const ActionButton: FC<ActionButtonProps> = ({
  text,
  extraClass,
  onClick,
  withLoading = false,
  isLoading = false,
}) => {
  if (withLoading) {
    return (
      <LoadingButton
        className={`font-Spectral transition duration-300 ease-in-out transform hover:scale-105 active:scale-95 px-5 ${extraClass}`}
        onClick={onClick}
        loading={isLoading}
        variant="contained"
      >
        {text}
      </LoadingButton>
    );
  }
  return (
    <Button
      className={`font-Spectral transition duration-300 ease-in-out transform hover:scale-105 active:scale-95 px-5 ${extraClass}`}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};
