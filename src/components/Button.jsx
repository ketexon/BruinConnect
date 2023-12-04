import MuiButton, { ButtonProps } from "@mui/material/Button"
import React from "react";

import Link from "next/link"

/**
 * @param {ButtonProps} props
 * @returns {React.ReactNode}
 */
export default function Button(props){
	return <MuiButton
		variant="outlined"
		{
			...props.href ? { component: Link, ...props } : { ...props }
		}
	/>
}