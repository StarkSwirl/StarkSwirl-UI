
import InteractionCard from "@/components/InteractionCard"

export default function InteractionPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24 md:p-24">
      <div
        className="page-content flex flex-col items-center container w-full "
        style={{ maxWidth: "960px" }}
      >
        <div className="interactioncard-section w-2/4 mt-20">
          <InteractionCard />
        </div>
      </div>
    </main>
  )
}
