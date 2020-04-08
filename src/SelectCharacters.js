import React from 'react'
import SelectIndiv from './SelectIndiv'

const SelectCharacters = (props) => {
    const filteredRoles = props.roles.filter(ind => ind.required === false)

    return (
        <div>
            <h2>Select What Specialty Roles You Want Available:</h2>
            { filteredRoles.map(ind => <SelectIndiv key={ind.key} myRole={ind} roles={props.roles} title={ind.title} availableRolesState={props.availableRolesState} setAvailableRolesState={props.setAvailableRolesState} />) }
        </div>
    )
}

export default SelectCharacters