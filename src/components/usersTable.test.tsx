import { render, screen, waitFor } from "@testing-library/react";
import { UsersTable } from "./usersTable";
import { useGetAllUsers } from "../api/getAllUsers";

// Mock the useGetAllUsers hook
jest.mock("../api/getAllUsers");

describe("UsersTable", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("displays loading spinner when data is loading", () => {
    // Mock loading state
    (useGetAllUsers as jest.Mock).mockImplementation(() => ({
      isLoading: true,
      data: undefined,
    }));

    render(<UsersTable />);

    // Assert that the loading spinner is displayed
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("displays 'No User is available' when no users are found", () => {
    // Mock empty data
    (useGetAllUsers as jest.Mock).mockImplementation(() => ({
      isLoading: false,
      data: { results: [] },
    }));

    render(<UsersTable />);

    // Assert that the no-user message is displayed
    expect(screen.getByText("No User is available")).toBeInTheDocument();
  });

  test("displays the table with user data when users are found", () => {
    // Mock data with some users
    (useGetAllUsers as jest.Mock).mockImplementation(() => ({
      isLoading: false,
      data: {
        results: [
          {
            id: 1,
            fullName: "John Doe",
            previousValue: null,
            newValue: null,
            timestamp: "2024-04-20",
            userName: "johndoe",
          },
        ],
      },
    }));

    render(<UsersTable />);

    // Assert that the table is displayed with the user data
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("johndoe")).toBeInTheDocument();
    expect(screen.getByText("2024-04-20")).toBeInTheDocument();
  });
});
