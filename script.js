var tileSelected = false;
var selected = false;
var turn = 1;
var tiles = document.querySelectorAll('.tile');
for (let i = 0; i < tiles.length; i++) {
  tiles[i].id = `tile${i + 1}`;
  tiles[i].addEventListener('click', (e) => {
    var piece = tiles[i].id;
    toggleSelected(piece);
  })
}
function toggleSelected(target) {
  if (!tileSelected) {
    tileSelected = target;
    selected = true;
  } else if (tileSelected == target) {
    tileSelected = false;
    selected = false;
  }
  if (tileSelected != target) {
    movePiece(tileSelected, target);
    tileSelected = false;
    selected = false;
  }
}
var pieceTypes = ['pawn', 'knight', 'bishop', 'rook', 'queen', 'king'];
function movePiece(startPos, endPos) {
  var posDelta = endPos.split('tile')[1] - startPos.split('tile')[1];
  var currentPiece = document.querySelector(`#${startPos}`).children[0];
  var validMove;
  for (let i = 0; i < pieceTypes.length; i++) {
    if (currentPiece.classList.contains(`fa-chess-${pieceTypes[i]}`)) {
      if (pieceTypes[i] == 'pawn') {
        var color;
        if (currentPiece[i].classList.contains('light')) {
          color = 'light';
        } else {
          color = 'dark';
        }
        validMove = pawnMoveValid(color, document.querySelector(`#${endPos}`), posDelta);
      }
    }
  }
  if (currentPiece == undefined) {
    console.error("Error. Invalid play detected.");
    alert("Error. Invalid play detected.");
    alert("Restarting game...");
    location.reload();
  }
  if (currentPiece.classList.contains(turn == 1 ? 'light' : 'dark')) {
    var piece = document.querySelector(`#${startPos}`).innerHTML;
    document.querySelector(`#${startPos}`).innerHTML = '';
    document.querySelector(`#${endPos}`).innerHTML = piece;
  }
  if (turn == 1 && currentPiece.classList.contains('light')) {
    turn = 0;
  } else if (turn == 0 && currentPiece.classList.contains('dark')) {
    turn = 1;
  }
}
function pawnMoveValid(color, destination, delta) {
  var allowedDelta;
  if (color == 'light') {
    allowedDelta = -8;
  } else if (color == 'dark') {
    allowedDelta = 8;
  }
  var hit = destination.innerHTML != '' ? true : false;
  if (delta == allowedDelta || hit) {
    return true;
  }
  return false;
}
