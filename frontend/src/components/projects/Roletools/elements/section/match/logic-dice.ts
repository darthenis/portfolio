let result = {
    rolled : 0,
    critic : false,
    exit : false,
    dmg : 0

}

//------------------------ROLLDICE--------------------------

  export const returnDice = (dado : number, bonus : number, ventaja? : string) => { //ventaja or critic

        let result={
          critic : false,
          result : 0,
        }

        if(ventaja==='critic'){

          let rolled1 = Math.round(Math.random() * ( dado - 1) + 1 )

          let rolled2 = Math.round(Math.random() * ( dado - 1) + 1 )

          return {...result, result : rolled1 + rolled2 + bonus}

        } else if (ventaja==='ventaja') {

            let rolled1 = Math.round(Math.random() * ( dado - 1) + 1 )

            let rolled2 = Math.round(Math.random() * ( dado - 1) + 1 )

            if (rolled1 > rolled2) {

                if(rolled1===20) result = {...result, critic : true}
              
                return {...result, result : rolled1 + bonus}
              
              } else {

                  if(rolled2===20) result = {...result, critic : true}

                  return {...result, result : rolled2 + bonus}
            }

        } else if (ventaja === 'desventaja'){

            let rolled1 = Math.round(Math.random() * ( dado - 1) + 1 )

            let rolled2 = Math.round(Math.random() * ( dado - 1) + 1 )

            if (rolled1 < rolled2) {

                if(rolled1===20) result = {...result, critic : true}
              
                return {...result, result : rolled1 + bonus}
              
              } else { 
                  
                  if(rolled2===20) result = {...result, critic : true}

                  return {...result, result : rolled2 + bonus}

              }

        }

        let diceResult = Math.round(Math.random() * ( dado - 1 )) + 1 

        if(diceResult===20) result = {...result, critic : true}

        return {...result, result : diceResult + bonus}


    
}

//------------------------ATTACK----------------------------

export const attackDMG = (CA : number, bonusDmg : number, diceDMG : number, bonusAttack : number, ventaja : string) => {

  let resultAttack = returnDice(20, bonusAttack, ventaja)

  result = {...result, rolled : resultAttack.result}

  let hit : boolean

  resultAttack.result >= CA ? hit=true : hit=false

  if(!hit){

    result = {...result, exit : false}

  } else if (resultAttack.critic){

    result = {...result, critic : true, dmg : returnDice(diceDMG, bonusDmg, 'critic').result, exit : true}

  } else {

    result = {...result, critic : false, dmg : returnDice(diceDMG, bonusDmg).result, exit : true}

  }

  return result;

}