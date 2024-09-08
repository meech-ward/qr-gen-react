import { createFileRoute } from '@tanstack/react-router'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { QRCodeCard } from '@/components/qr-card'
import { Upload, Image as ImageIcon, Loader2 } from 'lucide-react';

import {useLocalStorage} from "@/lib/useLocalStorage";


export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const [text, setText] = useState('')
  const [image, setImage] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const [allCodes, setAllCodes] = useLocalStorage<string[]>("codes", []);


  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    const reader = new FileReader()
    reader.onload = (event) => {
      setImage(event.target?.result as string)
    }
    reader.readAsDataURL(file)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': [] }, maxFiles: 1 })

  const generateQRCodes = async () => {
    if (!text) return
    setAllCodes([...allCodes, text])
    setText('')
    setIsGenerating(true)
    // Add your QR code generation logic here
    setIsGenerating(false)
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
          {/* <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-md p-6 text-center transition-colors duration-200 ease-in-out ${
              isDragActive ? 'border-primary bg-primary/10' : 'border-border'
            }`}
          >
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
              <div className="flex text-sm text-muted-foreground justify-center">
                <label htmlFor="file-upload" className="relative cursor-pointer font-medium text-primary hover:text-primary/80">
                  <span>Upload a file</span>
                  <input {...getInputProps()} />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div> */}
          {image && (
            <div className="flex justify-center">
              <div className="relative w-40 h-40 rounded-lg overflow-hidden">
                <img src={image} alt="Uploaded" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
                  <ImageIcon className="h-8 w-8 text-foreground" />
                </div>
              </div>
            </div>
          )}
          <Button
            onClick={generateQRCodes}
            className="w-full"
            disabled={isGenerating || (!text && !image)}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Save QR Code'
            )}
          </Button>
        </CardContent>
      </Card>

      {text && <QRCodeCard text={text} />}
    </div>
  )
}