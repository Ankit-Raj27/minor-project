import { authModalState } from "@/atoms/authModalAtom";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSetRecoilState } from "recoil";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  const setModalState = useSetRecoilState(authModalState);
  const handleClick = () => {
    setModalState((prev) => ({ ...prev, isOpen: true }));
  };
  return (
    <div className="flex items-center justify-between sm:px-12 px-2 md:px-24 hover:select-none" >
      <Link href="/" className="flex items-center justify-center h-20">
        <Image
          src="/logo.png"
          width={200}
          height={90}
          alt="CodeOmen"
          className="h-full"
          
        />
      </Link>
      <div className="flex items-center">
        <button
          className="bg-card-upper text-white px-2 py-1 sm:px-4 rounded-md text-sm font-medium hover:text-brand-orange
       hover:bg-white hover:border-2 hover:border-card-upper border-2 border-transparent transition duration-200 ease-in-out"
          onClick={handleClick}
        >
          Sign in
        </button>
      </div>
    </div>
  );
};
export default Navbar;
