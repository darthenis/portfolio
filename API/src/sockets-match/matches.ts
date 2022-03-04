


interface matches {

    name : string;
    creatorID : string;
    playersID : string[]

}

const types = {creator : 'Master', players : 'Player'}

export let matches : matches [] = []




    const setMatches = (newMatch : matches[]) => {

        matches = [...newMatch]

    }

    export const checkNewConection = (match : string, type : string, id : string) => {

        let result = matches.find(e => e.name === match)

        result!==undefined ? addParticipant(match, type, id) : addMatch(match, type, id)


    }

    const addMatch = (match : string, type : string, id : string) => {

        let newObject : matches = { name : match, 
            creatorID : type=== types.creator ? id : '',
            playersID : type=== types.players ? [id] : ['']}

        if (!matches.length) {
            
            setMatches([newObject])
     
        } else {

           setMatches([...matches.concat(newObject)])

        }

    }

    const addParticipant = (match : string, type : string, id : string) => {

                let playerID = [id]

                let creator = id

                let place = type === types.creator ? 'creatorID' : 'playersID'

                let addID = type === types.creator ? creator : playerID

                let newObjects : matches [] = matches.map(e => {

                                    if(e.name === match) return {...e, [place] : addID}

                                    return e
                })


                setMatches([...newObjects])

    }

    export const seekID = (id : string) => {

        let result = matches.find(e => e.creatorID)

        if(!result) result = matches.find(e => e.playersID)

        if(result) return result.name

        return console.log('error seek ID')

    }

    export const deleteID = (id : string) => {

        let match = matches.find(e => e.creatorID === id)!

        if(match !== undefined){

            let newMatches = matches.map(e => {

                        if(e.name === match.name) return {...e, creatorID : ''}

                        return e

            })

            console.log('newMatches: ', newMatches)

            setMatches([...newMatches])
            checkMatch(matches.find(e => e.name === match.name)!)

        }

        if(match === undefined) {
            
            match = matches.find(e => e.playersID.find(e => e === id))!

            if(match){

                    let newPlayersID : string [] = match.playersID.filter(e => e !== id)

                    let newMatches : matches [] = matches.map(e => {

                                        if(e.playersID.find(e => e === id)) return {...e, playersID : [...newPlayersID]}

                                        return e

                    })

                    setMatches([...newMatches])

                    checkMatch(matches.find(e => e.name === match.name)!)

            }
            
        }

    }


    const checkMatch = (match : matches) => {
        
        console.log('match revisando: ', match.creatorID.length, match.playersID.length)

        if(!match.creatorID.length && match.playersID[0] === '' && match.playersID.length === 1){

            deleteMatch(match.name)
        }

    }


    const deleteMatch = (match : string) => {

        let newMatches = matches.filter(e => e.name !== match)

        setMatches([...newMatches])

    }