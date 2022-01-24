import './chessBoard.css'

export function ChessBoard() {

    const tileNum = [1, 2, 3, 4, 5, 6, 7, 8]
    const tileRow = ["a", "b", "c", "d", "e", "f", "g", "h"]

    return (
        <div>
            {tileNum.map(t => <div className="tileColumn"></div>)}
            {tileRow.map(t => <div className="tileRow">
                <span className='tileRow' >{t}</span>
            </div>)}
        </div>
    )
}