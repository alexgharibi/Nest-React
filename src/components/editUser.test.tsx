import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { SWRConfig } from "swr";
import { EditUser } from "./editUser";
import { useEditUser } from "../api/editUser";

// Mock the useEditUser hook
jest.mock("../api/editUser");

describe("EditUser", () => {
  beforeEach(() => {
    (useEditUser as jest.Mock).mockReturnValue({
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
        <EditUser id={1} fullName="John Doe" />
      </SWRConfig>
    );

    // Check if the "Edit" button is rendered
    expect(screen.getByText("Edit")).toBeInTheDocument();
  });

  it("should display 'User Edited' message after successful form submission", async () => {
    render(
      <SWRConfig value={{ provider: () => new Map() }}>
        <EditUser id={1} fullName="John Doe" />
      </SWRConfig>
    );

    fireEvent.click(screen.getByText("Edit"));

    const fullNameInput = screen.getByLabelText(/^FullName/i);
    fireEvent.change(fullNameInput, { target: { value: "John" } });

    const userNameInput = screen.getByLabelText(/^UserName/i);
    fireEvent.change(userNameInput, { target: { value: "Allan" } });

    fireEvent.click(screen.getAllByText("Edit")[1]);

    // Check if the "User Created" message is displayed
    const userCreatedMessage = await screen.findByText("User Edited");
    expect(userCreatedMessage).toBeInTheDocument();
  });

  it("should display form validation error", async () => {
    render(
      <SWRConfig value={{ provider: () => new Map() }}>
        <EditUser id={1} fullName="John Doe" />
      </SWRConfig>
    );

    fireEvent.click(screen.getByText("Edit"));

    fireEvent.click(screen.getAllByText("Edit")[1]);

    expect(await screen.findByText("User name is missing")).toBeInTheDocument();
  });

  it("should close the modal after clicking 'Close'", () => {
    render(
      <SWRConfig value={{ provider: () => new Map() }}>
        <EditUser id={1} fullName="John Doe" />
      </SWRConfig>
    );

    fireEvent.click(screen.getByText("Edit"));

    // Click the "Close" button
    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);

    // Check if the modal is closed
    const modal = screen.queryByText("Edit a user");
    expect(modal).not.toBeInTheDocument();
  });
});
