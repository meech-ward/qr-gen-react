import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { cn } from "@/lib/utils";

export function QRCodeCard({ text, className }: { text: string, className?: string }) {
  return (
    <CardContainer className={cn(className)}>
      <CardBody className="bg-popover relative group/card   dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-white"
        >
          {text}
        </CardItem>
        {/* <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          Hover over this card to unleash the power of CSS perspective
        </CardItem> */}
        <CardItem translateZ="100" className="w-full mt-4">
          <QRCodeSVG className="w-full h-full " value={text} />
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <CardItem
            className="w-full"
            translateZ={20}
          >
            <Button
              variant="default"
              className="w-full"
              onClick={() => {
                const svg = document.querySelector('.w-full.h-full') as SVGSVGElement;
                if (svg) {
                  const svgData = new XMLSerializer().serializeToString(svg);
                  const canvas = document.createElement('canvas');
                  const ctx = canvas.getContext('2d');
                  const img = new Image();
                  img.onload = () => {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx?.drawImage(img, 0, 0);
                    const pngFile = canvas.toDataURL('image/png');
                    const downloadLink = document.createElement('a');
                    downloadLink.download = 'qrcode.png';
                    downloadLink.href = pngFile;
                    downloadLink.click();
                  };
                  img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
                }
              }}
            // className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-colors"
            >
              Download QR Code
            </Button>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}