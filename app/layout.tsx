import "../styles/globals.css";
import AuthContext from "./AuthContext";
import Header from "./Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "AllFreeChips",
  description:
    "AllFreeChips is the biggest community with over 30,038+ active members bringing the best online casino bonuses. Latest casino bonus codes of 2022",
  icons: ["/favicon.ico"],
  keywords:
    "Online Casino Guide, 2022 online casinos, Online Casinos, casino bonus codes, Casino Guide, Casino Reviews",
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
          <AuthContext>
            {/* @ts-expect-error Async Server Component */}
            <Header />
          </AuthContext>
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
