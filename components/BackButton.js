import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";

export default function BackButton() {
  const router = useRouter();

  return (
    <a onClick={() => router.back()} >
      <Image
        src="/assets/arrow-left.svg"
        alt="Voltar"
        width="40px"
        height="40px"
      />
    </a>
  );
}
