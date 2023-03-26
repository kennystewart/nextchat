import "../styles/globals.css";
import Header from "./Header";

export const metadata = {
  title: "AllFreeChips",
  description: "TODO: set description",
  icons: ["/favicon.ico"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="bg-white text-sky-700 dark:bg-zinc-800 dark:text-white">
          {/* @ts-expect-error Async Server Component */}
          <Header />
          {children}
          {/* <Footer /> */}
        </div>
      </body>
    </html>
  );
}
