import React, { useState } from 'react';
import Role from './Role'
import InputGroups from './InputGroups'
import  SelectCharacters from './SelectCharacters'
import { v4 as uuid } from 'uuid';
import './styles/styles.css'

function App() {
	const roles = [
		{
			title: "Werewolf",
			key: 0,
			description: "The Werewolf works with its team to systematically kill the Villagers.",
			goal: "Wins if all Villagers are Killed",
			limit: "null",
			required: true,
			availableToPlay: true,
			team: "bad"
		},
		{
			title: "Villager",
			key: 1,
			description: "The Townsfolk are the general people. They don't have any special actions.",
			goal: "Wins if all Werewolves are Killed",
			limit: "null",
			required: true,
			availableToPlay: true,
			team: "good"
		},
		{
			title: "Seer",
			key: 3,
			description: "Once a night, the Seer can ask the Narrator what team someone is on. They do not get told the role of that person.",
			goal: "Wins if all Werewolves are Killed",
			limit: 1,
			required: true,
			availableToPlay: true,
			team: "good"
		},
		{
			title: "Bodyguard",
			key: 4,
			description: "The bodyguard protects one person each night. Can't choose the same person two nights in a row. They can protect themself.",
			goal: "Wins if all Werewolves are Killed",
			limit: 1,
			required: true,
			availableToPlay: true,
			team: "good"
		},
		{
			title: "Village Idiot",
			key: 5,
			description: "Appears as a Werewolf to Seer. If killed, they do not die, but their vote does not count to the village vote.",
			goal: "Wins if all Werewolves are Killed",
			limit: 1,
			required: false,
			availableToPlay: false,
			team: "good"
		},
		{
			title: "Hunter",
			key: 6,
			description: "If the Hunter is killed, they choose one other player to shoot and take out with them.",
			goal: "Wins if all Werewolves are Killed",
			limit: 1,
			required: false,
			availableToPlay: false,
			team: "good"
		},
		{
			title: "Cupid",
			key: 7,
			description: "On the first night, the Cupid chooses two people to be 'in love'. The Narrator lets those two know they are coupled. If one of the couple is killed, both die. The couple win if they both survive.",
			goal: "Wins if all Werewolves are Killed",
			limit: 1,
			required: false,
			availableToPlay: false,
			team: "good"
		},
		{
			title: "Witch",
			key: 8,
			description: "The witch starts out the game with two potions. One potion protects a person for a night, the other kills a person. They can only use each potion once.",
			goal: "Wins if all Werewolves are Killed",
			limit: 1,
			required: false,
			availableToPlay: false,
			team: "good"
		},
		{
			title: "Little Girl",
			key: 9,
			description: "Once a game, the Little Girl can try to peak to see who the werewolves are. One way to do this is to have the Narrator think up a random number between one and four for the Little Girl to Guess. If they guess correctly, they can find out who one of the Werewolves are.",
			goal: "Wins if all Werewolves are Killed",
			limit: 1,
			required: false,
			availableToPlay: false,
			team: "good"
		},
		{
			title: "Minion",
			key: 10,
			description: "The Minion wants the Werewolves to win. They know who the Werewolves are, but the Werewolves do not know who they are.",
			goal: "Wins if all Villagers are Killed and at least one Werewolf is alive.",
			limit: 1,
			required: false,
			availableToPlay: false,
			team: "bad"
		},
		{
			title: "Tanner",
			key: 11,
			description: "The Tanner wants to die in the game, by whatever means necessary.",
			goal: "Wins if all they die in the game",
			limit: 1,
			required: false,
			availableToPlay: false,
			team: "good"
		}
	]

	// const availableRolesToPlay = roles.filter(ind => ind.availableToPlay === true)

	const [players, editPlayers] = useState([])
	const [availableRolesState, setAvailableRolesState] = useState([])

	const playerAmount = [
		{
			amount: 8,
			wereTeam: 2,
			villageTeam: 6
		},
		{
			amount: 9,
			wereTeam: 2,
			villageTeam: 7
		},
		{
			amount: 10,
			wereTeam: 2,
			villageTeam: 8
		},
		{
			amount: 11,
			wereTeam: 2,
			villageTeam: 9
		},
		{
			amount: 12,
			wereTeam: 3,
			villageTeam: 9
		},
		{
			amount: 13,
			wereTeam: 3,
			villageTeam: 10
		},
		{
			amount: 14,
			wereTeam: 3,
			villageTeam: 11
		},
		{
			amount: 15,
			wereTeam: 3,
			villageTeam: 12
		},
		{
			amount: 16,
			wereTeam: 3,
			villageTeam: 13
		},
		{
			amount: 17,
			wereTeam: 3,
			villageTeam: 14
		},
		{
			amount: 18,
			wereTeam: 4,
			villageTeam: 14
		},
		{
			amount: 19,
			wereTeam: 4,
			villageTeam: 15
		},
		{
			amount: 20,
			wereTeam: 4,
			villageTeam: 16
		},
		{
			amount: 21,
			wereTeam: 4,
			villageTeam: 17
		},
		{
			amount: 22,
			wereTeam: 4,
			villageTeam: 18
		},
		{
			amount: 23,
			wereTeam: 4,
			villageTeam: 19
		},
		{
			amount: 24,
			wereTeam: 4,
			villageTeam: 20
		},
		{
			amount: 25,
			wereTeam: 5,
			villageTeam: 21
		}
	]

	function shuffle(array) {
		array.sort(() => Math.random() - 0.5);
	}

	const assignRoles = () => {
		let playerAmountCheck = players.length

		if (playerAmountCheck < 8) {
			alert("You do not have enough players!")
		} else if (playerAmountCheck > 25) {
			alert("we only computed to 25 players.")
		} else {
			const playerAmountObj = playerAmount.filter(ind => ind.amount === playerAmountCheck)
			
			const finalRoles = []
			
			//Werewolf Team
			let badTeam = playerAmountObj[0].wereTeam

			const minionIndex = availableRolesState.findIndex(ind => ind.title === "Minion")
			if (availableRolesState[minionIndex] !== -1) {
				let index = roles.findIndex(ind => ind.title === "Minion")
				const newRole = roles[index]
				newRole.newKey = uuid()
				finalRoles.push(newRole)

				badTeam -= 1
			}
			while (badTeam > 0) {
				let index = roles.findIndex(ind => ind.title === "Werewolf")
				const newRole = roles[index]
				newRole.newKey = uuid()

				finalRoles.push(newRole)
				badTeam -= 1
			}

			//Villager Team
			let goodTeam = playerAmountObj[0].villageTeam //length of good team
			const goodAvailableRoles = availableRolesState.filter(ind => ind.team === "good")

			//seer
			let seerIndex = roles.findIndex(ind => ind.title === "Seer")
			const newSeer = roles[seerIndex]
			newSeer.newKey = uuid()
			finalRoles.push(newSeer)
			goodTeam--

			//bodyguard
			let bodyguardIndex = roles.findIndex(ind => ind.title === "Bodyguard")
			const newBodyGuard = roles[bodyguardIndex]
			newBodyGuard.newKey = uuid()
			finalRoles.push(newBodyGuard)
			goodTeam--
				
			shuffle(goodAvailableRoles)

			while (goodAvailableRoles.length > goodTeam) {
				goodAvailableRoles.splice(goodAvailableRoles.length - 1, 1)
			}

			let result = finalRoles.concat(goodAvailableRoles)

			//fill excess roles to villagers

			while (result.length < playerAmountObj[0].amount) {
				let index = roles.findIndex(ind => ind.title === "Villager")
				let newRole = roles[index]
				newRole.newKey = uuid()

				result.push(newRole)
			}

			shuffle(result)
			console.log(result)
			players.forEach((ind, i) => {
				ind.role = result[i]
			})
			console.log(players)

			const resultDiv = document.getElementById("resultDiv")
			resultDiv.classList.remove("hidden")

			players.forEach(ind => {
				let newOl = document.createElement("li")
				newOl.id = ind.key
				newOl.classList.add("resultPlayerDiv")

				let name = document.createElement("h2")
				name.textContent = ind.playerName

				let role = document.createElement("h2")
				role.textContent = ind.role.title

				newOl.appendChild(name)
				newOl.appendChild(role)
				resultDiv.appendChild(newOl)
			})
		}
	}


	return (
    	<div>
			<h2>werewolf role generator</h2>
			<ol id="resultDiv" className="hidden">
			</ol>

			<h2>{players.length}</h2>
			
			<InputGroups players={players} editPlayers={editPlayers} />


			<SelectCharacters roles={roles} availableRolesState={availableRolesState} setAvailableRolesState={setAvailableRolesState} />

			{/* { availableRolesState.map(ind => <p>{ind.title}</p>) } */}

			<button onClick={assignRoles}>Assign Roles</button>

			<h2>Roles</h2>
			{ roles.map(role => <Role key={role.key} {...role} title={role.title} description={role.description} goal={role.goal} />) }
    	</div>
	);
}

export default App;
