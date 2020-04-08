import React from 'react'

const Role = (props) => {
    return (
        <div>
            <h3>{props.title}</h3>
			<p>{props.description}</p>
            <p>{props.goal}</p>
        </div>
    )
}

export default Role