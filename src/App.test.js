import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import App from "./App";

// Mock QUESTIONS data
const QUESTIONS = {
  1: "What is 2 + 2?",
  2: "What is the capital of France?",
  3: "What is the square root of 9?",
};

jest.mock("./questions", () => ({
  QUESTIONS,
}));

describe("Quiz App", () => {
  beforeEach(() => {
    localStorage.clear(); // Clear localStorage before each test
  });

  test("renders first question", () => {
    render(<App />);
    expect(screen.getByText("What is 2 + 2?")).toBeInTheDocument();
  });

  test("navigates to next question", () => {
    render(<App />);
    const nextIcon = screen.getByTestId("next-icon");
    fireEvent.click(nextIcon);

    expect(
      screen.getByText("What is the capital of France?")
    ).toBeInTheDocument();
  });

  test("navigates to previous question", () => {
    render(<App />);
    const previousIcon = screen.getByTestId("previous-icon");
    fireEvent.click(previousIcon);
    expect(screen.getByText("What is 2 + 2?")).toBeInTheDocument();
  });

  test("selects an answer and updates current score", () => {
    render(<App />);
    fireEvent.click(screen.getByText("Yes"));

    expect(screen.getByText("Current Score: 1")).toBeInTheDocument();
  });

  test("displays end screen on last question", () => {
    render(<App />);

    // Navigate to the last question
    const nextIcon = screen.getByTestId("next-icon");
    fireEvent.click(nextIcon);
    fireEvent.click(nextIcon);
    fireEvent.click(nextIcon);
    expect(screen.getByText("Quiz has ended!!!")).toBeInTheDocument(); // assuming this is the text on QuizEnd component
  });

  test("saves overall score in local storage", () => {
    render(<App />);

    const nextIcon = screen.getByTestId("next-icon");
    // Select the correct answers for all questions
    fireEvent.click(screen.getByText("Yes"));
    fireEvent.click(nextIcon);
    fireEvent.click(screen.getByText("Yes"));
    fireEvent.click(nextIcon);
    fireEvent.click(screen.getByText("Yes"));
    fireEvent.click(nextIcon);
    // Check if localStorage has been updated
    expect(localStorage.getItem("overallScore")).toBe("3");
  });
});
