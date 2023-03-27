import { PrismaClient } from "@prisma/client";
import BonusFilter from "../../components/functions/bonusfilter";
import CasinoDisplayList from "../../components/CasinoDisplayList";

const prisma = new PrismaClient();
async function getCasinos() {
  const data = await prisma.casino_p_casinos.findMany({
    where: {
      approved: 1,
      rogue: 0,
      bonuses: {
        some: {
          nodeposit: { gt: 0 },
          freespins: { lt: 1 },
        },
      },
    },
    select: {
      id: true,
      clean_name: true,
      casino: true,
      hot: true,
      new: true,
      button: true,
      bonuses: {
        orderBy: [{ nodeposit: "desc" }, { deposit: "desc" }],
      },
    },
    orderBy: [{ hot: "desc" }, { new: "desc" }],
    take: 25,
  });

  const bdata: any[] = data.filter((p) => p.bonuses.length > 0);
  const bonus = BonusFilter(bdata);
  return bonus;
}

export async function NoDepositCasinoList() {
  const casinos = await getCasinos();
  return <CasinoDisplayList data={casinos} />;
}
