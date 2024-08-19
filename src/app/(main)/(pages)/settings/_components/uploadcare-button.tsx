'use client'; // Required if using React Server Components

import { FileUploaderRegular } from '@uploadcare/react-uploader';
import '@uploadcare/react-uploader/core.css';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type Props = {
  onUpload?: (cdnURL: string) => Promise<any>;
};

const UploadCareButton = ({ onUpload }: Props) => {
  const router = useRouter();

  useEffect(() => {
    const handleUpload = async (e: any) => {
      if (onUpload) {
        const file = await onUpload(e.detail.cdnUrl); // Use `cdnUrl` instead of `cdnURL`
        if (file) {
          router.refresh();
        }
      }
    };

    // Add the event listener
    window.addEventListener('uploadcare-uploader-complete', handleUpload);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('uploadcare-uploader-complete', handleUpload);
    };
  }, [onUpload, router]);

  return (
    <div>
      <FileUploaderRegular pubkey="6d67bf79234350e54e40" />
    </div>
  );
};

export default UploadCareButton;
