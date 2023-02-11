import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Copyright from "./Copyright";
import Image from "next/image";
import titleImage from "../../resources/image/titleImage.png";

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
        <Image
          src={titleImage}
          alt="titleImage"
          style={{ width: '100vw', height: '100vh' }}
        />
				<Typography variant="h4" component="h1" gutterBottom>
					ねこかいちょークイズ！
				</Typography>
				<Link href="/linkSample" color="secondary">
					Go to the about page
				</Link>
				<Copyright />
			</Box>
		</Container>
	);
}
