import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';

export default function run_game(root, channel) {
    ReactDOM.render(<Game channel={channel}/>, root);
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.channel = props.channel;
        this.channel.join()
            .receive("ok", this.gotView.bind(this))
            .receive("error", resp => {console.log("Unable to join", resp)})
    }

    gotView(view) {
        this.setState(view.game);
        if (view.game.disabled) {
            setTimeout(() => {
                this.channel.push("match")
                    .receive("ok", this.gotView.bind(this));
            }, 1000);
        }
    }

    sendClick(id) {
        this.channel.push("click", {index: id})
            .receive("ok", this.gotView.bind(this));
    }

    sendNewGame() {
        this.channel.push("newGame")
            .receive("ok", this.gotView.bind(this));
    }

    render() {
        console.log("render", this.state)
        if (!this.state) {
            return "empty state"
        }
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-3">
                            <Tile index={this.state.tiles[0].index} value={this.state.tiles[0].value}
                                flipped={this.state.tiles[0].flipped} matched={this.state.tiles[0].matched}
                                flip={this.sendClick.bind(this)}/>
                        </div>
                        <div className="col-3">
                            <Tile index={this.state.tiles[1].index} value={this.state.tiles[1].value}
                                flipped={this.state.tiles[1].flipped} matched={this.state.tiles[1].matched}
                                flip={this.sendClick.bind(this)}/>
                        </div>
                        <div className="col-3">
                            <Tile index={this.state.tiles[2].index} value={this.state.tiles[2].value}
                                flipped={this.state.tiles[2].flipped} matched={this.state.tiles[2].matched}
                                flip={this.sendClick.bind(this)}/>
                        </div>
                        <div className="col-3">
                            <Tile index={this.state.tiles[3].index} value={this.state.tiles[3].value}
                                flipped={this.state.tiles[3].flipped} matched={this.state.tiles[3].matched}
                                flip={this.sendClick.bind(this)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <Tile index={this.state.tiles[4].index} value={this.state.tiles[4].value}
                                flipped={this.state.tiles[4].flipped} matched={this.state.tiles[4].matched}
                                flip={this.sendClick.bind(this)}/>
                        </div>
                        <div className="col-3">
                            <Tile index={this.state.tiles[5].index} value={this.state.tiles[5].value}
                                flipped={this.state.tiles[5].flipped} matched={this.state.tiles[5].matched}
                                flip={this.sendClick.bind(this)}/>
                        </div>
                        <div className="col-3">
                            <Tile index={this.state.tiles[6].index} value={this.state.tiles[6].value}
                                flipped={this.state.tiles[6].flipped} matched={this.state.tiles[6].matched}
                                flip={this.sendClick.bind(this)}/>
                        </div>
                        <div className="col-3">
                            <Tile index={this.state.tiles[7].index} value={this.state.tiles[7].value}
                                flipped={this.state.tiles[7].flipped} matched={this.state.tiles[7].matched}
                                flip={this.sendClick.bind(this)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <Tile index={this.state.tiles[8].index} value={this.state.tiles[8].value}
                                flipped={this.state.tiles[8].flipped} matched={this.state.tiles[8].matched}
                                flip={this.sendClick.bind(this)}/>
                        </div>
                        <div className="col-3">
                            <Tile index={this.state.tiles[9].index} value={this.state.tiles[9].value}
                                flipped={this.state.tiles[9].flipped} matched={this.state.tiles[9].matched}
                                flip={this.sendClick.bind(this)}/>
                        </div>
                        <div className="col-3">
                            <Tile index={this.state.tiles[10].index} value={this.state.tiles[10].value}
                                flipped={this.state.tiles[10].flipped} matched={this.state.tiles[10].matched}
                                flip={this.sendClick.bind(this)}/>
                        </div>
                        <div className="col-3">
                            <Tile index={this.state.tiles[11].index} value={this.state.tiles[11].value}
                                flipped={this.state.tiles[11].flipped} matched={this.state.tiles[11].matched}
                                flip={this.sendClick.bind(this)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <Tile index={this.state.tiles[12].index} value={this.state.tiles[12].value}
                                flipped={this.state.tiles[12].flipped} matched={this.state.tiles[12].matched}
                                flip={this.sendClick.bind(this)}/>
                        </div>
                        <div className="col-3">
                            <Tile index={this.state.tiles[13].index} value={this.state.tiles[13].value}
                                flipped={this.state.tiles[13].flipped} matched={this.state.tiles[13].matched}
                                flip={this.sendClick.bind(this)}/>
                        </div>
                        <div className="col-3">
                            <Tile index={this.state.tiles[14].index} value={this.state.tiles[14].value}
                                flipped={this.state.tiles[14].flipped} matched={this.state.tiles[14].matched}
                                flip={this.sendClick.bind(this)}/>
                        </div>
                        <div className="col-3">
                            <Tile index={this.state.tiles[15].index} value={this.state.tiles[15].value}
                                flipped={this.state.tiles[15].flipped} matched={this.state.tiles[15].matched}
                                flip={this.sendClick.bind(this)}/>
                        </div>
                    </div>
                </div>
                <div>
                    <p>Attempts: {this.state.guesses}</p>
                    <Button onClick={() => this.sendNewGame()}>New Game</Button>
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

