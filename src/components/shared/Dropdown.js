import React,{useState} from 'react'
import Button from './Button';
import DropdownOption from './DropdownOption'

function Dropdown() {

    const [options, setOptions] = useState([
        {
            id: 0,
            value: 'paid',
            checked: false
        },
        {
            id: 1,
            value: 'pending',
            checked: false
        },
        {
            id: 2,
            value: 'draft',
            checked: false
        }
    ])

    return (
        <div>
            <Button>
                <h4>Filter by status</h4>
              
            </Button>
            <div >
                {options.map((option) => {return (<DropdownOption key={option.id} id={option.id}checked={option.checked}>{option.value}</DropdownOption>)})}
            </div>
        </div>
    )
}

export default Dropdown
