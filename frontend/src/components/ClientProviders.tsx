"use client";

import React from "react";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import GoldRateBar from "@/components/layout/GoldRateBar";
import CartDrawer from "@/components/layout/CartDrawer";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <CartProvider>
        <GoldRateBar />
        <CartDrawer />
        {children}
      </CartProvider>
    </AuthProvider>
  );
}
