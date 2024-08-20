import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowRight,
  faCircleArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

type QuestionComponentProps = {
  currentQuestion: number;
  question: { id: number; question: string; answer: number | null };
  handleAnswerClick: (ans: number) => void;
  handleNextQuestion: () => void;
  handlePreviousQuestion: () => void;
};

const QuestionComponent: React.FC<QuestionComponentProps> = ({
  currentQuestion,
  question,
  handleAnswerClick,
  handleNextQuestion,
  handlePreviousQuestion,
}) => {
  // variable to correctly display the question number
  const questionNumberDisplay = `${currentQuestion >= 9 ? currentQuestion : `0${currentQuestion}`
    }`;

  return (
    <>
      <h4 className="text__center question__number">{`Question ${questionNumberDisplay}`}</h4>
      <h4 className="text__center question__title">{question.question}</h4>
      <div className="answer-container">
        <FontAwesomeIcon
          icon={faCircleArrowLeft}
          onClick={handlePreviousQuestion}
          data-testid="previous-icon"
        />
        <button
          className={question.answer ? "active" : ""}
          onClick={() => handleAnswerClick(1)}
        >
          Yes
        </button>
        <button
          className={question.answer === 0 ? "active" : ""}
          onClick={() => handleAnswerClick(0)}
        >
          No
        </button>
        <FontAwesomeIcon
          icon={faCircleArrowRight}
          onClick={handleNextQuestion}
          data-testid="next-icon"
        />
      </div>
    </>
  );
}

export default QuestionComponent;
