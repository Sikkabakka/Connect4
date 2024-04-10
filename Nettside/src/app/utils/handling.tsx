

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

function checkCanWin(brett: Array<Array<number>>, team: number){
    //gå gjennom moves å sjekk om checkWin er true hvis du gjør det movet
    brett.forEach(element => {

        let move =  findBottomTile(element)
        if (move != -1){
            if (checkWin(placePiece(brett, team, move))){
                return move;
        }
        }
    })
    return -1;
}
function checkWillLose(brett: Array<Array<number>>){
    //hvis han andre har mulighet til å vinne så blokker
    brett.forEach(element =>{
        let move =  findBottomTile(element);

        if (move != -1){   

            if (checkCanWin(placePiece(brett, -1, move), -1)){
                return move
            }
        }
    })
    return -1; 
}


function litenMinMax(brett: Array<Array<number>>,  depth: number, team: number){

    //skal ikke søke lengre en 3 moves
    if (depth == 0){
        return 0;
    }
    //hvis man kan vinne returner om du har vunnet
    if (checkCanWin(brett, team) != -1){
        return depth +1
    }
    //hvis draw returner 0 fordi det er "nøytralt"
    if (checkDraw(brett)){
        return 0;
    }

    let best_value = -1000
    let value = 0;

    //går gjennom hvert move det kan gjøre og gjøre rekursjon for å sjekke i dypden
    // er de de if setningene over som bestemmer om det blir noen verdier
    
    brett.forEach(element => {
        if (findBottomTile(element) != -1){
            let move = findBottomTile(element)
            //gjør movet og sjekker hva den beste verdien til motsanderen er, dette vil være det motsatte enn det denne spilleren får
            value = -1* (litenMinMax(placePiece(brett, -1, move), depth-1, team*(-1)))
           if (value > best_value){
                best_value = value;

           }
        }
    })
    return best_value;
}
// function removePiece(brett: Array<Array<number>>, team: number, index: number){
//     let removeIndex = (findBottomTile(brett[index]))

//     if (removeIndex == -1){

//     }
// }
function findBestMove(brett: Array<Array<number>>, team: number){

    let best_value = -100000;
    let best_move  = -1
    let value = 0;
    brett.forEach(element => {
        let move = findBottomTile(element)
        if (move != -1){
            value = litenMinMax(brett, 3, team)

            if (value > best_value){
                best_move = move
            }
        }
    })
    if (best_value = 0){
        return -1
    }
    else {
        return best_move
    }
}



export async function botPlacePiece(brett: Array<Array<number>>): Promise<number> {
    return new Promise(resolve => {
        let best_move = findBestMove(brett, 1)
        if (best_move != -1){
            resolve(best_move)
        }
        else{
            let c = Math.floor(Math.random() * 7);
            resolve(c);

        }
    });
}


export function checkDraw(brett: Array<Array<number>>){
    if (brett.flat().includes(0)){
        return false;
    }
    else 
    {return true;}
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

    console.log(toBitboard(secondboard).toString(2))
    return (checkbitboard(firstboard) || checkbitboard(secondboard) )}


function checkbitboard(brett: Array<Array<number>>){
    let adjacent = BigInt(0);
    let bitboard = toBitboard(brett);

    adjacent =(bitboard &(bitboard >> BigInt(1)));
    if (adjacent &(adjacent>>BigInt(2))) return true;

    adjacent = (bitboard &(bitboard >>BigInt(7)));
    if (adjacent &(adjacent>>BigInt(14))) return true;

    adjacent = (bitboard &(bitboard>>BigInt(6)));
    if (adjacent &(adjacent>>BigInt(12))) return true;

    adjacent = (bitboard &(bitboard>>BigInt(8)));
    if (adjacent &(adjacent>>BigInt(16))) return true;

    return false;
}

function toBitboard(brett: Array<Array<number>>){
    const flatbrod = brett.flat()
    let extra = 0;
    let bitboard = BigInt(0)
    for (let i = 0; i<flatbrod.length; i++){
        if (i%6=== 0){ 
            extra +=1;
            bitboard |= BigInt(flatbrod[i])<<BigInt(i+extra)
        }
        else{
            bitboard |= BigInt(flatbrod[i])<<BigInt(i +extra)
        }   
    }
    return bitboard;
    
}