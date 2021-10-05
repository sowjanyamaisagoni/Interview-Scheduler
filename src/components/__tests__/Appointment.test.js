import React from "react";
import { render } from "@testing-library/react"; // The render function allows us to render Components
import Application from "components/Application";

describe("Appointment", () => {
  // A test that renders a React Component
  it("renders without crashing", () => {
    render(<Application />);
  });
});
