import { createContext, useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import Match from '../Match.tsx';
import Dropdown from 'react-bootstrap/Dropdown';
import { Bracket, MatchObj, Round, Player, RRPool } from '../../utils/types.tsx';

export default function SEBracket({bracketData}: {bracketData: Bracket}) {
    const [bracketStruct, setBracketStruct] = useState<Bracket>(bracketData);

    useEffect(() => {
        setBracketStruct(bracketData);
    }, [bracketData])

    function setPlayerAndWinner (isP1: boolean, playerParam: Player, rInd: number, mInd: number): void{
        setBracketStruct({ ...bracketStruct, roundList: bracketStruct!.roundList.map((rd, index) => {
                if (rInd == index) {
                    return { ...rd, matchList: rd.matchList.map((ma, ind) => {
                        if (mInd == ind) {
                            if (isP1) {
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
        });
    }

    function setPlayer (isP1: boolean, playerParam: Player, rInd: number, mInd: number): void{
        setBracketStruct({ ...bracketStruct, roundList: bracketStruct!.roundList.map((rd, index) => {
                if (rInd == index) {
                    return { ...rd, matchList: rd.matchList.map((ma, ind) => {
                        if (mInd == ind) {
                            if (isP1) {
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
        });
    }
    
    function setMatchResult (winner: Player, rInd: number, mInd: number): void {
        //const newMatchPointer = { ...matchPointer, winner: matchPointer?.p1 || null };
        setBracketStruct({ ...bracketStruct, roundList: bracketStruct!.roundList.map((rd, index) => {
                if (rInd == index) {
                    return { ...rd, matchList: rd.matchList.map((ma, ind) => {
                        if (mInd == ind) {
                            return { ...ma, winner:winner }
                        } else {
                            return ma;
                        }
                    })};
                } else {
                    return rd;
                }
            })
        });
    }

    return (
        <div className="tourney-holder">Tournament: {bracketStruct?.roundList.map((rd, rIndex) => (
            <div className='round' key={String(rIndex)}
                style={{
                position: 'absolute',
                left: String(240*rd.roundId)+'px',
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
                        p1Input={ma.p1Input? ma.p1Input[2] ? bracketStruct.roundList[ma.p1Input[0]].matchList[ma.p1Input[1]].winner 
                            : bracketStruct.roundList[ma.p1Input[0]].matchList[ma.p1Input[1]].loser 
                            : null}
                        p2Input={ma.p2Input? ma.p2Input[2] ? bracketStruct.roundList[ma.p2Input[0]].matchList[ma.p2Input[1]].winner 
                            : bracketStruct.roundList[ma.p2Input[0]].matchList[ma.p2Input[1]].loser 
                            : null}
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
    );
}



