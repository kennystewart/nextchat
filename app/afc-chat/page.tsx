import NoDepositContent from "./NoDepositContent";
import { NoDepositCasinoList } from "./NoDepositCasinoList";
export default async function Nodeposit() {
  return (
    <NoDepositContent>
      {/* @ts-expect-error Async Server Component */}
      <NoDepositCasinoList />
    </NoDepositContent>
  );
}

export const metadata = {
  title: "No Deposit Casinos",
  description: "No deposit casino bonuses",
};
