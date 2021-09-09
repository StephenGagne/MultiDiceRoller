const $diceNumber = document.getElementById("diceNumber")
const $armorClass = document.getElementById("armorClass")
const $results = document.getElementById('results')
const $attackBonus = document.getElementById('attackBonus')

const $damageNumber = document.getElementById('damageNumber')
const $damageType = document.getElementById('damageType')
const $damageBonus = document.getElementById('damageBonus')
const $damageResults = document.getElementById('damageResults')

const $attackDice = document.getElementById("attackDice")
const $damageDice = document.getElementById("damageDice")

const $rollButton = document.getElementById('rollButton')

let diceNumber
let diceType
let armorClass

const results = []

function pullValues() {
      console.log("values", diceNumber, diceType)
}

function rollDice(number,type) {
    results.length=0
        for (let i = 0; i < number; i++) {
        const result = Math.floor(Math.random() * type) + 1        
        results[i] = result
}
}

function roll() {
    
    diceNumber = 0
    diceNumber = parseInt($diceNumber.value)
    diceType = 20
    armorClass = $armorClass.value
    bonus = parseInt($attackBonus.value)
    if (isNaN(bonus)) {bonus = 0}
      
    rollDice(diceNumber,diceType)
    
    $results.innerText = ""
    $attackDice.innerHTML = ""
    $damageDice.innerHTML = ""
    
    // Check for hits
    let hits = 0
    let criticalHits = 0

    for (const result of results) {
        const die = document.createElement ("div")
        die.classList.add("die")
        die.innerHTML = `<h3>${result}</h3>`
        $attackDice.appendChild(die)
        const total = result + bonus
        
        if (result == diceType) {
           criticalHits++
            continue;
         }
        if (total >= armorClass) {
           hits++
           
        }
    }
    $results.innerText = `Critical hits: ${criticalHits}
    Hits: ${hits}`
    
    damageRoll(((hits * $damageNumber.value) + (criticalHits * $damageNumber.value * 2)), $damageType.value, ($damageBonus.value * (hits + criticalHits)))
    }

function damageRoll (number, type, bonus) {
 let diceTotal = 0
    let damageTotal = 0
 for (let i = 0; i < number; i++) {
    const result = Math.floor(Math.random() * type) + 1        
    diceTotal += result
    const die = document.createElement ("div")
        die.classList.add("die")
        die.innerHTML = `<h3>${result}</h3>`
        $damageDice.appendChild(die)
}

 damageTotal = diceTotal + bonus
  $damageResults.innerText = `Dice Total: ${diceTotal} + Bonus: ${bonus} = 
  ${damageTotal} damage`
}

$rollButton.addEventListener("click", roll)