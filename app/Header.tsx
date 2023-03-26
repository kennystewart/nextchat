import { getServerSession } from "next-auth/next";
import HeaderClient from "./HeaderClient";
import { authOptions } from "../pages/api/auth/[...nextauth]";

const Header = async (props) => {
  const session = await getServerSession(authOptions);
  return <HeaderClient session={session} />;
};

export default Header;
