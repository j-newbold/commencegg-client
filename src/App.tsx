import { createContext, useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Match from './components/Match.tsx';
import Dropdown from 'react-bootstrap/Dropdown';
import { ElimBracket, MatchObj, Round, Player, RRPool } from './utils/types.tsx';
import SEBracket from './components/brackets/SEBracket.tsx';
import { createElimBracket, createRRPool } from './utils/initBrackets.tsx';
import RRPoolComponent from './components/brackets/RRPool.tsx';

function randStr() {
    return (Math.random() + 1).toString(36).substring(7);
}

function App() {
    const [numPlayers, setNumPlayers] = useState(7);
    const [numLosses, setNumLosses] = useState(3);
    const [bracketType, setBracketType] = useState<String>('Double Elimination');
    const [bracketComponent, setBracketComponent] = useState((<div>No bracket to display</div>));

    const handleBracketType = (event: any) => {
        setBracketType(event);
    };

    const createBracket = () => {
        if (bracketType == 'Single Elimination') {
            const initialData: ElimBracket = createElimBracket(numPlayers, 1);
            setBracketComponent(<SEBracket bracketData={initialData}/>);
        }
        else if (bracketType == 'Double Elimination') {
            const initialData: ElimBracket = createElimBracket(numPlayers, 2);
            setBracketComponent(<SEBracket bracketData={initialData}/>);
        } /* else if (bracketType == 'Custom Elimination') {
            if (typeof(numLosses) == 'number') {
                const initialData: ElimBracket = createElimBracket(numPlayers, numLosses);
                setBracketComponent(<SEBracket bracketData={initialData}/>);
            } else {
                setBracketComponent(<div>error: enter number of elimination losses!</div>)
            }
        } */ else if (bracketType == 'Round Robin') {
            const initialData: RRPool = createRRPool(numPlayers);
            setBracketComponent(<RRPoolComponent bracketData={initialData}/>);
        } else {
            setBracketComponent(<div>This tournament format is not yet supported</div>)
        }

        return (<div>No bracket to display</div>);
    }

    return (
        <>
            <Navbar className="bsnavbar">
                <Nav>
                <Nav.Link>Navbar goes here</Nav.Link>
                </Nav>
            </Navbar>
            <input type="number" value={numPlayers}
                onChange={e => setNumPlayers(parseInt(e.target.value))}/>
            <Dropdown onSelect={handleBracketType} id="dropdown-basic-button" title="Dropdown button">
                <Dropdown.Toggle variant='success' id='dropdown-basic'>
                    {bracketType}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item eventKey="Single Elimination">Single Elimination</Dropdown.Item>
                    <Dropdown.Item eventKey="Double Elimination">Double Elimination</Dropdown.Item>
                    {/* <Dropdown.Item eventKey="Custom Elimination">Custom Elimination</Dropdown.Item> */}
                    <Dropdown.Item eventKey="Round Robin">Round Robin</Dropdown.Item>
                    <Dropdown.Item eventKey="Swiss">Swiss</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            {/* {bracketType == 'Custom Elimination'?
                <input type='number' value={numLosses}
                    onChange={e => setNumLosses(parseInt(e.target.value))}/> : <></>} */}
            <Button variant="success" onClick={createBracket}>Submit</Button>
            {bracketComponent}
            
        </>
    );
}

export default App;