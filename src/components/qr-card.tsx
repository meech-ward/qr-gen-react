import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { useEffect, useState, useRef } from "react";
// import { QRCodeSVG } from 'qrcode.react';
import QRCodeStyling, { type Options } from 'qr-code-styling';
import { Button } from '@/components/ui/button';
import { cn } from "@/lib/utils";

export function QRCodeCard({ text, className, qrOptions, onSave }: { text: string, className?: string, qrOptions: Options, onSave?: () => void }) {
  const [src, setSrc] = useState<string | undefined>(undefined);
  const qrCodeRef = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    if (!text) {
      setSrc(undefined)
      return
    }
    const qrCode = new QRCodeStyling({
      ...qrOptions,
    });
    qrCode.getRawData("webp").then((buffer) => {
      if (!buffer) return;
      // display in img 
      setSrc(URL.createObjectURL(buffer) || "");
    });
    qrCodeRef.current = qrCode;
  }, [text, qrOptions])

  return (
    <CardContainer className={cn(className)}>
      <CardBody className="bg-popover relative group/card dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-white overflow-hidden w-full truncate"
        >
          {text}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          {/* <QRCodeSVG className="w-full h-full " value={text} /> */}
          {src && <img src={src} alt="QR Code" className="w-full h-full" />}
        </CardItem>
        <div className="flex justify-between items-center mt-8">
          <CardItem
            className="w-full flex flex-col gap-y-4"
            translateZ={20}
          >
            <Button
              disabled={!src}
              variant="default"
              className="w-full"
              onClick={() => {
                const qrCode = qrCodeRef.current;
                if (!qrCode) return;
                qrCode.download({ name: "qr", extension: "png" });
              }}
            // className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-colors"
            >
              Download QR Code
            </Button>
            {onSave && <Button
              disabled={!src}
              variant="default"
              className="w-full"
              onClick={() => {
                onSave();
              }}
            >
              Save QR Code
            </Button>}
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}