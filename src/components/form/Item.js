import React, { useEffect } from "react";
import Input from "./Input";
import Button from "../shared/Button";
import { useFormikContext } from "formik";
import trashIcon from "../../assets/images/icon-delete.svg";
import "./ItemList.css";

const Item = React.memo(({ index, helpers }) => {
  const { values, setFieldValue } = useFormikContext();
  const totalPrice = values.items[index].price;
  const totalQty = values.items[index].quantity;

  useEffect(() => {
    const total = totalPrice * totalQty;
    const rounded = Math.round((total + Number.EPSILON) * 100) / 100;

    setFieldValue(`items[${index}].total`, rounded || "0");
  }, [totalPrice, totalQty]);

  return (
    <div className="invoiceForm-item-wrapper">
      <Input
        label="Item Name"
        name={`items[${index}].name`}
        hideLabels={index > 0}
      />

      <Input
        label="Qty."
        name={`items[${index}].quantity`}
        hideLabels={index > 0}
      />

      <Input
        label="Price"
        name={`items[${index}].price`}
        hideLabels={index > 0}
      />

      <Input
        label="Total"
        name={`items[${index}].total`}
        hideLabels={index > 0}
        disabled
        className="disabled-field-total"
      />
      <Button
        buttonStyle="delete-item-btn"
        iconValue={trashIcon}
        altValue="deleteIcon"
        onClick={() => helpers.remove(index)}
      />
    </div>
  );
});

export default Item;
