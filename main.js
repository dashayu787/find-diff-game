const config = {
  type: Phaser.AUTO,
  width: 1360,  // 640 * 2 + 间距
  height: 400,  // 360 + 顶部文字空间
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
  { x: 180, y: 150 },   // 相对于左图位置
  { x: 500, y: 230 },
  { x: 300, y: 100 },
  { x: 440, y: 300 }
];
let foundPoints = [];

const game = new Phaser.Game(config);

function preload() {
  this.load.image('leftImage', 'https://cdn.jsdelivr.net/gh/dashayu787/my-image-cdn/img/level1_a.png.png');
  this.load.image('rightImage', 'https://cdn.jsdelivr.net/gh/dashayu787/my-image-cdn/img/level1_b.png.png');
}

function create() {
  // 显示左右图片（原图 640x360）
  this.add.image(340, 200, 'leftImage');   // 左图位置 X=340，Y=200（居中）
  this.add.image(1020, 200, 'rightImage'); // 右图位置 X=1020，Y=200

  // 显示时间和分数
  timerText = this.add.text(30, 20, '剩余时间：60', { fontSize: '20px', fill: '#000' });
  scoreText = this.add.text(1180, 20, '得分：0', { fontSize: '20px', fill: '#000' });

  // 点击事件判断是否点中了不同点
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
        scoreText.setText('得分：' + score);
        this.add.circle(pt.x, pt.y, 15, 0xff0000).setAlpha(0.6);
        this.add.circle(pt.x + 680, pt.y, 15, 0xff0000).setAlpha(0.6); // 标注右图
      }
    }
  });

  // 倒计时
  this.time.addEvent({
    delay: 1000,
    callback: () => {
      timeLeft--;
      timerText.setText('剩余时间：' + timeLeft);
      if (timeLeft <= 0) {
        this.input.off('pointerdown');
        this.add.text(500, 180, '游戏结束！总得分：' + score, {
          fontSize: '32px', fill: '#000'
        });
      }
    },
    loop: true
  });
}

function update() {}
