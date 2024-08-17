import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowRight,
  faCircleArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

function QuestionComponent({
  currentQuestion,
  question,
  handleAnswerClick,
  handleNextQuestion,
  handlePreviousQuestion,
}) {
  // variable to correctly display the question number
  const questionNumberDisplay = `${
    currentQuestion >= 9 ? currentQuestion : `0${currentQuestion}`
  }`;

  return (
    <>
      <h4 className="text__center question__number">{`Question ${questionNumberDisplay}`}</h4>
      <h4 className="text__center question__title">{question.question}</h4>
      <div className="answer-container">
        <FontAwesomeIcon
          icon={faCircleArrowLeft}
          onClick={handlePreviousQuestion}
        />
        <button
          className={question.answer ? "active" : ""}
          onClick={() => handleAnswerClick(1)}
        >
          Yes
        </button>
        <button
          className={!question.answer ? "active" : ""}
          onClick={() => handleAnswerClick(0)}
        >
          No
        </button>
        <FontAwesomeIcon
          icon={faCircleArrowRight}
          onClick={handleNextQuestion}
        />
      </div>
    </>
  );
}

export default QuestionComponent;
