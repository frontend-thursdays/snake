class Part {
    constructor(snake, x, y, head = false) {
        this.element = document.createElement('div');
        this.element.classList.add('snake-part');
        if (head) {
            this.element.id = 'snake-head';
        }
        this.move(x, y);
        snake.appendChild(this.element);
    }

    move(x, y) {
        this.remember(x, y);
        this.x = x;
        this.y = y;
        this.element.style.left = `${x}px`;
        this.element.style.top  = `${y}px`;
    }

    remember(x, y) {
        this.previous = {
            x: typeof this.x === 'number' ? this.x : x,
            y: typeof this.y === 'number' ? this.y : y
        };
    }
}
