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
  Data: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  // Data: [
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
    if (game.Data[iRandom][jRandom] == 0) {
      game.Data[iRandom][jRandom] = 2;
      console.log(game.Data);
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

      if (game.Data[i][j] == 0) {
        return true;
      }
    }         
  }
  return false;
}

function updateElements() {
  for (let i = 0; i < arraySize; i++) {
    for (let j = 0; j < arraySize; j++) {  
      if (game.Data[i][j] != 0) {
        let updatedElement = elements.array[i][j];
        updatedElement.innerText = game.Data[i][j];

        updatedElement.classList.remove('num2');
        updatedElement.classList.remove('num4');
        updatedElement.classList.remove('num8');
        updatedElement.classList.remove('num16');
        updatedElement.classList.remove('num32');
        updatedElement.classList.remove('num64');
        updatedElement.classList.remove('num128');
        updatedElement.classList.remove('num254');
        updatedElement.classList.remove('num512');
        updatedElement.classList.remove('num1028');

        updatedElement.classList.add('num'+game.Data[i][j]);
      } else {
        let updatedElement = elements.array[i][j];
        updatedElement.innerText = "";

        updatedElement.classList.remove('num2');
        updatedElement.classList.remove('num4');
        updatedElement.classList.remove('num8');
        updatedElement.classList.remove('num16');
        updatedElement.classList.remove('num32');
        updatedElement.classList.remove('num64');
        updatedElement.classList.remove('num128');
        updatedElement.classList.remove('num254');
        updatedElement.classList.remove('num512');
        updatedElement.classList.remove('num1028');
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
      moveDown();
      game.setNewNumber();
      break;
    case 'ArrowUp':
      moveUp();
      game.setNewNumber();
      break;
    case 'ArrowLeft':
      moveLeft();
      game.setNewNumber();
      break;
    case 'ArrowRight':
      moveRight();
      game.setNewNumber();
      break;
  }
}

function moveLeft() {
  console.log("LEFT BEFORE", game.Data);

  for (let i = arraySize-1; i >=0; i--) {
    for (let j = arraySize-1; j >= 0; j--) {
      if (game.Data[i][j] != 0) {

        if (j > 0) {
          if (game.Data[i][j-1] == game.Data[i][j]) {
            console.log('1')
            game.Data[i][j-1] = game.Data[i][j-1] + game.Data[i][j];
            game.Data[i][j] = 0;
          } 
          else if (!(game.Data[i][j-1] != game.Data[i][j] && game.Data[i][j-1] > game.Data[i][j])) {
            console.log('3')
            game.Data[i][j-1] = game.Data[i][j];
            game.Data[i][j] = game.Data[i][j-1] - game.Data[i][j];
          }
        }
        console.log("LEFT AFTER", game.Data);
      }
    }
    updateElements();
  }
  
}

function moveRight() {
  console.log("RIGHT BEFORE", game.Data);

  for (let i = 0; i < arraySize; i++) {
    for (let j = 0; j < arraySize; j++) {

      if (game.Data[i][j] != 0) {
        if (j < 3) {
          if (game.Data[i][j+1] == game.Data[i][j]) {
            game.Data[i][j+1] = game.Data[i][j+1] + game.Data[i][j];
            game.Data[i][j] = game.Data[i][j+1] - 2*(game.Data[i][j]);
          } 
          else if (!(game.Data[i][j+1] != game.Data[i][j] && game.Data[i][j+1] > game.Data[i][j])) {
            game.Data[i][j+1] = game.Data[i][j];
            game.Data[i][j] = game.Data[i][j+1] - game.Data[i][j];
          }
        }
        console.log("RIGHT AFTER", game.Data);
      }
    console.log(game.Data[i][j])  
    }
    updateElements();
  } 
}

function moveDown() {
  var transposeData  = game.Data.map((el, i) => el.map((el2, j) => game.Data[j][i]));
  console.log(transposeData)

  for (let i = 0; i < arraySize; i++) {
    for (let j = 0; j < arraySize; j++) {

      if (transposeData[i][j] != 0) {
        if (j < 3) {
          if (transposeData[i][j+1] == transposeData[i][j]) {
            transposeData[i][j+1] = transposeData[i][j+1] + transposeData[i][j];
            transposeData[i][j] =transposeData[i][j+1] - 2*(transposeData[i][j]);
          } 
          else if (!(transposeData[i][j+1] != transposeData[i][j] && transposeData[i][j+1] > transposeData[i][j])) {
            transposeData[i][j+1] = transposeData[i][j];
            transposeData[i][j] = transposeData[i][j+1] - transposeData[i][j];
          }
        }
        // console.log("RIGHT AFTER", game.Data);
      }
    console.log(game.Data[i][j])  
    }
    game.Data = transposeData.map((el, i) => el.map((el2, j) => transposeData[j][i]));
    updateElements();
  } 

  
  // to do cycle for move down  (right of transposed matrix)
}

function moveUp() {
  var transposeData  = game.Data.map((el, i) => el.map((el2, j) => game.Data[j][i]));
  console.log(transposeData)

  for (let i = arraySize-1; i >=0; i--) {
    for (let j = arraySize-1; j >= 0; j--) {
      if (transposeData[i][j] != 0) {

        if (j > 0) {
          if (transposeData[i][j-1] == transposeData[i][j]) {
            console.log('1')
            transposeData[i][j-1] = transposeData[i][j-1] + transposeData[i][j];
            transposeData[i][j] = 0;
          } 
          else if (!(transposeData[i][j-1] != transposeData[i][j] && transposeData[i][j-1] > transposeData[i][j])) {
            console.log('3')
            transposeData[i][j-1] = transposeData[i][j];
            transposeData[i][j] = transposeData[i][j-1] - transposeData[i][j];
          }
        }
        console.log("LEFT AFTER", transposeData);
      }
    }
    game.Data = transposeData.map((el, i) => el.map((el2, j) => transposeData[j][i]));
    updateElements();
  }

  
  // to do cycle for move up  (left of transposed matrix)
}
