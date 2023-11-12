import ThemeRegistry from "~/styles/ThemeRegistry"
import Nav from "./components/Nav"

export const metadata = {
  title: 'BruinConnect',
}

export default function AppLayout({ children }) {
 return (
    <>
      <Nav/>
      {children}
    </>
  )
}
