import IconError from '@/assets/icons/error.svg';
import CardEID from '@/shared/card';

interface ErrorUpload {
  message: string;
}

const ErrorUpload = ({ message }: ErrorUpload) => {
  if (!message) {
    return null;
  }
  return (
    <CardEID className="">
      <div className="flex gap-1 items-center">
        <img src={IconError} alt="IC-ERROR" />
        <h5 className="font-bold text-xl">File Error</h5>
      </div>
      <p className="text-lg">{message}</p>
      <span className="mt-6 text-base">*Harap upload dokumen kembali</span>
    </CardEID>
  );
};

export default ErrorUpload;
