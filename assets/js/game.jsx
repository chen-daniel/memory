import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';

export default function run_game(root) {
  ReactDOM.render(<Game side={0}/>, root);
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tiles: this.generateTiles(),
            guesses: 0,
            firstGuessIndex: -1,
            secondGuess: false,
            gameOver: false
        };
        this.checkMatch = this.checkMatch.bind(this);
        this.resetBoard = this.resetBoard.bind(this);
        this.newGame = this.newGame.bind(this);
    }

    generateTiles() {
        var tiles = [];
        var characters = 'AABBCCDDEEFFGGHH'.split('');
        for (var i = 0; i < 16; i++) {
            var randomNum =  Math.floor(Math.random() * characters.length);
            tiles[i] = { index: i,
                         value: characters[randomNum],
                         flipped: false,
                         matched: false
                       };
            characters.splice(randomNum, 1);
        }
        return tiles;
    }

    flip(index) {
        if (this.state.secondGuess == -1) {
            return;
        }
        let xs = $.extend({}, this.state);
        xs.tiles[index].flipped = true;
        if (this.state.secondGuess) {
            xs.secondGuess = -1;
            this.setState(xs);
            setTimeout(() => { this.checkMatch(index); }, 1000);
        }
        else {
            xs.firstGuessIndex = index;
            xs.secondGuess = true;
            this.setState(xs);
        }
    }

    checkMatch(secondIndex) {
        let xs = $.extend({}, this.state);
        if (xs.tiles[xs.firstGuessIndex].value == xs.tiles[secondIndex].value) {
            xs.tiles[xs.firstGuessIndex].matched = true;
            xs.tiles[secondIndex].matched = true;
            let flag = true;
            for (var i = 0; i < 16; i++) {
                if (xs.tiles[i].matched == false) {
                    flag = false;
                    break;
                }
            }
            if (flag == true) {
                xs.gameOver = true;
            }
        }
        else {
            xs.tiles[xs.firstGuessIndex].flipped = false;
            xs.tiles[secondIndex].flipped = false;
        }
        xs.firstGuessIndex = -1;
        xs.secondGuess = false;
        xs.guesses = xs.guesses + 1;
        this.setState(xs);
    }

    resetBoard() {
        let xs = $.extend({}, this.state);
        for (var i  = 0; i < 16; i++) {
            xs.tiles[i].matched = false;
            xs.tiles[i].flipped = false;
        }
        xs.guesses = 0;
        xs.firstGuessIndex = -1;
        xs.secondGuess = false;
        xs.gameOver = false;
        this.setState(xs);
    }

    newGame() {
        let xs = {
            tiles: this.generateTiles(),
            guesses: 0,
            firstGuessIndex: -1,
            secondGuess: false,
            gameOver: false
        };
        this.setState(xs);
    }


    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-3">
                            <Tile index={this.state.tiles[0].index} value={this.state.tiles[0].value}
                                flipped={this.state.tiles[0].flipped} matched={this.state.tiles[0].matched}
                                flip={this.flip.bind(this)}/>
                        </div>
                        <div className="col-3">
                            <Tile index={this.state.tiles[1].index} value={this.state.tiles[1].value}
                                flipped={this.state.tiles[1].flipped} matched={this.state.tiles[1].matched}
                                flip={this.flip.bind(this)}/>
                        </div>
                        <div className="col-3">
                            <Tile index={this.state.tiles[2].index} value={this.state.tiles[2].value}
                                flipped={this.state.tiles[2].flipped} matched={this.state.tiles[2].matched}
                                flip={this.flip.bind(this)}/>
                        </div>
                        <div className="col-3">
                            <Tile index={this.state.tiles[3].index} value={this.state.tiles[3].value}
                                flipped={this.state.tiles[3].flipped} matched={this.state.tiles[3].matched}
                                flip={this.flip.bind(this)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <Tile index={this.state.tiles[4].index} value={this.state.tiles[4].value}
                                flipped={this.state.tiles[4].flipped} matched={this.state.tiles[4].matched}
                                flip={this.flip.bind(this)}/>
                        </div>
                        <div className="col-3">
                            <Tile index={this.state.tiles[5].index} value={this.state.tiles[5].value}
                                flipped={this.state.tiles[5].flipped} matched={this.state.tiles[5].matched}
                                flip={this.flip.bind(this)}/>
                        </div>
                        <div className="col-3">
                            <Tile index={this.state.tiles[6].index} value={this.state.tiles[6].value}
                                flipped={this.state.tiles[6].flipped} matched={this.state.tiles[6].matched}
                                flip={this.flip.bind(this)}/>
                        </div>
                        <div className="col-3">
                            <Tile index={this.state.tiles[7].index} value={this.state.tiles[7].value}
                                flipped={this.state.tiles[7].flipped} matched={this.state.tiles[7].matched}
                                flip={this.flip.bind(this)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <Tile index={this.state.tiles[8].index} value={this.state.tiles[8].value}
                                flipped={this.state.tiles[8].flipped} matched={this.state.tiles[8].matched}
                                flip={this.flip.bind(this)}/>
                        </div>
                        <div className="col-3">
                            <Tile index={this.state.tiles[9].index} value={this.state.tiles[9].value}
                                flipped={this.state.tiles[9].flipped} matched={this.state.tiles[9].matched}
                                flip={this.flip.bind(this)}/>
                        </div>
                        <div className="col-3">
                            <Tile index={this.state.tiles[10].index} value={this.state.tiles[10].value}
                                flipped={this.state.tiles[10].flipped} matched={this.state.tiles[10].matched}
                                flip={this.flip.bind(this)}/>
                        </div>
                        <div className="col-3">
                            <Tile index={this.state.tiles[11].index} value={this.state.tiles[11].value}
                                flipped={this.state.tiles[11].flipped} matched={this.state.tiles[11].matched}
                                flip={this.flip.bind(this)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <Tile index={this.state.tiles[12].index} value={this.state.tiles[12].value}
                                flipped={this.state.tiles[12].flipped} matched={this.state.tiles[12].matched}
                                flip={this.flip.bind(this)}/>
                        </div>
                        <div className="col-3">
                            <Tile index={this.state.tiles[13].index} value={this.state.tiles[13].value}
                                flipped={this.state.tiles[13].flipped} matched={this.state.tiles[13].matched}
                                flip={this.flip.bind(this)}/>
                        </div>
                        <div className="col-3">
                            <Tile index={this.state.tiles[14].index} value={this.state.tiles[14].value}
                                flipped={this.state.tiles[14].flipped} matched={this.state.tiles[14].matched}
                                flip={this.flip.bind(this)}/>
                        </div>
                        <div className="col-3">
                            <Tile index={this.state.tiles[15].index} value={this.state.tiles[15].value}
                                flipped={this.state.tiles[15].flipped} matched={this.state.tiles[15].matched}
                                flip={this.flip.bind(this)}/>
                        </div>
                    </div>
                </div>
                <div>
                    <p>Attempts: {this.state.guesses}</p>
                    <Button onClick={() => this.resetBoard()}>Reset</Button>
                    <Button onClick={() => this.newGame()}>New Game</Button>
                </div>
            </div>
        );
    }
}

function Tile(params) {
    if (params.matched) {
        return (
            <div className="solved tile"></div>
        )
    }
    else if (params.flipped) {
        return (
            <div className="tile">{params.value}</div>
        )
    }
    else {
        return (
            <div className="tile" onClick={() => params.flip(params.index)}>?</div>
        )
    }
}

