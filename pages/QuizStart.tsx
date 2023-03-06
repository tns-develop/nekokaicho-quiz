import * as React from "react";
import Image from "next/image";
import { Container, Typography, Box, Button } from "@mui/material";
import getQuizInfo from "../src/components/quizInfo";
import * as CONS from "../src/common/constants"
import QuizInfoType from "@/types/quizInfoType";

import anserNGImage from "../resources/image/anserNG.png";
import anserOKImage from "../resources/image/anserOK.png";


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
	const [quizInfo, setQuizInfo] = React.useState<QuizInfoType>();
	const [show, setShow] = React.useState(false);
	const [subject, setSubject] = React.useState(CONS.SUBJECT_INIT);
	const [counter, setCounter] = React.useState(CONS.COUNTER_INIT);
	const [questionIndex, setQuestionIndex] = React.useState(CONS.QUESTION_INDEX_INIT);
	const [question, setQuestion] = React.useState("");
	const [anser1, setAnser1] = React.useState("");
	const [anser2, setAnser2] = React.useState("");
	const [anser3, setAnser3] = React.useState("");
	const [anser4, setAnser4] = React.useState("");
	const [showCorrectOK, setShowCorrectOK] = React.useState(false);
	const [showCorrectNG, setShowCorrectNG] = React.useState(false);

  const checkAnser = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const quizAnser = (event.target as HTMLInputElement).value;
    if (quizInfo && quizAnser === quizInfo.correct) {
			setShowCorrectOK(true);
      setShowCorrectNG(false);
    } else {
      setShowCorrectOK(false);
      setShowCorrectNG(true);
    }

		// questionIndexをカウントアップしてQuizStartをもう一度最初から実行
		const anserDispWaitTime = 500;
		await new Promise((resolve) => setTimeout(resolve, anserDispWaitTime));
		setShowCorrectOK(false);
		setShowCorrectNG(false);
		setQuestionIndex(questionIndex+1);
		resetQuizInfo();
		nextQuizInfo(subject, counter, questionIndex);
  };

	// 表示しているクイズ情報をリセットする関数
	const resetQuizInfo = () => {
		setQuestion("");
		setAnser1("");
		setAnser2("");
		setAnser3("");
		setAnser4("");
		setShow(false);
	};
	
	// クイズ情報を取得して表示する関数
	const nextQuizInfo = async (subject: string, counter: number, questionIndex: number) => {
		const quizInfo = getQuizInfo(subject, counter, questionIndex);
		setQuizInfo(quizInfo);
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

  // 画面表示後にクイズ情報を取得
  React.useEffect(() => {
    const asyncFunc = async () => {
      setSubject(localStorage.getItem("subject") || CONS.SUBJECT_INIT);
      setCounter(Number(localStorage.getItem("counter") || CONS.COUNTER_INIT));
      setQuestionIndex(Number(localStorage.getItem("questionIndex") || CONS.QUESTION_INDEX_INIT));
      
			await nextQuizInfo(subject, counter, questionIndex);
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
				{showCorrectOK ? (<Image alt="anserOKImage" src={anserOKImage} width={200} height={200}/>) : null}
				{showCorrectNG ? (<Image alt="anserNGImage" src={anserNGImage} width={200} height={200}/>) : null}
				<Typography variant="h4" component="h1" gutterBottom>
					{question}
					<br />
					<Box sx={{ display: show ? "block" : "none" }}>
						{/* anser1～anser4をMUIのButtonで表示する。ButtonをクリックしたらcheckAnserを呼び出す。*/}
						<Button variant="contained" onClick={checkAnser} value="1">{anser1}</Button>
						<Button variant="contained" onClick={checkAnser} value="2">{anser2}</Button>
						<Button variant="contained" onClick={checkAnser} value="3">{anser3}</Button>
						<Button variant="contained" onClick={checkAnser} value="4">{anser4}</Button>
					</Box>
				</Typography>
			</Box>
		</Container>
	);
};

export default QuizStart;
