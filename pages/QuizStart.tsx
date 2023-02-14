import * as React from "react";
import { Container, Typography, Box, Link, Button } from "@mui/material";
import getQuizInfo from "../src/components/quizInfo";

// 文字を一文字ずつ表示する関数
const interval = 100;
const typeText = (text: string, setText: (text: string) => void) => {
  let i = 0;
  const timer = setInterval(() => {
    setText(text.slice(0, i));
    i++;
    if (i > text.length) {
      clearInterval(timer);
    }
  }, interval);
}

// クイズ開始画面
const QuizStart = () => {
  const quizInfo = getQuizInfo("history", "1");
  const index = Math.floor(Math.random() * quizInfo.length);
  // console.log(`index: ${index} quizInfo.length: ${quizInfo.length}`);
  // console.log(quizInfo[index]);
  const [text, setText] = React.useState(quizInfo[index].question);
  React.useEffect(() => {
    typeText(text, setText);
  }, []);
  return (
		<Container maxWidth="lg">
			<Box
				sx={{
					my: 4,
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					height: "100vh",
				}}
			>
        <Typography variant="h4" component="h1" gutterBottom>
          {text}
        </Typography>
			</Box>
		</Container>
  );
};

export default QuizStart;