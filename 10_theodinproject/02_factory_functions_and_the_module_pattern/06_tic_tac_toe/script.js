    var board = ['','','','','','','','','']

    var win = [
        [0,1,2],
        [0,3,6],
        [0,4,8],
        [2,5,8],
        [2,4,6],
        [6,7,8],
        [3,4,5],
        [1,4,7]
    ];

    var turn = 'X';

    const nextTurn = () => turn == 'X' ? turn = 'O' : turn = 'X';

    const renderBoard = () => {
        var boardBox = '';

        boardBox += '<div class="tictactoe">';

        for( let i = 0; i < board.length; i++ )
        {
            boardBox += `<div class="row-item" id="${i}"></div>`;
        }
        boardBox += '</div>';

        return boardBox;
    }

    const addListener = () => {
        let boardItems = document.getElementsByClassName('row-item');

        var board = [];
        for ( let i = 0; i < boardItems.length; i++)
        {
            boardItems[i].addEventListener('click', function() {
                this.innerHTML = turn;

                getBoard();
                let data = getPosition()

                checkWin(data);

                nextTurn();

            }, { once: true })
        }
    }

    const getBoard = () => {
        let boardItems = document.getElementsByClassName('row-item');

        var board = []

        for( let i=0; i < boardItems.length; i++ )
        {
            boardItems[i].innerHTML;
        }

        return board;
    }


    const getPosition = () => {
        var items = document.getElementsByClassName('row-item');
        var position = [];
        for ( let i = 0; i < items.length; i++) {
            console.log(turn);
            if( items[i].innerHTML == turn ) {
                position.push(items[i].id);
            }

        }
        return position
    }

    const checkWin = ( data ) => {
        var position = new Map();
        position.set(data);


        // Check Rows
        if(position.has(0,1,2)) { console.log('YOU WON BOIIII'); }
        console.log(win);

        // if(data[0] == "0" && data[1] == "1" && data[2] == "2") {
        //     console.log('YOU WON BOIIII');
        //     return;
        // }

        console.log(position);
    }
document.getElementById('app').innerHTML = renderBoard(board);
addListener();
