import { useState, useEffect } from "react";
import { RRMatchObj } from "../utils/types";
import '../index.css';

export default function RRStanding({ matches, matchRow, matchCol, playerName }) {
    const [matchRowData, setMatchRowData] = useState<RRMatchObj[]>(matchRow);
    const [matchColData, setMatchColData] = useState<RRMatchObj[]>(matchCol);

    const [matchData, setMatchData] = useState<RRMatchObj[]>(matches);

    const [playerRecord, setPlayerRecord] = useState<[Number, Number]>();

    useEffect(() => {
        setMatchRowData(matchRow);
    }, [matchRow])

    useEffect(() => {
        setMatchColData(matchCol);
    }, [matchCol])

    useEffect(() => {
        setMatchData(matches);
    }, [matches])

    const checkName = (n, obj) => {
        if (obj?.name == playerName) {
            return n+1;
        } else {
            return n;
        }
    }

    return (
        <td>
            <span className="match-score">
                {matchData.reduce(
                    (n, {winner}) => checkName(n, winner), 0,
                )}
                {'-'}
                {matchData.reduce(
                    (n, {loser}) => checkName(n, loser), 0,
                )}
                {' '}
            </span>

            <span className="game-score">
                {'('}
                {matchData.reduce(
                    (n, {gameCount}) => n+gameCount[0], 0,
                )}
                {'-'}
                {matchData.reduce(
                    (n, {gameCount}) => n+gameCount[1], 0,
                )}
                {')'}
            </span>
        </td>
    );
}