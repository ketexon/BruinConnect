import MUILink, { LinkProps } from "@mui/material/Link"
import NextLink from "next/link"

/**
 * @param {LinkProps} props
 * @returns {JSX.Element}
 */
export default function Link(props){
	return <MUILink {...{component: NextLink, ...props}} />
}