import Vector from "../assets/Vector.svg";

interface SuccessModalProps {
  isOpen: boolean;
}

export function SuccessModal({ isOpen }: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        className="
          flex items-center gap-4
          rounded-[28px]
          border border-[#84B43A]
          bg-[#F7F7F0]
          px-6 py-7
          shadow-lg
        "
      >
        <img
          src={Vector}
          alt="Sucesso"
          className="w-9 h-9"
        />

        <div className="flex flex-col gap-2">
          <h2 className="text-[24px] font-semibold text-[#06152B] leading-none">
            Conta criada com sucesso
          </h2>

          <p className="text-[16px] text-black leading-normal">
            Um instante, iremos te redirecionar ao login !
          </p>
        </div>
      </div>
    </div>
  );
}