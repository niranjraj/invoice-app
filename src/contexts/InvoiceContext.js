import React, { useState, useEffect, useContext } from "react";
import { useAuth } from "./AuthContext";
import { getInvoices } from "../services/api";
const InvoiceContext = React.createContext();

export function useInvoice() {
  return useContext(InvoiceContext);
}
export function InvoiceProvider({ children }) {
  const { user,sending,setSending } = useAuth();

  const [invoices, setInvoices] = useState(null);

  useEffect(() => {
    if (user && sending) {
      const unsubscribe = async () => {
        const newInvoices = await getInvoices(user.uid);
        setInvoices(newInvoices);
        setSending(false)
      };
      unsubscribe();
      console.log("in useffect invoice");
      return () => unsubscribe();
    }
  }, [user, sending]);

  return (
    <InvoiceContext.Provider value={{ invoices, sending, setSending }}>
      {children}
    </InvoiceContext.Provider>
  );
}
