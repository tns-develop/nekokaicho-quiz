import * as React from "react";
import Image from "next/image";
import { Container, Typography, Box, Button } from "@mui/material";
import getQuizInfo from "../src/components/quizInfo";
import * as CONS from "../src/common/constants";
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

type stateType = {
	quizInfo: QuizInfoType | null;
	show: boolean;
	subject: string;
	counter: number;
	questionIndex: number;
	question: string;
	anser1: string;
	anser2: string;
	anser3: string;
	anser4: string;
	showCorrectOK: boolean | null;
	showCorrectNG: boolean | null;
};

// クイズ開始画面
const QuizStart = () => {
	const [state, setState] = React.useState<stateType>({
		quizInfo: null,
		show: false,
		subject: CONS.SUBJECT_INIT,
		counter: CONS.COUNTER_INIT,
		questionIndex: CONS.QUESTION_INDEX_INIT,
		question: "",
		anser1: "",
		anser2: "",
		anser3: "",
		anser4: "",
		showCorrectOK: false,
		showCorrectNG: false,
	});

	const updateState = (newState: Partial<typeof state>) => {
		setState((prevState) => ({ ...prevState, ...newState }));
	};

	const checkAnser = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		const quizAnser = (event.target as HTMLInputElement).value;
		const isCorrect = state.quizInfo && quizAnser === state.quizInfo.correct;
		updateState({ showCorrectOK: isCorrect, showCorrectNG: !isCorrect });

		await sleep(500);
		updateState({ showCorrectOK: false, showCorrectNG: false, questionIndex: state.questionIndex + 1 });
		resetQuizInfo();
		nextQuizInfo(state.subject, state.counter, state.questionIndex);
	};

	// 表示しているクイズ情報をリセットする関数
	const resetQuizInfo = () => {
		updateState({ question: "", anser1: "", anser2: "", anser3: "", anser4: "", show: false });
	};

	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

	// クイズ情報を取得して表示する関数
	const nextQuizInfo = async (subject: string, counter: number, questionIndex: number) => {
		const quizInfo = getQuizInfo(subject, counter, questionIndex);
		updateState({ quizInfo });
		await typeText(quizInfo.question, (text) => updateState({ question: text }));

		await sleep(500);
		updateState({
			anser1: `1. ${quizInfo.anser1}`,
			anser2: `2. ${quizInfo.anser2}`,
			anser3: `3. ${quizInfo.anser3}`,
			anser4: `4. ${quizInfo.anser4}`,
			show: true,
		});
	};

	// 画面表示後にクイズ情報を取得
	React.useEffect(() => {
		const fetchData = async () => {
			updateState({
				subject: localStorage.getItem("subject") || CONS.SUBJECT_INIT,
				counter: Number(localStorage.getItem("counter") || CONS.COUNTER_INIT),
				questionIndex: Number(localStorage.getItem("questionIndex") || CONS.QUESTION_INDEX_INIT),
			});

			await nextQuizInfo(state.subject, state.counter, state.questionIndex);
		};
		fetchData();
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
				{state.showCorrectOK && <Image alt="anserOKImage" src={anserOKImage} width={200} height={200} />}
				{state.showCorrectNG && <Image alt="anserNGImage" src={anserNGImage} width={200} height={200} />}
				<Typography variant="h4" component="h1" gutterBottom>
					{state.question}
					<br />
					<Box sx={{ display: state.show ? "block" : "none" }}>
						{/* anser1～anser4をMUIのButtonで表示する。ButtonをクリックしたらcheckAnserを呼び出す。*/}
						<Button variant="contained" onClick={checkAnser} value="1">
							{state.anser1}
						</Button>
						<Button variant="contained" onClick={checkAnser} value="2">
							{state.anser2}
						</Button>
						<Button variant="contained" onClick={checkAnser} value="3">
							{state.anser3}
						</Button>
						<Button variant="contained" onClick={checkAnser} value="4">
							{state.anser4}
						</Button>
					</Box>
				</Typography>
			</Box>
		</Container>
	);
};

export default QuizStart;
