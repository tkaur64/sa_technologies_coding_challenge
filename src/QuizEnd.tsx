import React from "react";

type QuizEndProps = {
  currentScore: number;
  overallScore: number;
};


const QuizEnd: React.FC<QuizEndProps> = ({ currentScore, overallScore }) => {
  return (
    <div className="end__screen">
      <h4>Quiz has ended!!!</h4>
      <h4>{`Current Score: ${currentScore}`}</h4>
      <h4>{`Overall Score: ${overallScore}`}</h4>
    </div>
  );
};

export default QuizEnd;
