import { Player, Bracket, Round, MatchObj } from './types.tsx';
import { randStr, createPlayerOrder } from './misc.tsx';
import { RRPool, RRMatchObj } from './types.tsx';
import RRMatch from '../components/RRMatch.tsx';

export const createRRPool = (numPlayers: number) => {
    let playerList: Player[] = [];
    for (var i=0;i<numPlayers;i++) {
        let newPlayer = {
            seed: i+1,
            name: randStr(),
            isHuman: true
        };
        playerList.push(newPlayer);
    }

    let newMatchList: RRMatchObj[][] = [];

    for (i=0;i<numPlayers;i++) {
        let newMatchRow: RRMatchObj[] = [];
        for (let j=i+1;j<numPlayers;j++) {
            let newMatch: RRMatchObj = {
                p1: playerList[i],
                p2: playerList[j],
                gameCount: [0, 0]
            }
            newMatchRow.push(newMatch);
        }
        //console.log(newMatchRow)
        if (newMatchRow.length > 0) {
            newMatchList.push(newMatchRow);
        }
    }

    let placements = new Array<number>(numPlayers).fill(0);
    
    let ret: RRPool = {
            playerList: playerList,
            matchList: newMatchList,
            placements: placements,
            winsNeeded: 2,
            matchesFinished: 0
    };
    console.log(ret.matchList);
    return ret;
}

export const createSEBracket = (numPlayers: number) => {
    let numRounds = Math.ceil(Math.log2(numPlayers))
    let totalSlots = Math.pow(2, numRounds);
    let playerList: Player[] = [];
    let newBracket: Bracket = {
        roundList: []
    };
    
    // create players
    for (var i=0;i<totalSlots;i++) {
        let newPlayer = {
            seed: i+1,
            name: '',
            isHuman: true
        };
        if (i < numPlayers) {
            newPlayer.name = randStr();
        } else {
            newPlayer.name = 'Bye'
            newPlayer.isHuman = false
        }
        playerList.push(newPlayer);
    }

    let seedingArr = createPlayerOrder(playerList.length);
    console.log('seeding arr: '+seedingArr);

    // add players to tournament -- seeding not implemented yet!
    let idCounter:number = 0;
    for (i=0;i<numRounds;i++) {
        let newRound: Round = {
            matchList: [],
            roundId: i
        };
        for (var j=0;j<playerList.length/(Math.pow(2, i+1)); j++) {
            let newMatch: MatchObj = {
                matchId: idCounter,
                winner: null,
                loser: null,
                p1Input: null,
                p2Input: null
            };
            if (i == 0) {
                newMatch.p1 = playerList[seedingArr[j*2]-1];
                newMatch.p2 = playerList[seedingArr[j*2+1]-1];
            } else {
                newMatch.p1 = null;
                newMatch.p2 = null;
                newMatch.p1Input = [i-1, j*2, true];
                newMatch.p2Input = [i-1, j*2+1, true];
            }
            idCounter++;
            newRound.matchList?.push(newMatch);
        }
        newBracket.roundList.push(newRound);
    }
    return newBracket;
}