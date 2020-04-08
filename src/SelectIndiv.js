import React, { useState } from 'react'

const SelectIndiv = (props) => {
    const [checked, changeChecked] = useState(false)
    const myIndex = props.roles.findIndex(ind => ind.key === props.myRole.key)

    const check = () => {
        if (checked) {
            props.roles[myIndex].availableToPlay = false
            changeChecked(false)
            props.setAvailableRolesState(props.availableRolesState.filter(ind => ind.key !== props.myRole.key))
        } else {
            props.roles[myIndex].availableToPlay = true
            changeChecked(true)
            props.setAvailableRolesState(prevState => ([
                ...prevState,
                props.roles[myIndex]
            ]))
        }
    }

    return (
        <div>
            <input type="checkbox" name={props.title} value={props.title} onClick={check} />
            <label>{props.title}</label>
        </div>
    )
}

export default SelectIndiv