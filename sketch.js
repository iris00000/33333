let input;
let slider;
let button;
let dropdown;
let iframe;
let isBouncing = false;
let bounceOffsets = [];

function setup() { //這是一個設定函數，只會執行一次
  // 建立一個畫布 充滿整個視窗 顏色為 #cdb4db

  createCanvas(windowWidth, windowHeight);
  background('#cdb4db'); // 修改背景顏色
  
  // 建立一個輸入框
  input = createInput();
  input.position(10, 10);
  input.size(300, 50);
  input.style('font-size', '32px');
  
  // 建立一個滑桿
  slider = createSlider(12, 30, 12);
  slider.position(320, 10);
  slider.size(100, 20);
  
  // 建立一個按鈕
  button = createButton('跳動');
  button.position(430, 10);
  button.mousePressed(toggleBounce);

  // 建立一個下拉式選單
  dropdown = createSelect();
  dropdown.position(800, 10);
  dropdown.size(100, 30);
  dropdown.option('淡江大學');
  dropdown.option('教育科技學系');
  dropdown.changed(handleDropdownChange);

  // 建立一個 iframe
  iframe = createElement('iframe');
  iframe.position((windowWidth - (windowWidth - 20)) / 2, (windowHeight - (windowHeight / 2 - 20)) / 2);
  iframe.size(windowWidth - 20, windowHeight / 2 - 20);
}

function draw() {
  background('#e5d9f2'); // 修改背景顏色
  fill(255);
  stroke(100);
  strokeWeight(2);
  let textSizeValue = slider.value();
  textSize(textSizeValue);
  let displayText = input.value() || "請輸入內容";
  let textW = textWidth(displayText);
  let spacing = 20; // 每個文字之間的間距
  let startX = 0;
  let startY = 100;

  if (isBouncing) {
    if (bounceOffsets.length === 0) {
      for (let i = 0; i < Math.floor(windowWidth / (textW + spacing)) * Math.floor(windowHeight / (50 + spacing)); i++) {
        bounceOffsets.push(random(-10, 10)); // 改寬跳動範圍
      }
    } else {
      for (let i = 0; i < bounceOffsets.length; i++) {
        bounceOffsets[i] += random(-0.5, 0.5);
        bounceOffsets[i] = constrain(bounceOffsets[i], -10, 10); // 改寬跳動範圍
      }
    }
  } else {
    bounceOffsets = [];
  }

  let index = 0;
  for (let y = startY; y < windowHeight / 2 - 20; y += 50 + spacing) {
    for (let x = startX; x < windowWidth; x += textW + spacing) {
      let bounce = isBouncing ? bounceOffsets[index++] : 0;
      text(displayText, x, y + bounce);
    }
  }
  
  // 顯示滑桿說明文字
  textSize(16);
  text("調整文字大小", 320, 50);

  // 顯示被 iframe 遮擋的字串，格式及樣式與上半部分相同
  for (let y = windowHeight / 2 + 20; y < windowHeight; y += 50 + spacing) {
    for (let x = startX; x < windowWidth; x += textW + spacing) {
      let bounce = isBouncing ? bounceOffsets[index++] : 0;
      text(displayText, x, y + bounce);
    }
  }
}

function toggleBounce() {
  isBouncing = !isBouncing;
}

function handleDropdownChange() {
  let selected = dropdown.value();
  if (selected === '淡江大學') {
    iframe.attribute('src', 'https://www.tku.edu.tw/');
  } else if (selected === '教育科技學系') {
    iframe.attribute('src', 'https://www.et.tku.edu.tw/');
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  iframe.size(windowWidth - 20, windowHeight / 2 - 20);
  iframe.position((windowWidth - (windowWidth - 20)) / 2, (windowHeight - (windowHeight / 2 - 20)) / 2);
}