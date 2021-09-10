import React, { useEffect, useState } from "react";
import Wrapper from "../components/shared/Wrapper";
import { Header } from "../components/home/Header";
import InvoiceList from "../components/home/InvoiceList";
import Backdrop from "../components/shared/Backdrop";
import InvoiceForm from "../components/form/InvoiceForm";
import { useInvoice } from "../contexts/InvoiceContext";
import { useAuth } from "../contexts/AuthContext";
import { getNextBatch } from "../services/api";
import Seo from "../components/shared/Seo";

function Home() {
  const [formIsOpen, setFormIsOpen] = useState(false);
  const [filteredInvoices, setFilteredInvoices] = useState(null);
  const [filterStatus, setFilterStatus] = useState(null);
  const { user, loading } = useAuth();

  const { invoices, startKey, setInvoices, setStartKey, hasMore, setHasMore } =
    useInvoice();

  async function scrollUpdate() {
    if (startKey) {
      const { newInvoices, key } = await getNextBatch(startKey, user.uid);
      if (key) {
        Array.prototype.push.apply(invoices, newInvoices);
        setInvoices(invoices);
        setStartKey(key);
      } else {
        setHasMore(false);
      }
    }
  }

  var memoizedInvoices = React.useMemo(() => {
    if (invoices && filterStatus) {
      return invoices.filter((invoice) => {
        return invoice.status === filterStatus;
      });
    }
  }, [invoices, filterStatus]);

  console.log(memoizedInvoices);

  useEffect(() => {
    if (invoices) {
      setFilteredInvoices(invoices);
      if (filterStatus) {
        setFilteredInvoices(memoizedInvoices);
      }
    }
  }, [invoices, filterStatus, memoizedInvoices]);

  return (
    <>
      <Seo
        title={`Invoices (${
          filteredInvoices ? filteredInvoices.length : "0"
        }) | Invoicely`}
      />
      <Backdrop formIsOpen={formIsOpen} setFormIsOpen={setFormIsOpen} />
      <Wrapper>
        <InvoiceForm formIsOpen={formIsOpen} setFormIsOpen={setFormIsOpen} />
        <Header
          invoices={filteredInvoices}
          filterStatus={filterStatus}
          setFormIsOpen={setFormIsOpen}
          setFilterStatus={setFilterStatus}
        />
        {!loading && (
          <InvoiceList
            invoices={filteredInvoices}
            hasMore={hasMore}
            scrollUpdate={scrollUpdate}
          />
        )}
      </Wrapper>
    </>
  );
}

export default Home;
