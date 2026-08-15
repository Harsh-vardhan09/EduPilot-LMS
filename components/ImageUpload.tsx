'use client';

import config from '@/lib/config';
import {
  upload,
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  Image,
} from '@imagekit/next';
import { useRef, useState } from 'react';
import { toast } from './ui/toast';

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

const ImageUpload = ({
  onFileChange,
}: {
  onFileChange: (filePath: string) => void;
}) => {
  const ikUploadRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<{ filePath: string } | null>(
    null
  );
  const abortController = new AbortController();

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
        fileName: 'test-upload.png',

        abortSignal: abortController.signal,
      });
      setUploadedFile({
        filePath: uploadResponse.filePath!,
      });
      onFileChange(uploadResponse.filePath!);

      toast.add({
        title: 'image uploaded succesfully',
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
        className="upload-btn"
      >
        <Image
          src={'/icons/upload.svg'}
          alt="upload-icon"
          width={20}
          height={20}
          className="object-contain"
        />
        <p className="text-base text-light-100">Upload a file</p>
        {uploadedFile && (
          <p className="upload-filename">{uploadedFile.filePath}</p>
        )}
      </button>

      {uploadedFile && (
        <Image
          urlEndpoint={config.env.imagekit.urlEndpoint!}
          src={uploadedFile.filePath}
          alt="Uploaded profile image"
          width={500}
          height={500}
        />
      )}
    </>
  );
};

export default ImageUpload;
