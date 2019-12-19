let canvas = document.getElementById("game");
let width = canvas.width;
let height = canvas.height;
let ctx = canvas.getContext("2d");

let colorPicker = document.getElementById("colorpicker");
let colorSchemes = {
  blues: {
    dark: "#014023",
    light: "#05F2F2",
  },
  gameboy: {
    dark: "#285912",
    light: "#83A603",
  },
};

// Populate color-picker options.
let colorSchemeKeys = Object.keys(colorSchemes);
for (let i = 0; i < colorSchemeKeys.length; i++) {
  let colorOption = document.createElement("option");
  colorOption.value = colorSchemeKeys[i];
  colorOption.appendChild(document.createTextNode(colorSchemeKeys[i]));
  colorPicker.appendChild(colorOption);
}

// Default color scheme is the first one.
let colorScheme = colorSchemes[colorSchemeKeys[0]];

// Change color scheme when color-picker is used.
colorPicker.onchange = (e) => {
  colorScheme = colorSchemes[e.target.value];
};


let state = {
  board: [
    [0, 0, 0, 2, -2, 0, 0, 0],
    [1, 1, 1, 2, -2, -1, -1, -1],
    [1, 1, 1, 2, -2, -1, -1, -1],
    [0, 0, 0, 2, -2, 0, 0, 0],
  ],
};

function tick() {
  update();
  draw();
  requestAnimationFrame(tick);
}

function update() {
}

function draw() {
  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = colorScheme.light;
  ctx.fillRect(0, 0, width, height);
  
  const SQUARE_SIZE = 40;
  const SQUARE_PADDING = 8;
  const SQUARE_SPACE = SQUARE_SIZE + SQUARE_PADDING;
  for (let row = 0; row < state.board.length; row++) {
    for (let col = 0; col < state.board[row].length; col++) {
      if (state.board[row][col] == 0) {
        continue;
      }
      ctx.strokeStyle = colorScheme.dark;
      ctx.lineWidth = 4;
      
      let startX = width / 2 - ((SQUARE_SPACE * state.board[row].length) / 2);
      
      let startY = height / 2 - ((SQUARE_SPACE * state.board.length) / 2);

      let value = state.board[row][col];
      if (value < 0) {
        ctx.fillStyle = colorScheme.dark;
      } else {
        ctx.fillStyle = colorScheme.light;
      }
      ctx.fillRect(startX + col * SQUARE_SPACE,
                   startY + row * SQUARE_SPACE,
                   SQUARE_SIZE, SQUARE_SIZE);
      ctx.strokeRect(startX + col * SQUARE_SPACE,
                     startY + row * SQUARE_SPACE,
                     SQUARE_SIZE, SQUARE_SIZE);

      ctx.font = "bold 24px Roboto Mono";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      if (value > 0) {
        ctx.fillStyle = colorScheme.dark;
      } else {
        ctx.fillStyle = colorScheme.light;
      }
      ctx.fillText(Math.abs(state.board[row][col]).toString(),
                   startX + col * SQUARE_SPACE + SQUARE_SIZE / 2,
                   startY + row * SQUARE_SPACE + SQUARE_SIZE / 2);
    } 
  }
}

requestAnimationFrame(tick);
