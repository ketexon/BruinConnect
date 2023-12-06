"use client";

import * as React from "react";

import NextLink from "next/link"

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { useTheme } from "@mui/material/styles"

export default function Appbar() {
	const theme = useTheme();

	return (
		<AppBar position="sticky">
			<Toolbar sx={{ maxHeight: "64px" }}>
				<Stack
					direction="row" gap={1}
					alignItems="center"
					justifyContent="center"
					sx={{ maxHeight: "inherit", padding: 1, width: "100%" }}
				>
					<img src="/logo.webp"
						style={{
							maxHeight: "inherit",
							objectFit: "cover",
							objectPosition: "right",
							paddingTop: theme.spacing(2),
							paddingBottom: theme.spacing(2),
						}}
					></img>
					<Typography variant="h3">
						<span style={{ color: theme.palette.primary.main }}>Bruin</span><span style={{ color: theme.palette.secondary.main }}>Connect</span>
					</Typography>
				</Stack>
			</Toolbar>
		</AppBar>
	)
}