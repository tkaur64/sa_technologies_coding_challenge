import React, { useState } from "react";
import { QUESTIONS } from "./questions";

import QuizEnd from "./QuizEnd";
import QuestionComponent from "./QuestionComponent";

const App = () => {
  const [quizData, setQuizData] = useState({
    questions: Object.keys(QUESTIONS).map((quest) => {
      return { id: parseInt(quest), question: QUESTIONS[quest], answer: null };
    }),
    currentQuestion: 1,
  });
  const [showEndScreen, setShowEndScreen] = useState(false);

  const { questions, currentQuestion } = quizData;

  const handleAnswerClick = (ans) => {
    // function to update the answer as selected by user
    setQuizData((quizData) => {
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

  const handleNextQuestion = () => {
    // handling the next question arrow click
    // if it is the last question show end screen
    if (currentQuestion === questions.length - 1) {
      setShowEndScreen(true);
      let currentOverallScore = parseInt(localStorage.getItem("overallScore"));
      // update overall score by fetching from local storage and adding the current score
      localStorage.setItem(
        "overallScore",
        currentOverallScore +
          quizData.questions.filter((quest) => quest.answer === 1).length
      );
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

  const currentScore = quizData.questions.filter(
    (quest) => quest.answer === 1
  ).length;

  const overallScore = parseInt(localStorage.getItem("overallScore"));

  return (
    <div className="main__wrap">
      <main className="container">
        {showEndScreen ? (
          <QuizEnd currentScore={currentScore} overallScore={overallScore} />
        ) : (
          <>
            <div className="score__container">
              <h4>{`Current Score: ${currentScore}`}</h4>
              <h4>{`Overall Score: ${overallScore}`}</h4>
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
