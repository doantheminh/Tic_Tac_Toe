import { useEffect, useState } from "react"
import Square from "./square"

const Board = () => {
    const [game, setGame] = useState([null, null, null, null, null, null, null, null, null])
    const [player, setPlayer] = useState(true)
    const [timer, setTimer] = useState(5)
    const [isGamesEnd, setIsGamesEnd] = useState(false);
    const [history, setHistory] = useState([])

    const handlePlay = (position) => {
        if (!checkWinner() && !isGamesEnd) {
            const newGame = game.slice()
            newGame[position] = player ? "X" : "O"
            setHistory([...history, newGame])
            setGame(newGame)
            setPlayer(!player)
            setTimer(5)

            if (checkWinner()) {
                setIsGamesEnd(true);
            }
        }

    }
    const resetGame = () => {
        setGame([null, null, null, null, null, null, null, null, null]);
        setPlayer(true);
        setTimer(5);
        setIsGamesEnd(false);
        setHistory([])
    };
    const goBack = () => {
        if (history.length > 0) {
            const prevGame = history[history.length - 1]
            setGame([...prevGame])
            setHistory(history.slice(0, -1))
            setPlayer(!player)
        }
    }
    const handleAutoPlay = () => {
        const emptyGame = game.map((item, index) => item ? null : index).filter(item => item !== null)
        const position = emptyGame[Math.floor(Math.random() * emptyGame.length)]
        handlePlay(position)
    }

    // handleAutoPlay()

    const listWinner = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]


    // game = [X, 0, 0, X, null, null, X, null, null]
    const checkWinner = () => {
        for (let i = 0; i < listWinner.length; i++) {
            const [p1, p2, p3] = listWinner[i]
            if (game[p1] === game[p2] && game[p2] === game[p3]) {
                return game[p1]
            }
        }
        return null
    }

    useEffect(() => {
        if (timer < 0) {
            handleAutoPlay()
        }
        const interval = setInterval(() => {
            if (checkWinner()) {
                setTimer(0)
            } else {
                setTimer(timer - 1)
            }

        }, 1000)


        return () => clearInterval(interval)
    }, [timer, game, player])

    return <>
        <div>
            {checkWinner() ? <div>
                <h2>Winner is: {checkWinner()}</h2>
                {checkWinner() ? <button onClick={resetGame}>reset</button> : ''}
                <h2>Loser is: {checkWinner() === 'X' ? 'O' : checkWinner() === 'O' ? 'X' : ''}</h2>
            </div> : <h2>Turn: {player ? 'X' : 'O'}</h2>}
            <button onClick={goBack}>Go back</button>

            <h2>Timer: {timer}</h2>
        </div>
        <div className="grid grid-cols-3 gap-2">
            <Square value={game[0]} handlePlay={() => handlePlay(0)} />
            <Square value={game[1]} handlePlay={() => handlePlay(1)} />
            <Square value={game[2]} handlePlay={() => handlePlay(2)} />
            <Square value={game[3]} handlePlay={() => handlePlay(3)} />
            <Square value={game[4]} handlePlay={() => handlePlay(4)} />
            <Square value={game[5]} handlePlay={() => handlePlay(5)} />
            <Square value={game[6]} handlePlay={() => handlePlay(6)} />
            <Square value={game[7]} handlePlay={() => handlePlay(7)} />
            <Square value={game[8]} handlePlay={() => handlePlay(8)} />
        </div>
    </>
}

export default Board