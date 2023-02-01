import { useState } from 'react';

import Script from 'next/script';
import Image from 'next/image';

import { logger } from 'utils/logger';
import { Button } from 'components';

declare global {
  interface Window {
    cloudinary: any;
  }
}

type Result = {
  event: string;
  info: { url: string };
};

type ImageUploadProps = {
  onSuccessfulUpload: (imageUrl: string) => void;
  initialImage: string | null | undefined;
};

export const ImageUpload = ({
  onSuccessfulUpload,
  initialImage,
}: ImageUploadProps) => {
  const [imageUrl, setImageUrl] = useState<string | undefined | null>();
  const [uploadWidget, seyUploadWidget] = useState<{ open: VoidFunction }>();
  const imageSrc = imageUrl?.toString() || initialImage?.toString();

  return (
    <>
      <Script
        strategy='afterInteractive'
        id='cloudinary-upload-widget'
        src='https://upload-widget.cloudinary.com/global/all.js'
        onLoad={() =>
          seyUploadWidget(
            window.cloudinary.createUploadWidget(
              {
                cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
                uploadPreset: 'portfolio',
              },
              (error: Error, result: Result) => {
                if (error) logger.log(error);

                if (!error && result && result.event === 'success') {
                  onSuccessfulUpload(result.info.url);
                  setImageUrl(result.info.url);
                }
              },
            ),
          )
        }
      />
      {imageSrc && <Image src={imageSrc} width={300} height={400} />}
      <Button onClick={() => uploadWidget?.open()}>upload</Button>
    </>
  );
};
