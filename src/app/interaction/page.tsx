import Notificationtab from "@/components/Notificationtab"
import InteractionCard from "@/components/InteractionCard"
import StatisticsCard from "@/components/StatisticsCard"

export default function InteractionPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24 md:p-24">
      <Notificationtab />
      <div
        className="page-content flex flex-col items-center container w-full "
        style={{ maxWidth: "960px" }}
      >
        <div className="interactioncard-section flex flex-row w-2/4 mt-20">
          <InteractionCard />
        </div>

        <div className=" flex flex-row w-2/4 mt-20">
          <StatisticsCard />
        </div>
      </div>
    </main>
  )
}
