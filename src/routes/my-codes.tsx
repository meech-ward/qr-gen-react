import { createFileRoute } from '@tanstack/react-router'
import { useLocalStorage } from "@/lib/useLocalStorage";
import { QRCodeCard } from "@/components/qr-card";

export const Route = createFileRoute('/my-codes')({
  component: Index,
})

function Index() {

  const [allCodes] = useLocalStorage<string[]>("codes", []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-foreground">All Codes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allCodes?.map((code, index) => {
          const qrOptions = JSON.parse(code)
          console.log({qrOptions})
          return <QRCodeCard key={index} text={qrOptions.data} qrOptions={qrOptions} className="w-full h-full" />
        })}
      </div>
    </div>
  )
}
