import "../styles/globals.css";
import AuthContext from "./AuthContext";

export default function RootLayout({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body>
        <AuthContext>{children}</AuthContext>
      </body>
    </html>
  );
}
