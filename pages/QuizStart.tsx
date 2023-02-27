import * as React from "react";
import { Container, Typography, Box, Link, Button, RadioGroup, Radio, FormControlLabel } from "@mui/material";
import getQuizInfo from "../src/components/quizInfo";
import { QuickInfo } from "typescript";
import QuizInfoType from "../src/types/quizInfoType";


// 文字を一文字ずつ表示する関数をasyncで実装
const textDispInterval = 100;
const typeText = async (text: string, setText: (text: string) => void) => {
	let i = 0;
	while (i <= text.length) {
		setText(text.slice(0, i));
		i++;
		await new Promise((resolve) => setTimeout(resolve, textDispInterval));
	}
};

// クイズ開始画面
const QuizStart = () => {
	const [show, setShow] = React.useState(false);
	const [subject, setSubject] = React.useState("geography");
	const [counter, setCounter] = React.useState(1);
	const [questionIndex, setQuestionIndex] = React.useState(0);
	const [question, setQuestion] = React.useState("");
	const [anser1, setAnser1] = React.useState("");
	const [anser2, setAnser2] = React.useState("");
	const [anser3, setAnser3] = React.useState("");
	const [anser4, setAnser4] = React.useState("");


  const checkAnser = (event: React.ChangeEvent<HTMLInputElement>) => {
    const quizAnser = (event.target as HTMLInputElement).value;
    const quizInfo = getQuizInfo(subject, counter, questionIndex);
    console.log(subject, counter, questionIndex);
    if (quizAnser === quizInfo.correct) {
      alert("正解！");
    } else {
      alert("不正解！");
    }
  };

  // 画面表示後にクイズ情報を取得
  React.useEffect(() => {
 
    
    const asyncFunc = async () => {
      setSubject(localStorage.getItem("subject") || "geography");
      setCounter(Number(localStorage.getItem("counter") || 1));
      setQuestionIndex(Number(localStorage.getItem("questionIndex") || 0));
      
      // 取得した値をcheckAnserで使用
      const quizInfo = getQuizInfo(subject, counter, questionIndex);
      await typeText(quizInfo.question, setQuestion);

			// 回答表示まで若干スリープ
			const anserDispWaitTime = 500;
			await new Promise((resolve) => setTimeout(resolve, anserDispWaitTime));
			setAnser1(`1. ${quizInfo.anser1}`);
			setAnser2(`2. ${quizInfo.anser2}`);
			setAnser3(`3. ${quizInfo.anser3}`);
			setAnser4(`4. ${quizInfo.anser4}`);
			setShow(true);
		};
		asyncFunc();
	}, []);

  // クイズ情報を表示
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
					<br />
					<Box sx={{ display: show ? "block" : "none" }}>
            <RadioGroup name="quizAnser" onChange={(event)=> checkAnser(event)} >
							<FormControlLabel
								control={<Radio />}
								label={anser1}
								value="1"
							/>
							<FormControlLabel
								control={<Radio />}
								label={anser2}
								value="2"
							/>
							<FormControlLabel
								control={<Radio />}
								label={anser3}
								value="3"
							/>
							<FormControlLabel
								control={<Radio />}
								label={anser4}
								value="4"
							/>
						</RadioGroup>
					</Box>
				</Typography>
			</Box>
		</Container>
	);
};

export default QuizStart;
