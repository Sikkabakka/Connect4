

export function createBoard(){
    let brett : Array<Array<number>> = []
    for(let i = 0; i <7; i++){
        brett.push(Array<number>(6).fill(0))
    }
    return brett
}


export function findBottomTile(column: Array<number>){

    for (let i = 5; i >-1; i--){
        if (column[i] === 0){
            return i;
        } 

    }
    return -1;
}
export function placePiece(board : Array<Array<number>>, team: number, index :number){
    let newboard: Array<Array<number>> = [];

    board.map((column, i) =>{
        
        if (i ===index){
            column[findBottomTile(column)] = team;
            newboard.push(column)
        }
        else{
            newboard.push(column)
        }
        
    })
    return newboard;
}




export function checkWin(brett: Array<Array<number>>){
    let checkboard = JSON.parse(JSON.stringify(brett));
    let firstboard: Array<Array<number>> = createBoard();
    let secondboard: Array<Array<number>> = createBoard();
    checkboard.map((column, index) => {
        column.map((element, elindex) =>{
            if (element ===1){
                secondboard[index][elindex] =0;
                firstboard[index][elindex] = 1;
            }
            else if(element ===-1){
                firstboard[index][elindex] =0;
                secondboard[index][elindex] =1;
            }
            else{
                firstboard[index][elindex] =0;
                secondboard[index][elindex] =0;
            }
        })
    })


    return (checkbitboard(firstboard) || checkbitboard(secondboard) )}


function checkbitboard(brett: Array<Array<number>>){
    let adjacent = BigInt(0);
    let bitboard = toBitboard(brett);

    adjacent =(bitboard &(bitboard >> BigInt(1)));
    if (adjacent &(adjacent>>BigInt(2))) return true;

    adjacent = (bitboard &(bitboard >>BigInt(6)));
    if (adjacent &(adjacent>>BigInt(12))) return true;

    adjacent = (bitboard &(bitboard>>BigInt(5)));
    if (adjacent &(adjacent>>BigInt(10))) return true;

    adjacent = (bitboard &(bitboard>>BigInt(7)));
    if (adjacent &(adjacent>>BigInt(14))) return true;

    return false;
}

function toBitboard(brett: Array<Array<number>>){
    const flatbrod = brett.flat()

    let bitboard = BigInt(0)
    for (let i = 0; i<flatbrod.length; i++){
        bitboard |= BigInt(flatbrod[i])<<BigInt(i)
    }

    return bitboard;
    
}