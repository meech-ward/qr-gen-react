import { createFileRoute } from '@tanstack/react-router'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { QRCodeCard } from '@/components/qr-card'

import { type Options } from 'qr-code-styling';
import { useLocalStorage } from "@/lib/useLocalStorage";

import { QROptions } from '@/components/card-options'
import { ColorPicker } from '@/components/color-picker'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const [text, _setText] = useState('')

  const setText = (text: string) => {
    _setText(text)
    setQrOptions(options => ({
      ...options, data: text
    }))
  }

  const [allCodes, setAllCodes] = useLocalStorage<string[]>("codes", []);

  const [qrOptions, setQrOptions] = useState<Options>({
    width: 1000,
    height: 1000,
    type: "svg",
    qrOptions: {
      errorCorrectionLevel: "H",
    },
    dotsOptions: {
      color: "#000000",
      type: "square"
    },
    backgroundOptions: {
      color: "#FFFFFF",
    },
  })

  const generateQRCodes = async () => {
    if (!text) return
    setAllCodes([...allCodes, JSON.stringify(qrOptions)])
    setText('')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-foreground">Create QR Code</h1>
      <Card className="bg-card">
        <CardHeader>
          <CardTitle>QR Code Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="text-input">Enter your text</Label>
            <Input
              id="text-input"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text for QR code"
            />
          </div>

        </CardContent>
      </Card>

      <div className="flex items-center w-full flex-col mt-8">
        <div className="flex items-center justify-center w-full gap-x-8">
          <ColorPicker defaultValue='#000000' onChange={color =>
            setQrOptions(options => ({
              ...options, dotsOptions: {
                ...options.dotsOptions,
                color
              }
            }))
          } />
          <div className="flex flex-col items-center gap-y-8">
            <QROptions onValueChange={(value) => {
              console.log(value)
              setQrOptions(options => ({
                ...options, dotsOptions: {
                  ...options.dotsOptions,
                  type: value
                }
              }))
            }} />
            {<QRCodeCard text={text} qrOptions={qrOptions} onSave={generateQRCodes} />}
          </div>
          <ColorPicker defaultValue='#FFFFFF' onChange={color =>
            setQrOptions(options => ({
              ...options, backgroundOptions: {
                ...options.backgroundOptions,
                color
              }
            }))
          } />
        </div>
      </div>

    </div>
  )
}