import React, { useState } from "react";
import { QUESTIONS } from "./questions";

import QuizEnd from "./QuizEnd";
import QuestionComponent from "./QuestionComponent";

type Question = {
  id: number,
  question: string,
  answer: number | null;
};
type QuizData = {
  questions: Question[],
  currentQuestion: number,
};
const App: React.FC = () => {
  const [quizData, setQuizData] = useState<QuizData>({
    questions: Object.keys(QUESTIONS).map((quest) => ({
      id: parseInt(quest),
      question: QUESTIONS[parseInt(quest)],
      answer: null,
    })) as Question[],  // Assert this as an array of Question objects
    currentQuestion: 1,
  });
  const [showEndScreen, setShowEndScreen] = useState<boolean>(false);

  const { questions, currentQuestion } = quizData;

  const handleAnswerClick = (ans: number) => {
    // function to update the answer as selected by user
    setQuizData((quizData: QuizData) => {
      return {
        ...quizData,
        questions: quizData.questions.map((quest) => {
          if (quizData.currentQuestion === quest.id) {
            return { ...quest, answer: ans };
          } else {
            return { ...quest };
          }
        }),
      };
    });
  };

  const getOverallScore = () => {
    const overallScore = localStorage.getItem("overallScore")
    return overallScore === null
      ? 0
      : parseInt(overallScore);
  };

  const getCurrentScore = () => {
    return quizData.questions.filter((quest) => quest.answer === 1).length;
  };

  const handleNextQuestion = () => {
    // handling the next question arrow click
    // if it is the last question show end screen
    if (currentQuestion === questions.length) {
      setShowEndScreen(true);
      const currentOverallScore = getOverallScore();
      // update overall score by fetching from local storage and adding the current score
      const newOverallScore = currentOverallScore + getCurrentScore()
      localStorage.setItem("overallScore", String(newOverallScore));
      return;
    }
    setQuizData((quizData) => {
      return {
        ...quizData,
        currentQuestion: quizData.currentQuestion + 1,
      };
    });
  };

  const handlePreviousQuestion = () => {
    // do nothing if it is first question
    if (currentQuestion === 1) {
      return;
    }
    // if not first question go to previous question
    setQuizData((quizData) => {
      return {
        ...quizData,
        currentQuestion: quizData.currentQuestion - 1,
      };
    });
  };

  return (
    <div className="main__wrap">
      <main className="container">
        {showEndScreen ? (
          <QuizEnd
            currentScore={getCurrentScore()}
            overallScore={getOverallScore()}
          />
        ) : (
          <>
            <div className="score__container">
              <h4>{`Current Score: ${getCurrentScore()}`}</h4>
              <h4>{`Overall Score: ${getOverallScore()}`}</h4>
            </div>
            <QuestionComponent
              currentQuestion={currentQuestion}
              question={questions[currentQuestion - 1]}
              handleNextQuestion={handleNextQuestion}
              handlePreviousQuestion={handlePreviousQuestion}
              handleAnswerClick={handleAnswerClick}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default App;
