interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded-md font-bold text-slate-600">
        <p>{message}</p>
        <div className="flex justify-end mt-4 ">
          <button
            className="mr-2 rounded hover:bg-red-300 p-3 bg-red-400"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="rounded hover:bg-lime-300 p-3 bg-green-400"
            onClick={onConfirm}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
