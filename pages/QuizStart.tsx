import * as React from "react";
import { Container, Typography, Box, Link, Button } from "@mui/material";
import getQuizInfo from "../src/components/quizInfo";

// 文字を一文字ずつ表示する関数をasyncで実装
const interval = 100;
const typeText = async (text: string, setText: (text: string) => void) => {
  let i = 0;
  while (i < text.length) {
    setText(text.slice(0, i));
    i++;
    await new Promise((resolve) => setTimeout(resolve, interval));
  }
};

// クイズ開始画面
const QuizStart = () => {
  
  const [question, setQuestion] = React.useState("");
  React.useEffect(async () => {
    const subject = localStorage.getItem("subject");
    const counter = Number(localStorage.getItem("counter"));
    const quizInfo = getQuizInfo(subject, counter);
    const index = 1;
    
    await typeText(quizInfo[index].question, setQuestion);
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
          {question}
        </Typography>
			</Box>
		</Container>
  );
};

// getStaticPropsでsubjectとcounterを受け取る
// export async function getStaticProps() {
//   localStorage.setItem("subject", "math");
//   localStorage.setItem("counter", "1");
//   const subject = localStorage.getItem("subject");
//   const counter = localStorage.getItem("counter");
//   return {
//     props: {
//       subject,
//       counter,
//     },
//   };
// }

export default QuizStart;