import { createFileRoute } from '@tanstack/react-router'
import { useLocalStorage } from "@/lib/useLocalStorage";
import { QRCodeCard } from "@/components/qr-card";

export const Route = createFileRoute('/my-codes')({
  component: Index,
})

function Index() {

  const [allCodes] = useLocalStorage<string[]>("codes", []);
  console.log({allCodes})

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-foreground">All Codes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allCodes?.map((code, index) => (
          <QRCodeCard key={index} text={code} className="w-full h-full" />
        ))}
      </div>
    </div>
  )
}
