const arraySize = 4;

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
  score: document.getElementById("score"),
  btnUndo: document.getElementById("btnUndo"),
  btnNewGame: document.getElementById("btnNewGame"),
  array: [
    [this.s1, this.s2, this.s3, this.s4],
    [this.s5, this.s6, this.s7, this.s8],
    [this.s9, this.s10, this.s11, this.s12],
    [this.s13, this.s14, this.s15, this.s16],
  ],
};

var game = {
  score: 0,
  lastScore: 0,
  Data: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  lastData: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  undo() {
    game.Data = game.lastData;
    updateElements();
  },
  newGame() {
    var initialArray = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    this.Data = initialArray;
    this.lastData = initialArray;
    this.score = 0;
    this.lastScore = 0;
    updateElements();
    game.setStartNumbers();
  },
};

addEventListener("keyup", moveNumbers);
elements.btnUndo.addEventListener("click", function () {
  game.undo();
});
elements.btnNewGame.addEventListener("click", function () {
  game.newGame();
});

game.setStartNumbers = function () {
  for (let startCount = 0; startCount < 2; startCount++) {
    game.setNewNumber();
  }
  saveLastData();
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
  elements.score.innerText = game.score;

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
    case "ArrowDown":
      saveLastData();
      moveDown();
      game.setNewNumber();
      break;
    case "ArrowUp":
      saveLastData();
      moveUp();
      game.setNewNumber();
      break;
    case "ArrowLeft":
      saveLastData();
      moveLeft();
      game.setNewNumber();
      break;
    case "ArrowRight":
      saveLastData();
      moveRight();
      game.setNewNumber();
      break;
  }
}

function moveLeft() {
  var tilesArray = [];

  //  delete empty tiles
  for (let i = 0; i < arraySize; i++) {
    var tilesRow = game.Data[i].filter(function (number) {
      return number != 0;
    });
    tilesArray.push(tilesRow);
  }

  // sum tiles
  for (let i = 0; i < tilesArray.length; i++) {
    for (let j = 0; j < tilesArray[i].length; j++) {
      if (
        tilesArray[i][j] == tilesArray[i][j + 1] &&
        typeof tilesArray[i][j + 1] != "undefined"
      ) {
        tilesArray[i][j] = tilesArray[i][j] + tilesArray[i][j + 1];
        tilesArray[i][j + 1] = 0;

        game.score = game.score + tilesArray[i][j];
      }
    }
  }

  //move left
  for (let i = 0; i < arraySize; i++) {
    //  delete empty tiles 2
    var tilesRow = tilesArray[i].filter(function (number) {
      return number != 0;
    });
    tilesArray[i] = tilesRow;

    for (let j = 0; j < arraySize; j++) {
      while (tilesArray[i].length < arraySize) {
        tilesArray[i].push(0);
      }
    }
  }

  game.Data = tilesArray;
  updateElements();
}

function moveRight() {
  var tilesArray = [];

  //  delete empty tiles
  for (let i = 0; i < arraySize; i++) {
    var tilesRow = game.Data[i].filter(function (number) {
      return number != 0;
    });
    tilesArray.push(tilesRow);
  }

  // sum tiles
  for (let i = 0; i < tilesArray.length; i++) {
    for (let j = tilesArray[i].length - 1; j >= 0; j--) {
      if (
        tilesArray[i][j] == tilesArray[i][j - 1] &&
        typeof tilesArray[i][j - 1] != "undefined"
      ) {
        tilesArray[i][j] = tilesArray[i][j] + tilesArray[i][j - 1];
        tilesArray[i][j - 1] = 0;

        game.score = game.score + tilesArray[i][j];
      }
    }
  }

  //move right
  for (let i = 0; i < arraySize; i++) {
    //  delete empty tiles 2
    var tilesRow = tilesArray[i].filter(function (number) {
      return number != 0;
    });
    tilesArray[i] = tilesRow;

    for (let j = 0; j < arraySize; j++) {
      while (tilesArray[i].length < arraySize) {
        tilesArray[i].unshift(0);
      }
    }
  }

  game.Data = tilesArray;
  updateElements();
}

function moveDown() {
  var transposeData = game.Data.map((el, i) =>
    el.map((el2, j) => game.Data[j][i])
  );

  var tilesArray = [];

  //  delete empty tiles
  for (let i = 0; i < arraySize; i++) {
    var tilesRow = transposeData[i].filter(function (number) {
      return number != 0;
    });
    tilesArray.push(tilesRow);
  }

  // sum tiles
  for (let i = 0; i < tilesArray.length; i++) {
    for (let j = tilesArray[i].length - 1; j >= 0; j--) {
      if (
        tilesArray[i][j] == tilesArray[i][j - 1] &&
        typeof tilesArray[i][j - 1] != "undefined"
      ) {
        tilesArray[i][j] = tilesArray[i][j] + tilesArray[i][j - 1];
        tilesArray[i][j - 1] = 0;

        game.score = game.score + tilesArray[i][j];
      }
    }
  }

  //move down (for transposed array: move right)
  for (let i = 0; i < arraySize; i++) {
    //  delete empty tiles 2
    var tilesRow = tilesArray[i].filter(function (number) {
      return number != 0;
    });
    tilesArray[i] = tilesRow;

    for (let j = 0; j < arraySize; j++) {
      while (tilesArray[i].length < arraySize) {
        tilesArray[i].unshift(0);
      }
    }
  }

  game.Data = tilesArray.map((el, i) => el.map((el2, j) => tilesArray[j][i]));
  updateElements();
}

function moveUp() {
  var transposeData = game.Data.map((el, i) =>
    el.map((el2, j) => game.Data[j][i])
  );

  var tilesArray = [];

  //  delete empty tiles
  for (let i = 0; i < arraySize; i++) {
    var tilesRow = transposeData[i].filter(function (number) {
      return number != 0;
    });
    tilesArray.push(tilesRow);
  }

  // sum tiles
  for (let i = 0; i < tilesArray.length; i++) {
    for (let j = 0; j < tilesArray[i].length; j++) {
      if (
        tilesArray[i][j] == tilesArray[i][j + 1] &&
        typeof tilesArray[i][j + 1] != "undefined"
      ) {
        tilesArray[i][j] = tilesArray[i][j] + tilesArray[i][j + 1];
        tilesArray[i][j + 1] = 0;

        game.score = game.score + tilesArray[i][j];
      }
    }
  }

  //move up (for transposed array: move left)
  for (let i = 0; i < arraySize; i++) {
    //  delete empty tiles 2
    var tilesRow = tilesArray[i].filter(function (number) {
      return number != 0;
    });
    tilesArray[i] = tilesRow;

    for (let j = 0; j < arraySize; j++) {
      while (tilesArray[i].length < arraySize) {
        tilesArray[i].push(0);
      }
    }
  }

  game.Data = tilesArray.map((el, i) => el.map((el2, j) => tilesArray[j][i]));
  updateElements();
}

function saveLastData() {
  game.lastData = game.Data;
}

function removeClasses(classList) {
  classList.forEach((className) => {
    if (className.indexOf("num") != -1) {
      classList.remove(className);
    }
  });
}
