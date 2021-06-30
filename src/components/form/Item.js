import React from 'react'
import Input from "./Input"
import Button from  "../shared/Button"
import './ItemList.css'
function Item({index,helpers}) {

    const trashIcon =<i className="fas fa-trash"></i>
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
            <Button buttonStyle="delete-item-btn"  iconValue={trashIcon} onClick={() => helpers.remove(index)}/>

        </div>
    )
}

export default Item
