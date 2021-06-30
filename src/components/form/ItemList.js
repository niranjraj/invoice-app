import React from "react";
import { FieldArray, useFormikContext } from "formik";
import Button from "../shared/Button";
import Item from "./Item";
import './ItemList.css';
function ItemList({ name }) {
  const { values } = useFormikContext();
  return (
    <fieldset className="itemList-wrapper">
      <legend className="itemList-legend">ItemList</legend>
      <FieldArray
        name={name}
        render={(helpers) => {
          return <div className="invoiceForm-itemList">
            {values.items.map((item, index) => {
              return <Item key={index} index={index} helpers={helpers} />;
            })}
            <Button
            buttonStyle="add-item-btn"
            buttonSize="large"
              onClick={() =>
                helpers.push({ name: "", quantity: "", price: "", total: "" })
              }
            >
              + Add New Item
            </Button>
          </div>;
        }}
      />
    </fieldset>
  );
}

export default ItemList;
