import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { SWRConfig } from "swr";
import { CreateUserHeader } from "./createUserHeader";
import { useCreateUser } from "../api/createUser";

// Mock the useCreateUser hook
jest.mock("../api/createUser");

describe("CreateUserHeader", () => {
  beforeEach(() => {
    (useCreateUser as jest.Mock).mockReturnValue({
      trigger: jest.fn(),
      isMutating: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", () => {
    render(
      <SWRConfig value={{ provider: () => new Map() }}>
        <CreateUserHeader />
      </SWRConfig>
    );

    // Check if the "Create User" button is rendered
    expect(screen.getByText("Create User")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Create User"));

    // Check if the modal is rendered
    expect(screen.getByText("Create")).toBeInTheDocument();
  });

  it("should display 'User Created' message after successful form submission", async () => {
    render(
      <SWRConfig value={{ provider: () => new Map() }}>
        <CreateUserHeader />
      </SWRConfig>
    );

    fireEvent.click(screen.getByText("Create User"));

    // Fill the FullName input field
    const fullNameInput = screen.getByLabelText(/^FullName/i);
    fireEvent.change(fullNameInput, { target: { value: "John Doe" } });

    // Click the "Create" button
    const createButton = screen.getByText("Create");
    fireEvent.click(createButton);

    // Check if the "User Created" message is displayed
    const userCreatedMessage = await screen.findByText("User Created");
    expect(userCreatedMessage).toBeInTheDocument();
  });

  it("should display form validation error", async () => {
    render(
      <SWRConfig value={{ provider: () => new Map() }}>
        <CreateUserHeader />
      </SWRConfig>
    );

    fireEvent.click(screen.getByText("Create User"));

    // Click the "Create" button
    const createButton = screen.getByText("Create");
    fireEvent.click(createButton);

    expect(await screen.findByText("Full name is missing")).toBeInTheDocument();
  });

  it("should close the modal after clicking 'Close'", () => {
    render(
      <SWRConfig value={{ provider: () => new Map() }}>
        <CreateUserHeader />
      </SWRConfig>
    );

    // Click the "Create User" button to open the modal
    const createUserButton = screen.getByText("Create User");
    fireEvent.click(createUserButton);

    // Click the "Close" button
    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);

    // Check if the modal is closed
    const modal = screen.queryByText("Create a user");
    expect(modal).not.toBeInTheDocument();
  });
});
