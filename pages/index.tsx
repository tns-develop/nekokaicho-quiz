import * as React from "react";
import { Container, Typography, Box, Link, Button } from "@mui/material";
import Copyright from "../src/common/Copyright";
import Image from "next/image";
import titleImage from "../resources/image/titleImage.png";

export default function Home() {
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
				<Image src={titleImage} alt="titleImage" width={1260} height={500} />

				<Link href="/quizStart" color="secondary">
					<Button color="info" variant="outlined">
						ねこかいちょークイズ！
					</Button>
				</Link>
				<Copyright />
			</Box>
		</Container>
	);
}
