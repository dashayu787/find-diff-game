
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game-container',
  scene: {
    preload,
    create,
    update
  }
};

let timerText;
let scoreText;
let timeLeft = 60;
let score = 0;
let differencePoints = [
  { x: 120, y: 150 },
  { x: 300, y: 200 },
  { x: 500, y: 250 },
  { x: 220, y: 380 },
  { x: 450, y: 120 },
  { x: 650, y: 200 },
  { x: 600, y: 400 },
  { x: 350, y: 320 }
];
let foundPoints = [];

const game = new Phaser.Game(config);

function preload() {
  this.load.image('image', 'https://i.imgur.com/2gSOiNm.jpg'); // 示例图片
}

function create() {
  this.add.image(200, 300, 'image').setDisplaySize(400, 600);
  this.add.image(600, 300, 'image').setDisplaySize(400, 600); // 假设左右图一样

  timerText = this.add.text(10, 10, '剩余时间: 60', { fontSize: '20px', fill: '#000' });
  scoreText = this.add.text(650, 10, '得分: 0', { fontSize: '20px', fill: '#000' });

  this.input.on('pointerdown', (pointer) => {
    const clickedX = pointer.x;
    const clickedY = pointer.y;

    for (let i = 0; i < differencePoints.length; i++) {
      const pt = differencePoints[i];
      const dx = Math.abs(clickedX - pt.x);
      const dy = Math.abs(clickedY - pt.y);
      if (dx < 30 && dy < 30 && !foundPoints.includes(i)) {
        foundPoints.push(i);
        score++;
        scoreText.setText('得分: ' + score);
        this.add.circle(pt.x, pt.y, 15, 0xff0000).setAlpha(0.6);
      }
    }
  });

  this.time.addEvent({
    delay: 1000,
    callback: () => {
      timeLeft--;
      timerText.setText('剩余时间: ' + timeLeft);
      if (timeLeft <= 0) {
        this.input.off('pointerdown');
        this.add.text(250, 280, '游戏结束！总得分: ' + score, { fontSize: '24px', fill: '#000' });
      }
    },
    loop: true
  });
}

function update() {}
