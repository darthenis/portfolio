let result = {
    rolled : 0,
    critic : false,
    exit : false,
    dmg : 0

}

//------------------------ROLLDICE--------------------------

  export const returnDice = (dado : number, bonus : number, ventaja? : boolean | null, critic? : boolean) => { //ventaja or critic

        type result = { critic : boolean, ventaja : boolean | null, result : number}

        let result : result = {
          critic : false,
          ventaja : null,
          result : 0
        }

        if(critic){

          let rolled1 = Math.round(Math.random() * ( dado - 1) + 1 )

          let rolled2 = Math.round(Math.random() * ( dado - 1) + 1 )

          return {...result, result : rolled1 + rolled2 + Number(bonus)}

        } else if (ventaja) {

            let rolled1 = Math.round(Math.random() * ( dado - 1) + 1 )

            let rolled2 = Math.round(Math.random() * ( dado - 1) + 1 )

            if (rolled1 > rolled2) {

                if(rolled1===20) result = {...result, critic : true, ventaja : true}
              
                return {...result, result : rolled1 + Number(bonus)}
              
              } else {

                  if(rolled2===20) result = {...result, critic : true, ventaja : true}

                  return {...result, result : rolled2 + Number(bonus)}
            }

        } else if (!ventaja && ventaja !== null){

            let rolled1 = Math.round(Math.random() * ( dado - 1) + 1 )

            let rolled2 = Math.round(Math.random() * ( dado - 1) + 1 )

            if (rolled1 < rolled2) {

                if(rolled1===20) result = {...result, critic : true, ventaja : false}
              
                return {...result, result : rolled1 + Number(bonus)}
              
              } else { 
                  
                  if(rolled2===20) result = {...result, critic : true, ventaja : false}

                  return {...result, result : rolled2 + Number(bonus)}

              }

        }

        let diceResult = Math.round(Math.random() * ( dado - 1 )) + 1 

        if(diceResult===20) result = {...result, critic : true}

        return {...result, result : diceResult + Number(bonus)}


    
}

//------------------------ATTACK----------------------------

export const attackDMG = (CA : number, bonusDmg : number, diceDMG : number, bonusAttack : number, ventaja : boolean | null, critic? : boolean) => {

  let resultAttack = returnDice(20, bonusAttack, ventaja, critic)

  result = {...result, rolled : resultAttack.result}

  let hit : boolean

  resultAttack.result >= CA ? hit=true : hit=false

  if(!hit){

    result = {...result, exit : false}

  } else if (resultAttack.critic){

    result = {...result, critic : true, dmg : returnDice(diceDMG, bonusDmg, critic).result, exit : true}

  } else {

    result = {...result, critic : false, dmg : returnDice(diceDMG, bonusDmg).result, exit : true}

  }

  return result;

}

export const customRoll = (diceValue : number, numberDices : number, bonus : number, ventaja : boolean | null) => {

    let result = 0

      for (let i = 0; i<numberDices; ++i){
        
            result = returnDice(diceValue, bonus, ventaja).result + result

      }

    return result

}