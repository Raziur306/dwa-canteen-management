import { FooterContainer } from "@/styled/sharedStyles";
import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <FooterContainer>
      <p>Copyright © 2024 DWA Canteen. All Rights Reserved.</p>
      <div className="flex flex-row gap-4 uppercase">
        <Link href="/">Privacy</Link>
        <Link href="/">Term of Use</Link>
        <Link href="/">Policy</Link>
      </div>
    </FooterContainer>
  );
};

export default Footer;
