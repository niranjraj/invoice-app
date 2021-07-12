import React, { useState, useEffect, useContext } from "react";
import { useAuth } from "./AuthContext";
import { getInvoices } from "../services/api";
const InvoiceContext = React.createContext();

export function useInvoice() {
  return useContext(InvoiceContext);
}
export function InvoiceProvider({ children }) {
  const { user, sending, setSending } = useAuth();
  const [hasMore, setHasMore] = useState(true);
  const [invoices, setInvoices] = useState(null);
  const [startKey, setStartKey] = useState(null);

  useEffect(() => {
    if (user && sending) {
      const unsubscribe = async () => {
        const { newInvoices, key } = await getInvoices(user.uid);
        key?setStartKey(key):setHasMore(false)
        setInvoices(newInvoices);
        setSending(false);
      };
      unsubscribe();
      console.log("in useffect invoice");
      return () => unsubscribe();
    }
  }, [user, sending]);

  return (
    <InvoiceContext.Provider
      value={{
        invoices,
        setInvoices,
        setStartKey,
        startKey,
        sending,
        setSending,
        hasMore,
        setHasMore
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
}
