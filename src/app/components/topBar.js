import Image from "next/image";

export default function Topbar() {
  return (
    <header
      className="
        relative
        flex items-center justify-between
        h-20
        px-6
        rounded-3xl
        shadow
        text-white
      "
    >
      <div
        className="
          absolute
          inset-0
          bg-black/70
          backdrop-blur-lg
          border border-white/20
          rounded-3xl
          pointer-events-none
        "
      />

      <div className="relative z-10 flex items-center">
        <div className="flex flex-col items-center gap-1">
          <Image
            src="/images/top_bar/logo.svg"
            alt="COMMENTS'USION Logo"
            width={200}
            height={40}
            className="block"
          />
          <div className="text-center text-[12px] italic leading-none">
            Comments with solution
          </div>
        </div>
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center space-x-6 text-sm">
        <span>Connected 0/0</span>
        <span>Creators 0/0</span>
        <span>Keywords 0/0</span>
      </div>

      <div className="relative z-10 flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <div className="flex flex-col items-center gap-0">
            <span className="text-sm">Anonymous</span>
            <span className="text-[12px]">Free</span>
          </div>
          <Image
            src="/images/top_bar/userIcon.svg"
            alt="COMMENTS'USION Logo"
            width={30}
            height={30}
            className="block"
          />
        </div>
      </div>
    </header>
  );
}
