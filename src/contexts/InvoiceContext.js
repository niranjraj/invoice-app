import React, { useState, useEffect, useContext } from "react";
import { useAuth } from "./AuthContext";
import { getInvoices } from "../services/api";
const InvoiceContext = React.createContext();

export function useInvoice() {
  return useContext(InvoiceContext);
}
export function InvoiceProvider({ children }) {
  const { user, sending, setSending, setLoading, setError } = useAuth();
  const [hasMore, setHasMore] = useState(true);
  const [invoices, setInvoices] = useState(null);

  const [startKey, setStartKey] = useState(null);

  useEffect(() => {
    if (user && sending) {
      setLoading(true);
      try {
        const unsubscribe = async () => {
          const { newInvoices, key } = await getInvoices(user.uid);
          key ? setStartKey(key) : setHasMore(false);
          setInvoices(newInvoices);
          setSending(false);
        };
        unsubscribe();
        return () => unsubscribe();
      } catch (error) {
        setError("Something went wrong...could not get Invoices");
      } finally {
        setSending(false);
        setLoading(false);
      }
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
        setHasMore,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
}
