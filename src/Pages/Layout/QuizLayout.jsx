import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { useGetQuizSessionByIdQuery } from "../../Redux/RTK/QuizAPI/QuizAPI";

const QuizLayout = () => {
  return <Outlet />;
};

export default QuizLayout;
