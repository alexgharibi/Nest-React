import React from "react";
import { UsersTable } from "./components/usersTable";
import { CreateUserHeader } from "./components/createUserHeader";

function App() {
  return (
    <div className="flex flex-col items-center">
      <CreateUserHeader />
      <UsersTable />
    </div>
  );
}

export default App;
