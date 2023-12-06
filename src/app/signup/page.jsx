import "server-only";
import Form from "./form"

/** @type { import("next").Metadata } */
export const metadata = {
    title: 'Sign Up | BruinConnect',
}

export default function(props){
	return <Form {...props}/>
}