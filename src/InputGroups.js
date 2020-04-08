import React, { useState } from 'react'
import { v4 as uuid } from 'uuid';

const InputGroup = (props) => {
    const [newPlayer, setNewPlayer] = useState("")
    const [errorFill, setErrorFill] = useState(false)

    const handleChange = (e) => {
        setNewPlayer(e.target.value)
    }

    const handlePlayerSubmit = (e) => {
        e.preventDefault()

        if (newPlayer !== "") {
            props.editPlayers(prevPlayers => ([
                ...prevPlayers,
                {
                    playerName: newPlayer,
                    role: {},
                    key: uuid()
                }
            ]))

            setNewPlayer("")
            setErrorFill(false)
        } else {
            setErrorFill(true)
        }

        
    }

    const handleClearPlayers = () => {
        props.editPlayers([])
    }


    return (
        <div>
            <h2>Add Your Players</h2>

            <form onSubmit={handlePlayerSubmit}>
                <input
                    name="playerName"
                    value={newPlayer}
                    placeholder="Player Name"
                    onChange={handleChange}
                />
                { 
                    errorFill === true 
                    ?
                    <p className="errorMsg">You must have content to submit this name.</p>
                    : 
                    null
                }
                <button>Add Player</button>
            </form>

        { props.players.map(item => <p key={item.key}>{item.playerName}</p>)}

            <button onClick={handleClearPlayers}>Clear</button>
        </div>
    )
}

export default InputGroup