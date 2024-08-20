import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import QuestionComponent from "./QuestionComponent";

describe("QuestionComponent", () => {
  const mockHandleAnswerClick = jest.fn();
  const mockHandleNextQuestion = jest.fn();
  const mockHandlePreviousQuestion = jest.fn();

  const question = {
    id: 1,
    question: "What is 2 + 2?",
    answer: null,
  };

  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock calls between tests
  });

  test("Renders the question number correctly", () => {
    render(
      <QuestionComponent
        currentQuestion={1}
        question={question}
        handleAnswerClick={mockHandleAnswerClick}
        handleNextQuestion={mockHandleNextQuestion}
        handlePreviousQuestion={mockHandlePreviousQuestion}
      />
    );

    expect(screen.getByText("Question 01")).toBeInTheDocument();
  });

  test("Renders the question correctly", () => {
    render(
      <QuestionComponent
        currentQuestion={1}
        question={question}
        handleAnswerClick={mockHandleAnswerClick}
        handleNextQuestion={mockHandleNextQuestion}
        handlePreviousQuestion={mockHandlePreviousQuestion}
      />
    );

    expect(screen.getByText("What is 2 + 2?")).toBeInTheDocument();
  });

  test("Calls handleNextQuestion when right arrow icon is clicked", () => {
    render(
      <QuestionComponent
        currentQuestion={1}
        question={question}
        handleAnswerClick={mockHandleAnswerClick}
        handleNextQuestion={mockHandleNextQuestion}
        handlePreviousQuestion={mockHandlePreviousQuestion}
      />
    );

    const nextIcon = screen.getByTestId("next-icon");
    fireEvent.click(nextIcon);

    expect(mockHandleNextQuestion).toHaveBeenCalledTimes(1);
  });

  test("Calls correct method when Yes is clicked", () => {
    render(
      <QuestionComponent
        currentQuestion={1}
        question={question}
        handleAnswerClick={mockHandleAnswerClick}
        handleNextQuestion={mockHandleNextQuestion}
        handlePreviousQuestion={mockHandlePreviousQuestion}
      />
    );

    const yesButton = screen.getByText("Yes");
    fireEvent.click(yesButton);

    expect(mockHandleAnswerClick).toHaveBeenCalledWith(1);
    expect(mockHandleAnswerClick).toHaveBeenCalledTimes(1);
  });

  test("Active class applied correctly when Yes is clicked", () => {
    const answeredQuestion = { ...question, answer: 1 }; // Mock question with selected answer

    render(
      <QuestionComponent
        currentQuestion={1}
        question={answeredQuestion}
        handleAnswerClick={mockHandleAnswerClick}
        handleNextQuestion={mockHandleNextQuestion}
        handlePreviousQuestion={mockHandlePreviousQuestion}
      />
    );

    const yesButton = screen.getByText("Yes");
    const noButton = screen.getByText("No");

    expect(yesButton).toHaveClass("active");
    expect(noButton).not.toHaveClass("active");
  });
});
