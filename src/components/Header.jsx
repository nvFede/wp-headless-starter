import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const navigationRoutes = ["About", "Blog"];

export default function Header() {
  return (
    <header className=" w-screen mb-5 height-[130px]">
      <Link href="/" className="flex items-center py-4 px-2">
        <h1>Logo</h1>
      </Link>
    </header>
  );
}
