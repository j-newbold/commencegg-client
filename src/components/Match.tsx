import { useContext, useEffect, useState, useRef } from "react";
import { MatchObj } from '../utils/types';

export default function Match(props) {
    const [p1Win, setP1Win] = useState(false);
    const [p2Win, setP2Win] = useState(false);
    const [curMatch, setCurMatch] = useState(props.matchProp);

    const didMountP1 = useRef(0);
    const didMountP2 = useRef(0);

    useEffect(() => {
        setCurMatch(props.matchProp);
    }, [props.matchProp])

    useEffect(() => {
        if (didMountP1.current < 2) {
            didMountP1.current += 1;
        } else {
            if (props.p1Input == null) {
                setP1Win(false);
                setP2Win(false);
                setCurMatch({...curMatch, p1: null, winner: null});
                props.setWinner(null, props.rIndex, props.mIndex);
            } else {
                if (p1Win) {
                    //setCurMatch({...curMatch, p1: props.p1Input, winner: props.p1Input});
                    props.setWinner(curMatch.p1, props.rIndex, props.mIndex);
                } else {
                    setCurMatch({...curMatch, p1: props.p1Input});
                }
            }
        }
    }, [props.p1Input])

    useEffect(() => {
        if (didMountP2.current < 2) {
            didMountP2.current += 1;
        } else {
            if (props.p2Input == null) {
                setP2Win(false);
                setP1Win(false);
                setCurMatch({...curMatch, p2: null, winner: null});
                props.setWinner(null, props.rIndex, props.mIndex);
            } else {
                if (p2Win) {
                    //setCurMatch({...curMatch, p2: props.p2Input, winner: props.p2Input});
                    props.setWinner(curMatch.p2, props.rIndex, props.mIndex);
                } else {
                    setCurMatch({...curMatch, p2: props.p2Input});
                }
            }
        }
    }, [props.p2Input])

    const handleP1Check = () => {
        if (!p1Win) {
            if (p2Win) {
                setP2Win(!p2Win);
            }
            props.setWinner(curMatch.p1, props.rIndex, props.mIndex);
        } else {
            props.setWinner(null, props.rIndex, props.mIndex);
        }
        setP1Win(!p1Win);
    }

    const handleP2Check = () => {
        if (!p2Win) {
            if (p1Win) {
                setP1Win(!p1Win);
            }
            props.setWinner(curMatch.p2, props.rIndex, props.mIndex);
        } else {
            props.setWinner(null, props.rIndex, props.mIndex);
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