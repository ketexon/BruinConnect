import MUIContainer, { ContainerProps } from "@mui/material/Container"


/**
 *
 * @param { ContainerProps } props
 * @returns {JSX.Element}
 */
export default function Container({ children, ...props }){
	return <MUIContainer {...{
		maxWidth: "sm",
		...props
	}}>{children}</MUIContainer>
}