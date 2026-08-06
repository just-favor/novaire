"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type CurrencyCode = "USD" | "EUR" | "GBP" | "JPY" | "NGN";

export interface CurrencyDetails {
  code: CurrencyCode;
  symbol: string;
  label: string;
  rate: number; // rate against USD
}

export const CURRENCIES: Record<CurrencyCode, CurrencyDetails> = {
  USD: { code: "USD", symbol: "$", label: "USD ($)", rate: 1.0 },
  EUR: { code: "EUR", symbol: "€", label: "EUR (€)", rate: 0.92 },
  GBP: { code: "GBP", symbol: "£", label: "GBP (£)", rate: 0.78 },
  JPY: { code: "JPY", symbol: "¥", label: "JPY (¥)", rate: 155.0 },
  NGN: { code: "NGN", symbol: "₦", label: "NGN (₦)", rate: 1650.0 },
};

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  formatPrice: (usdAmount: number) => string;
  currencyDetails: CurrencyDetails;
}

const CurrencyContext = createContext<CurrencyContextType | null>(null);

const STORAGE_KEY = "novaire_currency";

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>("USD");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as CurrencyCode;
      if (stored && CURRENCIES[stored]) {
        setCurrencyState(stored);
      }
    } catch {}
  }, []);

  const setCurrency = (code: CurrencyCode) => {
    setCurrencyState(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {}
  };

  const currencyDetails = CURRENCIES[currency];

  const formatPrice = (usdAmount: number): string => {
    const converted = usdAmount * currencyDetails.rate;
    if (currency === "JPY") {
      return `${currencyDetails.symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${currencyDetails.symbol}${Math.round(converted).toLocaleString()}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        formatPrice,
        currencyDetails,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error("useCurrency must be used within CurrencyProvider");
  }
  return ctx;
}
