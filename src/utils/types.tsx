export type Player = {
    seed: number;
    name: string;
    isHuman: boolean;
}

export type MatchObj = {
    p1?: Player | null;
    p2?: Player | null;
    winner: Player | null;
    loser: Player | null;
    p1Input: [number, number, boolean] | null;
    p2Input: [number, number, boolean] | null;
    matchId: number;
}

export type Round = {
    matchList: MatchObj[];
    roundId: number;
}

export type Bracket = {
    // phaseInput
    // entrants: Player[];
    roundList: Round[];
    // results: Player[];
    // phaseOutput
}

export type RRMatchObj = {
    p1?: Player | null;
    p2?: Player | null;
    winner?: Player | null;
    loser?: Player | null;
    
    gameCount: [number, number];
}

export type RRPool = {

    playerList: Player[];

    resultsList: number[][];

    placements: (number | null)[];

    matchList: RRMatchObj[][];

    winsNeeded: number;

    matchesFinished: number;
}