'use client';

import config from '@/lib/config';
import {
  upload,
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  Image,
  Video,
} from '@imagekit/next';
import { useRef, useState } from 'react';
import { toast } from './ui/toast';
import NextImage from 'next/image';
import { cn } from '@/lib/utils';

interface Props {
  type: 'image' | 'file' | 'video';
  folder: string;
  placeholder: string;
  variant: 'dark' | 'light';
  onFileChange: (filePath: string) => void;
}

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);
    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Request failed with status ${response.status}:${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token, publicKey } = data;

    return { token, expire, signature, publicKey };
  } catch (error: any) {
    throw new Error(`Authentication request failed ${error.message}`);
  }
};

const FileUpload = ({
  type,
  placeholder,
  folder,
  variant,
  onFileChange,
}: Props) => {
  const ikUploadRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<{ filePath: string } | null>(
    null
  );
  const [progress, setProgress] = useState(0);
  const abortController = new AbortController();

  const styles = {
    button:
      variant === 'dark'
        ? 'bg-dark-300'
        : 'bg-light-600 border-gray-100 border',
    placeholder: variant === 'dark' ? 'text-light-100' : 'text-slate-500',
    text: variant === 'dark' ? 'text-light-100' : 'text-dark-400',
  };

  const handleUpload = async () => {
    const fileInput = ikUploadRef.current;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      alert('Please select a file to upload');
      return;
    }

    const file = fileInput.files[0];

    let authParams;
    try {
      authParams = await authenticator();
    } catch (authError) {
      console.error('Failed to authenticate for upload:', authError);
      return;
    }
    const { signature, expire, token, publicKey } = authParams;

    try {
      const uploadResponse = await upload({
        expire,
        token,
        signature,
        publicKey,
        file,
        folder: folder,
        fileName: 'images',
        useUniqueFileName: true,
        onProgress: ({ loaded, total }) => {
          const percent = Math.round((loaded / total) * 100);
          setProgress(percent);
        },
        abortSignal: abortController.signal,
      });
      console.log(uploadResponse.url);
      
      setUploadedFile({
        filePath: uploadResponse.filePath!,
      });
      
      onFileChange(uploadResponse.url!);

      toast.add({
        title: `${type} uploaded succesfully`,
        description: `${uploadResponse.filePath} successfull`,
      });
    } catch (error) {
      if (error instanceof ImageKitAbortError) {
        console.error('Upload aborted:', error.reason);
      } else if (error instanceof ImageKitInvalidRequestError) {
        console.error('Invalid request:', error.message);
      } else if (error instanceof ImageKitUploadNetworkError) {
        console.error('Network error:', error.message);
      } else if (error instanceof ImageKitServerError) {
        console.error('Server error:', error.message);
      } else {
        console.error('Upload error:', error);
      }
    }
  };

  return (
    <>
      <input
        type="file"
        ref={ikUploadRef}
        className="hidden"
        onChange={handleUpload}
      />
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          ikUploadRef.current?.click();
        }}
        className={cn('upload-btn', styles.button)}
      >
        <NextImage
          src="/icons/upload.svg"
          alt="upload-icon"
          width={20}
          height={20}
          className="object-contain"
        />
        <p className={cn('text-base ', styles.placeholder)}>{placeholder}</p>

        {uploadedFile && (
          <p className={cn('text-base text-light-100', styles.text)}>
            {uploadedFile.filePath}
          </p>
        )}
      </button>
      {progress > 0 && progress != 100 && (
        <div className="w-full rounded-full bg-green-200">
          <div className="progress" style={{ width: `${progress}%` }}>
            {progress}%
          </div>
        </div>
      )}
      {uploadedFile &&
        (type === 'image' ? (
          <Image
            urlEndpoint={config.env.imagekit.urlEndpoint!}
            src={uploadedFile.filePath}
            alt="Uploaded profile image"
            width={500}
            height={500}
          />
        ) : type === 'video' ? (
          <Video
            urlEndpoint={config.env.imagekit.urlEndpoint!}
            src={uploadedFile.filePath}
            controls={true}
            height={100}
            width={100}
          />
        ) : null)}
    </>
  );
};

export default FileUpload;
