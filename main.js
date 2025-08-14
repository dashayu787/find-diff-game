function preload() {
  this.load.image('leftImage', 'https://cdn.jsdelivr.net/gh/dashayu787/my-image-cdn/img/level1_a.png.png');
  this.load.image('rightImage', 'https://cdn.jsdelivr.net/gh/dashayu787/my-image-cdn/img/level1_b.png.png');
}

function create() {
  this.add.image(200, 300, 'leftImage').setDisplaySize(400, 600);
  this.add.image(600, 300, 'rightImage').setDisplaySize(400, 600);

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
