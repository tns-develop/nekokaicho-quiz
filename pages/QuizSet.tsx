import * as React from "react";
import { Container, Typography, Box, Link, Button, Select, MenuItem } from "@mui/material";

// クイズの条件をselectボックスで選択する画面
const QuizSet = () => {
	// subjectをstateで管理
	const [subject, setSubject] = React.useState("");
	const [counter, setCounter] = React.useState("");
  const startClick = () => {
    localStorage.setItem("subject", subject);
    localStorage.setItem("counter", counter);
  };

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
        <Select
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          label="科目"
        >
          <MenuItem value={"geography"}>地理</MenuItem>
          <MenuItem value={"history"}>歴史</MenuItem>
        </Select>

        <Select
          value={counter}
          onChange={(event) => setCounter(event.target.value)}
          label="学科"
        >
          <MenuItem value={1}>関東地方《地理》</MenuItem>
          <MenuItem value={2}>関東地方《地理》</MenuItem>
        </Select>

        {/* QuizStartへ遷移するボタン */}
        <Link href="/QuizStart" color="secondary" onClick={startClick}>
          <Button color="info" variant="text">
            クイズスタート！
          </Button>
        </Link>

      </Box>
		</Container>
	);
};

export default QuizSet;
