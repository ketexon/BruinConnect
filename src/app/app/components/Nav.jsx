"use client";

import * as React from "react";

import NextLink from "next/link"

import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import HomeIcon from "@mui/icons-material/Home"
import MessageIcon from "@mui/icons-material/Message"
import HeartIcon from "@mui/icons-material/Favorite"
import ProfileIcon from "@mui/icons-material/AccountCircle"

/**
 * @typedef {Object} Page
 * @property {string} label
 * @property {string} url
 * @property {React.ReactNode} icon
 */

/**
 * @type {Page[]}
 */
const PAGES = [
	{
		label: "Connections",
		url: "/app/connections",
		icon: <MessageIcon />,
	},
	{
		label: "Home",
		url: "/app",
		icon: <HomeIcon />,
	},
	{
		label: "Swipe",
		url: "/app/swipe",
		icon: <HeartIcon />,
	},
	{
		label: "Profile",
		url: "/app/profile",
		icon: <ProfileIcon />,
	},
]

export default function Nav() {
	const [value, setValue] = React.useState(null)

	React.useEffect(() => {
		setValue(Math.max(PAGES.findIndex(({ url }) => url === window.location.pathname), 0));
	}, [])

	return (
		<Paper sx={{
			position: "fixed",
			bottom: 0, left: 0, right: 0,
		}}>
			<BottomNavigation
				showLabels
				value={value}
				onChange={(e, newValue) => void (setValue(newValue))}
			>
				{PAGES.map(({ label, url, icon }, i) => (
					<BottomNavigationAction
						key={i}
						label={label}
						href={url}
						icon={icon}
						LinkComponent={NextLink}
					/>
				))}
			</BottomNavigation>
		</Paper>
	)
}