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
  ],
};

var game = {
      Data: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  //   Data: [
  //   [2, 4, 8, 16],
  //   [0, 0, 0, 32],
  //   [2048, 0, 0, 64],
  //   [1024, 512, 256, 128],
  // ],
  // Data: [
  //   [0, 4, 2, 2],
  //   [0, 2, 2, 2],
  //   [8, 8, 8, 16],
  //   [8, 8, 4, 4],
  // ],
  // Data: [
  //   [0, 0, 8, 8],
  //   [4, 2, 8, 8],
  //   [2, 2, 8, 4],
  //   [2, 2, 16, 4],
  // ],
};

game.setStartNumbers = function () {
  for (let startCount = 0; startCount < 2; startCount++) {
    game.setNewNumber();
  }
};

game.setNewNumber = function () {
  var iRandom = Math.floor(Math.random() * arraySize);
  var jRandom = Math.floor(Math.random() * arraySize);

  if (hasEmptySection()) {
    if (game.Data[iRandom][jRandom] == 0) {
      game.Data[iRandom][jRandom] = 2;
      updateElements();
      return;
    } else {
      game.setNewNumber();
    }
  } else {
    alert("конец игры");
  }

  updateElements();
};

game.setStartNumbers();

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

        removeClasses(updatedElement.classList);

        updatedElement.classList.add("num" + game.Data[i][j]);
      } else {
        let updatedElement = elements.array[i][j];
        updatedElement.innerText = "";

        removeClasses(updatedElement.classList);
      }
    }
  }
}

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
    case "ArrowLeft":
      moveLeft();
      game.setNewNumber();
      break;
    case "ArrowRight":
      moveRight();
      game.setNewNumber();
      break;
  }
}

function moveLeft() {
  console.log("LEFT");
  console.table(game.Data);

  // sum tiles of array
  for (let i = 0; i < arraySize; i++) {
    for (let j = 0; j < arraySize; j++) {
      if (
        game.Data[i][j] == game.Data[i][j + 1] &&
        typeof game.Data[i][j + 1] != "undefined"
      ) {
        game.Data[i][j] = game.Data[i][j] + game.Data[i][j + 1];
        game.Data[i][j + 1] = 0;
      }
    }
  }

  //move left
  for (let i = 0; i < arraySize; i++) {
    var tilesArray = game.Data[i].filter(function (number) {
      return number != 0;
    });

    for (let j = 0; j < arraySize; j++) {
      while (tilesArray.length < arraySize) {
        tilesArray.push(0);
      }
    }
    game.Data[i] = tilesArray;
  }

  updateElements();
}

function moveRight() {
  console.log("RIGHT");
  console.table(game.Data);

  // sum tiles of array
  for (let i = 0; i < arraySize; i++) {
    for (let j = arraySize - 1; j >= 0; j--) {
      if (
        game.Data[i][j] == game.Data[i][j - 1] &&
        typeof game.Data[i][j - 1] != "undefined"
      ) {
        game.Data[i][j] = game.Data[i][j] + game.Data[i][j - 1];
        game.Data[i][j - 1] = 0;
      }
    }
  }

  //move right
  for (let i = 0; i < arraySize; i++) {
    var tilesArray = game.Data[i].filter(function (number) {
      return number != 0;
    });

    for (let j = 0; j < arraySize; j++) {
      while (tilesArray.length < arraySize) {
        tilesArray.unshift(0);
      }
    }
    game.Data[i] = tilesArray;
  }

  updateElements();
}

function moveDown() {
  var transposeData = game.Data.map((el, i) =>
    el.map((el2, j) => game.Data[j][i])
  );

  console.log("DOWN");
  console.table(transposeData);

  // sum tiles of array
  for (let i = 0; i < arraySize; i++) {
    for (let j = arraySize - 1; j >= 0; j--) {
      if (
        transposeData[i][j] == transposeData[i][j - 1] &&
        typeof transposeData[i][j - 1] != "undefined"
      ) {
        transposeData[i][j] = transposeData[i][j] + transposeData[i][j - 1];
        transposeData[i][j - 1] = 0;
      }
    }
  }

  //move down
  for (let i = 0; i < arraySize; i++) {
    var tilesArray = transposeData[i].filter(function (number) {
      return number != 0;
    });

    for (let j = 0; j < arraySize; j++) {
      while (tilesArray.length < arraySize) {
        tilesArray.unshift(0);
      }
    }
    transposeData[i] = tilesArray;
  }

  game.Data = transposeData.map((el, i) =>
    el.map((el2, j) => transposeData[j][i])
  );
  updateElements();
}

function moveUp() {
  //сделать сначала сложение всех клеток в нуправлении а потом свдиг

  var transposeData = game.Data.map((el, i) =>
    el.map((el2, j) => game.Data[j][i])
  );

  console.log("UP");
  console.table(transposeData);

  // sum tiles of array
  for (let i = 0; i < arraySize; i++) {
    for (let j = 0; j < arraySize; j++) {
      if (
        transposeData[i][j] == transposeData[i][j + 1] &&
        typeof transposeData[i][j + 1] != "undefined"
      ) {
        transposeData[i][j] = transposeData[i][j] + transposeData[i][j + 1];
        transposeData[i][j + 1] = 0;
      }
    }
  }

  //move up
  for (let i = 0; i < arraySize; i++) {
    var tilesArray = transposeData[i].filter(function (number) {
      return number != 0;
    });

    for (let j = 0; j < arraySize; j++) {
      while (tilesArray.length < arraySize) {
        tilesArray.push(0);
      }
    }
    transposeData[i] = tilesArray;
  }

  game.Data = transposeData.map((el, i) =>
    el.map((el2, j) => transposeData[j][i])
  );
  updateElements();
}


function removeClasses(classList){
  console.log(classList)
  classList.forEach( className => {
    if (className.indexOf('num') != -1) {
      classList.remove(className)
    }
  })
}