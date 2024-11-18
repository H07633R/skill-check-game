class SkillCheckGame {
  constructor(canvas, speed = 0.05, targetSize = 0.12) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.centerX = canvas.width / 2;
    this.centerY = canvas.height / 2;
    this.radius = 120;
    
    // Игровые параметры
    this.angle = 0;
    this.rotationSpeed = speed;
    this.targetSize = Math.PI * targetSize;
    this.isRunning = false;
    
    // Начальная позиция цели
    this.targetStart = Math.PI * 1.7;
  }

  // Новый метод для перемещения цели
  moveTarget() {
    // Генерируем новую позицию и нормализуем её
    let newTarget = Math.random() * Math.PI * 2;
    if (newTarget < 0) {
      newTarget += Math.PI * 2;
    }
    
    this.targetStart = newTarget;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Основной круг
    this.ctx.beginPath();
    this.ctx.arc(this.centerX, this.centerY, this.radius, 0, Math.PI * 2);
    this.ctx.strokeStyle = '#333';
    this.ctx.lineWidth = 10;
    this.ctx.stroke();
    
    // Целевая зона
    this.ctx.beginPath();
    this.ctx.arc(this.centerX, this.centerY, this.radius, 
      this.targetStart, this.targetStart + this.targetSize);
    this.ctx.strokeStyle = '#4CAF50';
    this.ctx.stroke();
    
    // Стрелка
    this.drawNeedle();
  }

  drawNeedle() {
    this.ctx.save();
    this.ctx.translate(this.centerX, this.centerY);
    this.ctx.rotate(this.angle);
    
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(this.radius, 0);
    this.ctx.strokeStyle = '#FF0000';
    this.ctx.lineWidth = 3;
    this.ctx.stroke();
    
    this.ctx.restore();
  }

  update() {
    if (this.isRunning) {
      this.angle += this.rotationSpeed;
      this.draw();
      this.animationFrame = requestAnimationFrame(() => this.update());
    }
  }

  checkHit() {
    let normalizedAngle = this.angle % (Math.PI * 2);
    if (normalizedAngle < 0) {
      normalizedAngle += Math.PI * 2;
    }

    let targetEnd = this.targetStart + this.targetSize;
    
    // Проверка для случая, когда зеленая зона пересекает 0
    if (targetEnd > Math.PI * 2) {
      return normalizedAngle >= this.targetStart || 
             normalizedAngle <= (targetEnd % (Math.PI * 2));
    }

    // Обычная проверка
    return normalizedAngle >= this.targetStart && 
           normalizedAngle <= targetEnd;
  }

  start() {
    this.isRunning = true;
    this.angle = 0;
    // При старте игры также рандомизируем начальную позицию
    this.moveTarget();
    this.update();
  }

  stop() {
    this.isRunning = false;
    cancelAnimationFrame(this.animationFrame);
  }

  setDifficulty(speed, targetSize) {
    this.rotationSpeed = speed;
    this.targetSize = Math.PI * targetSize;
    // При смене сложности также меняем позицию цели
    this.moveTarget();
  }
}

export default SkillCheckGame;