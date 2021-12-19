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
function movePiece(startPos, endPos) {
  var currentPiece = document.querySelector(`#${startPos}`).children[0];
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
