import React from 'react'
import './Playbox.css'
import rock from './rock.png';
import paper from './paper.png';
import scissor from './scissor.png';
import victory from './victory.jpg'
import { useState } from 'react';

const obj = {
    computerSelection: rock,
    cSelect: "rock"
}
function findX(x) {
    switch (x) {
        case 0:
            obj.computerSelection = rock
            obj.cSelect = "rock"
            break;
        case 1:
            obj.computerSelection = paper
            obj.cSelect = "paper"
            break;
        case 2:
            obj.computerSelection = scissor
            obj.cSelect = "scissor"
            break;
        default:
    }
}

var roundCount = 0
export default function Playbox() {
    const [selection, setSelection] = useState("Pick One!");
    const [playerScoreCount, setPlayerScoreCount] = useState(0);
    const [computerScoreCount, setComputerScoreCount] = useState(0);
    const [readyState, setReadyState] = useState(false);
    const [copmselectionHead, setCopmselectionHead] = useState("Waiting For Your Selection!");

    const handleImageOnClick = (item) => {
        setSelection(`Your choice : ${item}!`)
        var x = Math.floor(Math.random([1, 2, 3]) * [1, 2, 3].length)
        findX(x)
        setReadyState(true)
        roundCount = roundCount + 1;
        try {
            document.getElementById("computerImg").src = obj.computerSelection;
        } catch (e) {

        } finally {
            setCopmselectionHead(`Computer selects :${obj.cSelect}!`)
            setAllCounts(item, obj.cSelect);
            document.getElementById("roundH1").innerText = roundCount;
            if (roundCount === 20) {
                if (playerScoreCount === computerScoreCount) {
                    document.getElementById("roundH1").innerText = "It's Tie Try Again!";
                    document.getElementById("rockImg").style.pointerEvents = 'none';
                    document.getElementById("paperImg").style.pointerEvents = 'none';
                    document.getElementById("scissorImg").style.pointerEvents = 'none';
                } else if (playerScoreCount > computerScoreCount) {
                    document.getElementById("roundH1").innerText = "Player 1 Won";
                    document.getElementById("rockImg").style.display = "none";
                    document.getElementById("paperImg").style.display = "none";
                    document.getElementById("scissorImg").style.display = "none";
                    document.getElementById("victoryImg").style.display = "block"

                } else {
                    document.getElementById("roundH1").innerText = "Computer Won";
                    document.getElementById("computerImg").style.display = "none";
                    document.getElementById("rockImg").style.pointerEvents = 'none';
                    document.getElementById("paperImg").style.pointerEvents = 'none';
                    document.getElementById("scissorImg").style.pointerEvents = 'none';
                    document.getElementById("ComputerVictoryImg").style.display = "block"

                }
                document.getElementById("tryAgainBtn").style.display = "block"
            }
        }

    }
    function setAllCounts(playerselection, computerSelection) {
        var vs = document.getElementById("vs")
        if (roundCount <= 20) {
            if (playerselection === computerSelection) {
                vs.innerText = "It's Tie";
                setComputerScoreCount(computerScoreCount)
                setPlayerScoreCount(playerScoreCount)
            }
            else if (playerselection === "rock") {
                if (computerSelection === "paper") {
                    setComputerScoreCount(computerScoreCount + 1)
                    vs.innerText = "PC won";
                } else {
                    setPlayerScoreCount(playerScoreCount + 1)
                    vs.innerText = "Player 1 won";
                }
            }
            else if (playerselection === "paper") {
                if (computerSelection === "scissor") {
                    setComputerScoreCount(computerScoreCount + 1)
                    vs.innerText = "PC won";
                } else {
                    setPlayerScoreCount(playerScoreCount + 1)
                    vs.innerText = "Player 1 won";
                }
            }
            else if (playerselection === "scissor") {
                if (computerSelection === "rock") {
                    setComputerScoreCount(computerScoreCount + 1)
                    vs.innerText = "PC won";

                } else {
                    setPlayerScoreCount(playerScoreCount + 1)
                    vs.innerText = "Player 1 won";
                }
            }
        }
    }
    const handleOnTryAgain = () => {
        setSelection("Pick One!")
        setPlayerScoreCount(0)
        setComputerScoreCount(0)
        setReadyState(false)
        setCopmselectionHead("Waiting For Your Selection!")
        roundCount = 0
        document.getElementById("roundH1").innerText = "No Rounds Yet!"
        document.getElementById("rockImg").style.display = "block";
        document.getElementById("rockImg").style.pointerEvents = 'auto';
        document.getElementById("paperImg").style.display = "block";
        document.getElementById("paperImg").style.pointerEvents = 'auto';
        document.getElementById("scissorImg").style.display = "block";
        document.getElementById("scissorImg").style.pointerEvents = 'auto';
        document.getElementById("ComputerVictoryImg").style.display = "none"
        document.getElementById("victoryImg").style.display = "none"
        document.getElementById("tryAgainBtn").style.display = "none"
        document.getElementById("vs").innerText = "VS"


    }
    return (
        <>
            <div className="container">
                <div className="head">
                    <h1>Rock Paper Scissor!</h1>
                </div>
                <div className="rounds">
                    <h1 id="roundH1"> No Rounds Yet!</h1>
                </div>
                <div className="main">
                    <div className="player-box">
                        <div className="player">
                            <div className="player-h1">
                                <h3>Player 1</h3>
                            </div>
                            <div className="images">
                                <img id='rockImg' src={rock} alt="" srcSet="" onClick={() => { handleImageOnClick("rock") }} />
                                <img id='paperImg' src={paper} alt="" srcSet="" onClick={() => { handleImageOnClick("paper") }} />
                                <img id='scissorImg' src={scissor} alt="" srcSet="" onClick={() => { handleImageOnClick("scissor") }} />
                                <img id='victoryImg' style={{ display: "none" }} src={victory} alt="" srcSet="" />
                            </div>
                            <div className="player-pick-1">
                                <h3 id='player-pick-1-h3'>{selection}</h3>
                            </div>
                        </div>
                        <h2 className='scoreH2'>{playerScoreCount}</h2>
                    </div>
                    <div className="vs">
                        <p id='vs'>VS</p>
                    </div>
                    <div className="computer-box">
                        <div className="computer">
                            <div className="player-h1">
                                <h3>Computer</h3>
                            </div>
                            {readyState && <div className="images">
                                <img id='computerImg' src={obj.computerSelection} alt="" srcSet="" />
                                <img id='ComputerVictoryImg' style={{ display: "none" }} src={victory} alt="" srcSet="" />
                            </div>}
                            <div className="player-pick-1">
                                <h3 style={{ textAlign: "center" }}>{copmselectionHead}</h3>
                            </div>
                        </div>
                        <h2 className='scoreH2'>{computerScoreCount}</h2>
                    </div>
                </div>
                <div className="buttonDiv">
                    <button id='tryAgainBtn' className="tryAgainBtn" onClick={handleOnTryAgain}>Try Again!</button>
                </div>
                <footer className='footer'>Made with ❤️ by ChaitanyGhadigaonkar</footer>
            </div>
        </>
    )
}
