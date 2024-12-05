import { createContext, useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import Match from '../Match.tsx';
import Dropdown from 'react-bootstrap/Dropdown';
import { SingleBracket, MatchObj, Round, Player, RRPool, ElimBracket } from '../../utils/types.tsx';

export default function SEBracket({bracketData}: {bracketData: ElimBracket}) {
    const [bracketStruct, setBracketStruct] = useState<ElimBracket>(bracketData);

    useEffect(() => {
        setBracketStruct(bracketData);
    }, [bracketData])

    function setPlayerAndWinner (isP1: boolean, playerParam: Player, bInd: number, rInd: number, mInd: number): void{
        setBracketStruct((prevBracketStruct) => ({ bracketList: prevBracketStruct.bracketList.map((br, ind1) => {
            if (bInd == ind1) {
                return {
                    ...br, roundList: br.roundList.map((rd, index) => {
                        if (rInd == index) {
                            return { ...rd, matchList: rd.matchList.map((ma, ind) => {
                                if (mInd == ind) {
                                    if (isP1) {
                                        console.log('set player and winner return: '+playerParam?.name);
                                        return { ...ma, p1:playerParam, winner:playerParam }
                                    } else {
                                        return { ...ma, p2:playerParam, winner:playerParam }
                                    }
                                } else {
                                    return ma;
                                }
                            })};
                        } else {
                            return rd;
                        }
                    })
                }
            } else {
                return br;
            }
        })}));
    }

    function setPlayer (isP1: boolean, playerParam: Player, bInd: number, rInd: number, mInd: number): void{
        setBracketStruct((prevBracketStruct) => ({ bracketList: prevBracketStruct.bracketList.map((br, ind1) => {
            if (bInd == ind1) {
                return {
                    ...br, roundList: br.roundList.map((rd, index) => {
                        if (rInd == index) {
                            return { ...rd, matchList: rd.matchList.map((ma, ind) => {
                                if (mInd == ind) {
                                    if (isP1) {
                                        console.log('set player return');
                                        return { ...ma, p1:playerParam }
                                } else {
                                    return { ...ma, p2:playerParam }
                                }
                        } else {
                            return ma;
                        }
                    })};
                } else {
                    return rd;
                }
                    })
                }
            } else {
                return br;
            }
            })
        }))}
    
    function setMatchResult (winner: Player, loser: Player, bInd: number, rInd: number, mInd: number): void {
        //const newMatchPointer = { ...matchPointer, winner: matchPointer?.p1 || null };
        setBracketStruct({ ...bracketStruct, bracketList: bracketStruct.bracketList.map((br, ind1) => {
            if (bInd == ind1) {
                return {
                    ...br, roundList: br.roundList.map((rd, index) => {
                        if (rInd == index) {
                            return { ...rd, matchList: rd.matchList.map((ma, ind) => {
                                if (mInd == ind) {
                                    return { ...ma, winner:winner, loser:loser }
                                } else {
                                    return ma;
                                }
                            })};
                        } else {
                            return rd;
                        }
                    })
                }
            } else {
                return br;
            }
            })
        })
    }

    return (
        <div className='tourney-holder'>
            Tournament: {bracketStruct?.bracketList.map((br, bIndex) => (
                <div className="bracket" key={String(bIndex)}
                    style={{
                        top: String(500*bIndex)+'px',
                        position: 'absolute'
                }}>
                    Bracket {bIndex+1} {br.roundList.map((rd, rIndex) => (
                    <div className='round' key={String(rIndex)}
                        style={{
                            position: 'absolute',
                            left: String(240*rIndex)+'px',
                            top: '50px',
                            width: '200px'
                    }}>
                        Round {rIndex+1}
                        {rd.matchList?.map((ma, ind) => (
                            <Match
                                key={String(ind)}
                                style={{
                                    position: 'absolute',
                                    top: String(100*ind+50)+'px',
                                    left: '0px',
                                    width: '200px'
                                }}
                                p1Input={ma.p1Input? ma.p1Input[3] ? bracketStruct.bracketList[ma.p1Input[0]].roundList[ma.p1Input[1]].matchList[ma.p1Input[2]].winner 
                                    : bracketStruct.bracketList[ma.p1Input[0]].roundList[ma.p1Input[1]].matchList[ma.p1Input[2]].loser 
                                    : null}
                                p2Input={ma.p2Input? ma.p2Input[3] ? bracketStruct.bracketList[ma.p2Input[0]].roundList[ma.p2Input[1]].matchList[ma.p2Input[2]].winner 
                                    : bracketStruct.bracketList[ma.p2Input[0]].roundList[ma.p2Input[1]].matchList[ma.p2Input[2]].loser 
                                    : null}
                                bIndex={bIndex}
                                rIndex={rIndex}
                                mIndex={ind}
                                matchProp={ma}
                                setWinner={setMatchResult}
                                setPlayer={setPlayer}
                                setPlayerAndWinner={setPlayerAndWinner}
                            />
                        ))}
                    </div>
                ))}
                </div>
            ))}
        </div>
        
    );
}



