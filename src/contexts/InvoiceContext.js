import React, { useState, useEffect, useContext } from "react";
import { useAuth } from "./AuthContext";
import { getInvoices } from "../services/api";

const InvoiceContext = React.createContext();

export function useInvoice() {
  return useContext(InvoiceContext);
}
export function InvoiceProvider({ children }) {
  console.log("in");
  const { user } = useAuth();
  const [sending, setSending] = useState(false);
  const [invoices, setInvoices] = useState(null);

  useEffect(() => {
    if (user) {
      getInvoices(user.uid).onSnapshot((querySnapshot) => {
        var newInvoices = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          newInvoices.push({ ...data, id: doc.id });
        });
        setInvoices(newInvoices);
      });
    }
  }, [user, sending]);

  return (
    <InvoiceContext.Provider value={{ invoices, sending, setSending }}>
      {children}
    </InvoiceContext.Provider>
  );
}
