import NotificationTab from "@/components/NotificationTab"
import InteractionCard from "@/components/InteractionCard"
import SecretGenerator from "@/components/SecretGenerator"
import ProofCard from "@/components/ProofCard"

export default function InteractionPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24 md:p-24">
      <NotificationTab />
      <div
        className="page-content flex flex-row gap-20 items-center container w-full "
        style={{ maxWidth: "960px" }}
      >
        <div className="interactioncard-section flex flex-row w-2/4 mt-20">
          <InteractionCard />
        </div>
        <div className=" flex flex-row w-2/4 mt-20">
          <SecretGenerator />
        </div>
      </div>
      <div className=" flex flex-row w-full h-96 mt-20">
        <ProofCard />
      </div>
    </main>
  )
}
