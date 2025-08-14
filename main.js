const config = {
  type: Phaser.AUTO,
  width: 360,
  height: 720,
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
  { x: 100, y: 120 },
  { x: 250, y: 300 },
  { x: 180, y: 180 }
];
let foundPoints = [];

const game = new Phaser.Game(config);

function preload() {
  this.load.image('topImage', 'https://cdn.jsdelivr.net/gh/dashayu787/my-image-cdn/img/level1_a.png');
  this.load.image('bottomImage', 'https://cdn.jsdelivr.net/gh/dashayu787/my-image-cdn/img/level1_b.png');
}

function create() {
  this.add.image(180, 180, 'topImage').setDisplaySize(360, 360);
  this.add.image(180, 540, 'bottomImage').setDisplaySize(360, 360);

  timerText = this.add.text(20, 10, '时间：60', { fontSize: '18px', fill: '#000' });
  scoreText = this.add.text(260, 10, '得分：0', { fontSize: '18px', fill: '#000' });

  this.input.on('pointerdown', (pointer) => {
    const clickedX = pointer.x;
    const clickedY = pointer.y;

    for (let i = 0; i < differencePoints.length; i++) {
      const pt = differencePoints[i];
      const dx = Math.abs(clickedX - pt.x);
      const dyTop = Math.abs(clickedY - pt.y);
      const dyBottom = Math.abs(clickedY - (pt.y + 360));

      if (dx < 25 && (dyTop < 25 || dyBottom < 25) && !foundPoints.includes(i)) {
        foundPoints.push(i);
        score++;
        scoreText.setText('得分：' + score);

        this.add.circle(pt.x, pt.y, 10, 0xff0000).setAlpha(0.6);
        this.add.circle(pt.x, pt.y + 360, 10, 0xff0000).setAlpha(0.6);
      }
    }
  });

  this.time.addEvent({
    delay: 1000,
    callback: () => {
      timeLeft--;
      timerText.setText('时间：' + timeLeft);
      if (timeLeft <= 0) {
        this.input.off('pointerdown');
        this.add.text(80, 350, '游戏结束！得分：' + score, {
          fontSize: '20px', fill: '#000'
        });
      }
    },
    loop: true
  });
}

function update() {
  // 空函数，用于未来扩展
}
