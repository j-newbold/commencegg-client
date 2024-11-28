import React, { useEffect, useState } from "react";
import { RRPool, RRMatchObj } from "../../utils/types";
import EmptyRRMatch from "../EmptyRRMatch";
import RRMatch from "../RRMatch";
import '../../index.css';
import Button from "react-bootstrap/Button";
import '../RRStanding';
import RRStanding from "../RRStanding";

export default function RRPoolComponent({bracketData}: {bracketData: RRPool}) {

    const [poolStruct, setPoolStruct] = useState<RRPool>(bracketData);
    const [standingsList, setStandingsList] = useState(
        poolStruct.playerList?.map((e, i) => {
        return (poolStruct.matchList[i] ? poolStruct.matchList[i] : []).concat(
            poolStruct.matchList.slice(0,i).map((row, k) => {
                return row[i-1-k];
            })
        )
    }));

    function getPlayerMatchList(matchListIndex: number): RRMatchObj[] {
        return (poolStruct.matchList[matchListIndex] ? poolStruct.matchList[matchListIndex] : []).concat(
            poolStruct.matchList.slice(0,matchListIndex).map((row, k) => {
                return row[matchListIndex-1-k];
            })
        )
    }

    const checkName = (n: number, obj: any, playerName?: string) => {
        if (obj?.name == playerName) {
            return n+1;
        } else {
            return n;
        }
    }

    function getPlayerStandings(plMatchList: RRMatchObj[]): number {
        // return value format: [match wins, match losses, game wins, game losses]
        let ret = [0, 0, 0, 0];
        ret[0] = plMatchList.reduce(
            (n, {winner}) => checkName(n, winner), 0
        );
        return 1;
    }
    
    useEffect(() => {
        console.log('use effect');
        setPoolStruct(bracketData);
    }, [bracketData])

    function determinePlacements(reset: boolean, poolData: RRPool): RRPool {
        console.log('finishing bracket');
        if (reset) {
            const places: number[] = [];
            return {...poolData, placements: places};
        } else {
            return {...poolData, placements: [1, 2, 3]};
        }
    }

    function setGameCount(rowId: number, maId: number, games1: number, games2: number): void {
        const prevGameCount: any = poolStruct.matchList[rowId][maId].gameCount;
        const newPool: RRPool = {...poolStruct, matchList: poolStruct!.matchList.map((row, index) => {
            if (index == rowId) {
                return row.map((ma, index2) => {
                    if (index2 == maId) {
                        // validate game count in component
                        // console.log('found match at '+rowId+', '+maId);
                        if (games1 == poolStruct.winsNeeded) {
                            return {...ma, winner:ma.p1,
                                loser:ma.p2,
                                gameCount: [games1, games2]};
                        } else if (games2 == poolStruct.winsNeeded) {
                            return {...ma, winner:ma.p2, loser:ma.p1, gameCount: [games1, games2]};
                        } else {
                            return {...ma, gameCount: [games1, games2]};
                        }
                    } else {
                        return ma;
                    }
                });
            } else {
                return row;
            }
        })}
        
        if (prevGameCount[0] >= poolStruct.winsNeeded || prevGameCount[1] >= poolStruct.winsNeeded) {
            if (games1 < poolStruct.winsNeeded && games2 < poolStruct.winsNeeded) {
                newPool.matchesFinished -= 1;
                if (newPool.matchesFinished == (newPool.playerList.length*(newPool.playerList.length-1))/2-1) {
                    setPoolStruct(determinePlacements(true, newPool));
                } else {
                    setPoolStruct(newPool);
                }
            }
        } else {
            if (games1 >= poolStruct.winsNeeded || games2 >= poolStruct.winsNeeded) {
                newPool.matchesFinished += 1;
                if (newPool.matchesFinished >= (newPool.playerList.length*(newPool.playerList.length-1))/2) {
                    setPoolStruct(determinePlacements(false, newPool));
                    //console.log(newPool.matchesFinished);
                } else {
                    setPoolStruct(newPool);
                }
            }
        }
        //console.log("new pool: "+newPool.matchList[rowId][maId].gameCount);
        //setPoolStruct(newPool);
    }

    function resetStandings() {
        console.log('resetStandings');
    }

    function calcStandings() {
        console.log('calcStandings');
    }

    return (
        <div className="tourney-holder">
                <Button onClick={() => { console.log(standingsList)}}>Debug</Button>
                <table className="rr-pool-holder">
                    <tbody> 
                        <tr>
                            <td className="rr-name-holder">{poolStruct.matchesFinished}</td>
                            {poolStruct.playerList.map((e, i) => {
                                return <td className="rr-name-holder" key={i}>
                                            {e.name}
                                        </td>
                            })}
                            <td>
                                Standings
                            </td>
                            <td>
                                Place
                            </td>
                        </tr>
                        {poolStruct.playerList?.map((e, i) => (
                                <tr key={i}>
                                    <td>
                                        {e.name}
                                    </td>
                                    {poolStruct.playerList.map((f, j) => (
                                            <React.Fragment key={j}>
                                                { i==j? <EmptyRRMatch key={j}/> :
                                                    <RRMatch 
                                                        key={j}
                                                        secondScoreName={f.name}
                                                        matchInfo={poolStruct.matchList[Math.min(i, j)][Math.max(i, j)-Math.min(i,j)-1]}
                                                        setGameCount={setGameCount}
                                                        pos={[Math.min(i, j), Math.max(i, j)-Math.min(i,j)-1]}
                                                        winsNeeded={poolStruct.winsNeeded}
                                                    />
                                                }
                                            </React.Fragment>
                                    ))}
                                    <RRStanding matches={standingsList[i]} matchRow={poolStruct.matchList[i] || []}
                                        matchCol={poolStruct.matchList.slice(0,i).map((row, k) => {
                                            return row[i-1-k];
                                            })}
                                        playerName={e.name}
                                    />
                                    <td>
                                        {poolStruct.placements[i]? poolStruct.placements[i] : '-'}
                                    </td>
                                </tr>      
                            ))
                        }
                    </tbody>
                </table>
        </div>
    );
}