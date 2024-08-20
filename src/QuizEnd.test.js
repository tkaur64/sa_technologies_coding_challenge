import React from "react";
import { render, screen } from "@testing-library/react";
import QuizEnd from "./QuizEnd";

describe("QuizEnd Component", () => {
  test("Renders the end screen message", () => {
    render(<QuizEnd currentScore={5} overallScore={15} />);
    expect(screen.getByText("Quiz has ended!!!")).toBeInTheDocument();
  });

  test("Renders the correct current and overall score", () => {
    render(<QuizEnd currentScore={8} overallScore={20} />);
    expect(screen.getByText("Current Score: 8")).toBeInTheDocument();
    expect(screen.getByText("Overall Score: 20")).toBeInTheDocument();
  });
});
