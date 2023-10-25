import ThemeRegistry from "~/styles/ThemeRegistry"

export const metadata = {
  title: 'BruinConnect',
}

export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>
        <ThemeRegistry options={{ key: "mui" }}>
          {children}
        </ThemeRegistry>
      </body>
    </html>
  )
}
