import "server-only";
import Form from "./form"

/** @type { import("next").Metadata } */
export const metadata = {
    title: 'Update Password | BruinConnect',
}

export default function(props){
	return <Form {...props} />
}