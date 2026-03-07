import IconCopyNewPassword from '@/assets/icons/copy.svg';
import IconResetPassword from '@/assets/icons/icon-reset-password.svg';
import IconNewPassword from '@/assets/icons/new-password.svg';
import { useMessageContext } from '@/core/hooks/use-message-context';
import LoaderEID from '@/shared/loader/main';
import { ModalEID } from '@/shared/modal';
import { ModalDeleteProps } from '@/shared/modal/types';
import { Tooltip } from 'antd';

const ModalResetPassword = ({ message, isLoading, newPassword, ...props }: ModalDeleteProps) => {
  const { openMessage } = useMessageContext();

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(newPassword as string)
      .then(() => {
        openMessage({
          mode: 'success',
          title: 'Password copied to clipboard!',
          message: 'You can now paste it in the login form.',
          
        });
      })
      .catch(() => {
        openMessage({
          message: 'Failed to copy password to clipboard!',
          mode: 'danger',
          title: 'Error',
        });
      });
  };

  if (!isLoading && newPassword) {
    return (
      <ModalEID type={'danger'} okText="Yes, Reset" {...props}>
        <ModalEID.Body className="flex flex-col pt-2 items-center justify-center">
          <img src={IconNewPassword} alt="" />
          <div className="font-bold text-2xl">Your new password is already</div>
          <div className="text-md mt-[-8px] font-normal text-grey-400">
            Use this new password to login with your existing username
          </div>

          {/* Button New Password */}
          <div className="text-black flex gap-2 justify-center items-center bg-blue-100 py-3 px-8 w-fit rounded-lg">
            <div className="text-md text-black">{newPassword.split(' ').pop()}</div>{' '}
            <Tooltip title="Copy Password">
              <img
                onClick={copyToClipboard}
                src={IconCopyNewPassword}
                className="mb-1 cursor-pointer"
              />
            </Tooltip>
          </div>
        </ModalEID.Body>
      </ModalEID>
    );
  }

  return (
    <ModalEID type={'danger'} okText="Yes, Reset" {...props}>
      {/* <ModalEID.Body className="flex flex-col items-center justify-center"> */}
      {isLoading ? (
        <ModalEID.Body className="flex flex-col pt-2 gap-6 items-center justify-center">
          <LoaderEID className="mt-5" size="middle" style='loader' color="blue" />
          <div className="font-medium text-xl">Generating new password</div>
        </ModalEID.Body>
      ) : (
        <>
          <ModalEID.Body className="flex flex-col items-center justify-center">
            <img src={IconResetPassword} alt="" />
            <h3 className="font-bold text-2xl">Confirm reset password</h3>
            <p className="text-grey-400 text-base font-normal">{message}</p>
          </ModalEID.Body>
          <ModalEID.Footer />
        </>
      )}
    </ModalEID>
  );
};

export default ModalResetPassword;
