import { render, fireEvent, screen } from "@testing-library/react";
import { ActionButton } from "./actionButton";

describe("ActionButton", () => {
  const handleClick = jest.fn();
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("renders a regular button and handles click events", () => {
    render(
      <ActionButton
        text="Click me"
        extraClass="test-class"
        onClick={handleClick}
      />
    );

    const button = screen.getByText("Click me");

    // Check if the button is rendered
    expect(button).toBeInTheDocument();

    // Check if the extra class is applied
    expect(button).toHaveClass("test-class");

    // Simulate a click event
    fireEvent.click(button);

    // Check if the click event is handled
    expect(handleClick).toHaveBeenCalled();
  });

  test("renders a loading button when withLoading is true and handles loading state", () => {
    render(
      <ActionButton
        text="Loading..."
        extraClass="loading-class"
        onClick={handleClick}
        withLoading={true}
        isLoading={false}
      />
    );

    const loadingButton = screen.getByText("Loading...");

    // Check if the loading button is rendered
    expect(loadingButton).toBeInTheDocument();

    // Check if the extra class is applied
    expect(loadingButton).toHaveClass("loading-class");

    // Simulate a click event (although it might be ignored if loading)
    fireEvent.click(loadingButton);

    // Check if the click event is handled
    expect(handleClick).toHaveBeenCalled();
  });
});
