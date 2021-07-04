import dayjs from "dayjs";

export function calcTotal(items) {
  let total = 0;
  for (const item of items) {
    total += item.total;
  }
  return total;
}

export function createInvoice(status, values) {
  return {
    ...values,
    createdAt: dayjs(values.createdAt).format("YYYY-MM-DD"),
    paymentDue: dayjs(values.createdAt)
      .add(Number(values.paymentTerms), "day")
      .format("YYYY-MM-DD"),
    status,
    total: calcTotal(values.items),
  };
}

export function invoicesMessage(invoiceLength, filter) {
  if (invoiceLength === 0 && !filter) {
      return 'There are no invoices.'
  } else if (invoiceLength === 0 && filter) {
      return `There are no ${filter} invoices.`
  } else if (invoiceLength === 1 && !filter) {
      return 'There is 1 invoice.'
  } else if (invoiceLength === 1 && filter) {
      return `There is 1 ${filter} invoice.`
  } else if (!filter) {
      return `There are ${invoiceLength} total invoices.`
  } else {
      return `There are ${invoiceLength} ${filter} invoices.`
  }
}

