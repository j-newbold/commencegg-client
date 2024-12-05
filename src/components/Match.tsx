import { useContext, useEffect, useState, useRef } from "react";
import { MatchObj } from '../utils/types';

export default function Match(props: any) {
    const [p1Win, setP1Win] = useState(false);
    const [p2Win, setP2Win] = useState(false);
    const [curMatch, setCurMatch] = useState(props.matchProp);

    const didMountP1 = useRef(0);
    const didMountP2 = useRef(0);

    useEffect(() => {
        setCurMatch(props.matchProp);
        console.log('p1 new: '+props.matchProp.p1?.name);
        //console.log('mprop changed: ');
        //console.log('other p1input: '+props.p1Input)
    }, [props.matchProp])

    useEffect(() => {
        if (didMountP1.current < 1) {
            didMountP1.current += 1;
        } else {
            if (props.p1Input == null) {
                setP1Win(false);
                setP2Win(false);
                //setCurMatch({...curMatch, p1: null, winner: null});
                props.setPlayerAndWinner(true, null, props.bIndex, props.rIndex, props.mIndex);
            } else {
                if (p1Win) {
                    //setCurMatch({...curMatch, p1: props.p1Input, winner: props.p1Input});
                    props.setPlayerAndWinner(true, props.p1Input, props.bIndex, props.rIndex, props.mIndex);
                } else {
                    console.log('p1input effect');
                    props.setPlayer(true, props.p1Input, props.bIndex, props.rIndex, props.mIndex);
                    // here we need a props.setP1 method like we have in the above if statement
                }
            }
        }
    }, [props.p1Input])

    useEffect(() => {
        if (didMountP2.current < 2) {
            didMountP2.current += 1;
        } else {
            props.setPlayer(false, props.p2Input, props.bIndex, props.rIndex, props.mIndex);
            if (props.p2Input == null) {
                setP2Win(false);
                setP1Win(false);
                //setCurMatch({...curMatch, p2: null, winner: null});
                props.setPlayerAndWinner(false, null, props.bIndex, props.rIndex, props.mIndex);
            } else {
                if (p2Win) {
                    //setCurMatch({...curMatch, p2: props.p2Input, winner: props.p2Input});
                    //console.log(curMatch.p2.name);
                    props.setPlayerAndWinner(false, props.p2Input, props.bIndex, props.rIndex, props.mIndex);
                } else {
                    props.setPlayer(false, props.p2Input, props.bIndex, props.rIndex, props.mIndex);
                    //setCurMatch({...curMatch, p2: props.p2Input});
                }
            }
        }
    }, [props.p2Input])

    const handleP1Check = () => {
        if (!p1Win) {
            if (p2Win) {
                setP2Win(!p2Win);
            }
            props.setWinner(curMatch.p1, curMatch.p2, props.bIndex, props.rIndex, props.mIndex);
        } else {
            props.setWinner(null, null, props.bIndex, props.rIndex, props.mIndex);
        }
        setP1Win(!p1Win);
    }

    const handleP2Check = () => {
        if (!p2Win) {
            if (p1Win) {
                setP1Win(!p1Win);
            }
            props.setWinner(curMatch.p2, curMatch.p1, props.bIndex, props.rIndex, props.mIndex);
        } else {
            props.setWinner(null, null, props.bIndex, props.rIndex, props.mIndex);
        }
        setP2Win(!p2Win);
    }

    return (
        <>
            <div style={props.style} className="match-holder">
                <div>
                    <span>{curMatch?.p1?.name || 'Player 1'}</span>
                    <input
                        type="checkbox"
                        checked={p1Win}
                        onChange={handleP1Check}
                    />
                </div>
                <div>
                    <span>{curMatch?.p2?.name || 'Player 2'}</span>
                    <input
                        type="checkbox"
                        checked={p2Win}
                        onChange={handleP2Check}
                    />
                </div>
            </div>
        </>
    );
}