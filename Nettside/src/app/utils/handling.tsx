import { findAllInRenderedTree } from "react-dom/test-utils";


export function createBoard(){
    let brett : Array<Array<number>> = []
    for(let i = 0; i <7; i++){
        brett.push(Array<number>(6).fill(0))
    }
    return brett
}

function deepCopy(board) {
    return board.map(row => row.slice());
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
    brett = deepCopy(brett)
    //gå gjennom moves å sjekk om checkWin er true hvis du gjør det movet
    brett.forEach(element => {

        let move =  findBottomTile(element)
        if (move != -1){
            if (checkWin(placePiece(brett, team, move))){
                return move;}
            removePiece(brett, move);
        }
    })
    return -1;
}
function checkWillLose(brett: Array<Array<number>>){
    //hvis han andre har mulighet til å vinne så blokker
    brett.forEach(element =>{
        let move = findBottomTile(element);

        if (move != -1){   

            if (checkCanWin(placePiece(brett, -1, move), -1)){
                return move
            }
        }
    })
    return -1; 
}


function litenMinMax(brett: Array<Array<number>>,  depth: number, team: number){
    brett = deepCopy(brett)
    //skal ikke søke lengre en 3 moves
    if (depth == 0){
        return 0;
    }
    //hvis man kan vinne returner om du har vunnet
    if (checkWin(brett)){
        console.log(team, "somebody has won")
        return depth +1
    }
    //hvis draw returner 0 fordi det er "nøytralt"
    if (checkDraw(brett)){
        console.log("it has been a draw")
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
                console.log("value was better", value)

                best_value = value;
           }
           removePiece(brett, move);
        }
    })
    console.log("returning value: ", best_value," depth:",  depth)
    return best_value;
}
function removePiece(brett: Array<Array<number>>, index: number){
    let removeIndex = findBottomTile(brett[index])

    if (removeIndex == -1){
        brett[index][5] == 0;
    }
    else {
        brett[index][removeIndex-1] == 0;
    }
    return;
}


function findBestMove(brett: Array<Array<number>>, team: number){
    console.log(brett)
    brett = deepCopy(brett)
    let best_value = -100000;
    let best_move  = -1
    let value = 0;

    brett.forEach((element, index) => {
        let move = findBottomTile(element)
        if (move != -1){
            if (checkWin(brett)){
                console.log(team, "somebody has won")
                return move
            }
            value = -1 *litenMinMax(placePiece(brett, team, move), 3, -1*team)
            
            if (value > best_value){
                best_move = index
            }
            removePiece(brett, move);
        }
        
    })
    if (best_value == 0){
        return -1
    }
    else {
        return best_move
    }
}

function checkColumn(brett: string, move : number){
    let counter = 0;
    for(let i = 0; i < brett.length; i++){
        if (parseInt(brett[i]) == move){
            counter++;
        }
    }
    if (counter < 6){
        return true
    }
    return false
}


export async function botPlacePiece(brett: string): Promise<number> {
    let move;
    let not_found_move = true;
    while(not_found_move){
        move = Math.floor(Math.random()*7) +1
        if (checkColumn(brett, move)){
            not_found_move = false

        }
    }
    await new Promise(resolve => setTimeout(resolve, 1000));

    return Number(move)
 
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