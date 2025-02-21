let textContent = "A 6-inch (15 cm) grid covering each of the four black walls. White lines to points on the grids. Fourth wall: twenty-four lines from the center, twelve lines from the midpoint of each of the sides, twelve lines from each corner. (The length of the lines and their placement are determined by the drafter.)";
let lines = [];
let colorPicker, weightSlider, clearButton, undoButton;
let drawing = false;
let drawAreaSize = 600;
let drawAreaX, drawAreaY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorPicker = createColorPicker('#000000'); // Default black
  colorPicker.position(10, 460);
  
  weightSlider = createSlider(1, 10, 2);
  weightSlider.position(80, 460);
  
  clearButton = createButton('Clear Drawing');
  clearButton.position(10, 500);
  clearButton.mousePressed(() => lines = []);
  
  undoButton = createButton('Erase'); // changed to erase based off of function
  undoButton.position(120, 500);
  undoButton.mousePressed(() => lines.pop());
  
  drawAreaX = windowWidth / 2;
  drawAreaY = (windowHeight - drawAreaSize) / 2;

}

function draw() {
  background(0);
  
  // Draw text content separately to ensure it is unaffected
  push();
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(16);
  
  text(textContent, 10, 180, windowWidth / 2 - 10);
  pop();
  
  fill(255);
  noStroke();
  rect(drawAreaX, drawAreaY, drawAreaSize, drawAreaSize);
  
  // Draw previous lines
  for (let l of lines) {
    stroke(l.color);
    strokeWeight(l.weight);
    line(l.x1, l.y1, l.x2, l.y2);
  }
}

function mousePressed() {
  if (mouseX > drawAreaX && mouseX < drawAreaX + drawAreaSize && mouseY > drawAreaY && mouseY < drawAreaY + drawAreaSize) {
    drawing = true;
  }
}

function mouseDragged() {
  if (drawing) {
    // Constrain both current and previous mouse positions to the drawing area boundaries.
    let constrainedMouseX = constrain(mouseX, drawAreaX, drawAreaX + drawAreaSize);
    let constrainedMouseY = constrain(mouseY, drawAreaY, drawAreaY + drawAreaSize);
    let constrainedPmouseX = constrain(pmouseX, drawAreaX, drawAreaX + drawAreaSize);
    let constrainedPmouseY = constrain(pmouseY, drawAreaY, drawAreaY + drawAreaSize);
    
    lines.push({
      x1: constrainedPmouseX, 
      y1: constrainedPmouseY,
      x2: constrainedMouseX, 
      y2: constrainedMouseY,
      color: colorPicker.value(),
      weight: weightSlider.value()
    });
  }
}

function mouseReleased() {
  drawing = false;
}
