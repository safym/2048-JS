const arraySize = 4;

bodyElement = document.getElementById("game");
addEventListener("keyup", moveNumbers);

var elements = {
  s1: document.getElementById("s1"),
  s2: document.getElementById("s2"),
  s3: document.getElementById("s3"),
  s4: document.getElementById("s4"),
  s5: document.getElementById("s5"),
  s6: document.getElementById("s6"),
  s7: document.getElementById("s7"),
  s8: document.getElementById("s8"),
  s9: document.getElementById("s9"),
  s10: document.getElementById("s10"),
  s11: document.getElementById("s11"),
  s12: document.getElementById("s12"),
  s13: document.getElementById("s13"),
  s14: document.getElementById("s14"),
  s15: document.getElementById("s15"),
  s16: document.getElementById("s16"),
  array: [
    [this.s1, this.s2, this.s3, this.s4],
    [this.s5, this.s6, this.s7, this.s8],
    [this.s9, this.s10, this.s11, this.s12],
    [this.s13, this.s14, this.s15, this.s16],
  ]
}

var game = {
  currentData: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  // currentData: [
  //   [99, 01, 02, 03],
  //   [10, 0, 12, 13],
  //   [20, 21, 22, 23],
  //   [30, 31, 32, 33],
  // ],
};

game.setNewNumber = function () {
  var iRandom = Math.floor(Math.random() * arraySize);
  var jRandom = Math.floor(Math.random() * arraySize);

  if (hasEmptySection()) {
    if (game.currentData[iRandom][jRandom] == 0) {
      game.currentData[iRandom][jRandom] = 2;
      console.log(game.currentData);
      updateElements();
      return;
    } else {
      game.setNewNumber();
    }
  } else {
    alert("конец игры")
  }

  updateElements();
};

function hasEmptySection() {
  for (var i = 0; i < arraySize; i++) {
    for (var j = 0; j < arraySize; j++) {
      console.log(i,j)
      console.log(game.currentData[i],[j])
      
      if (game.currentData[i][j] == 0) {
        return true;
      }
    }         
  }
  return false;
}

function updateElements() {
  for (let i = 0; i < arraySize; i++) {
    for (let j = 0; j < arraySize; j++) {  
      if (game.currentData[i][j] != 0) {
        console.log(i,j)
        let updatedElement = elements.array[i][j];
        updatedElement.innerText = game.currentData[i][j];
        updatedElement.classList.add('num'+game.currentData[i][j]);
      }
    }         
  }
}

game.setStartNumbers = function () {
  for (let startCount = 0; startCount < 2; startCount++) {
    game.setNewNumber();
  }
};

game.setStartNumbers();

function moveNumbers(event) {
  arrow = event.key;

  switch (arrow) {
    case 'ArrowDown':
      alert( 'Вниз' );
      break;
    case 'ArrowUp':
      alert( 'Вверх' );
      break;
    case 'ArrowLeft':
      alert( 'Влево' );
      break;
    case 'ArrowRight':
      alert( 'Вправо' );
      break;
  }

}
