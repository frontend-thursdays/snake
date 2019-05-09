class Snake {
    constructor() {
        this.pointCounter = document.getElementById('point-counter');
        this.element = document.getElementById('snake');
        this.pauseBoard = document.getElementById('pause');
        this.reset();
    }

    reset() {
        this.element.innerHTML = '';
        const x = RANDOM_X(),
              y = RANDOM_Y();

        this.points = 0;
        this.parts  = [];

        const directions = Object.values(DIRECTION);
        const randomized = Math.floor(Math.random() * directions.length);
        const direction = directions[randomized];
        this.setDirection(direction);

        this.pointCounter.innerText = '0';
        this.parts.push(...this.addPartsOnBeginning(x, y, 10));
        this.listen();
        Apple.generate();
        this.run();
    }

    addPartsOnBeginning(x, y, length = 3) {
        length++;
        return Array(length).fill().map((value, index) => {
            let X = x,
                Y = y;
            const offset = PART_SIZE * index;
            switch (this.direction) {
                case DIRECTION.UP:    Y += offset; break;
                case DIRECTION.RIGHT: X -= offset; break;
                case DIRECTION.DOWN:  Y -= offset; break;
                case DIRECTION.LEFT:  X += offset; break;
                default: console.error('WRONG DIRECTION');
            }

            return new Part(this.element, X, Y, !index);
        });
    }

    setDirection(direction) {
        if (this.canGoThisWay(direction) || !this.direction) {
            this.direction = direction;
        }
    }

    eat() {
        this.points++;
        this.pointCounter.innerText = this.points;
        Apple.generate();

        const {x, y} = this.parts[this.parts.length - 1];
        this.parts.push( new Part(this.element, x, y) );
        this.run();
    }

    isApple() {
        return this.x === Apple.x
            && this.y === Apple.y;
    }

    isEnd() {
        return this.x < WINDOW_START_X()
            || this.x > WINDOW_END_X()
            || this.y < WINDOW_START_Y()
            || this.y > WINDOW_END_Y();
    }

    isCollision(part) {
        return this.x === part.x
            && this.y === part.y;
    }

    canGoThisWay(direction) {
        return (this.direction !== direction) &&
            (
                ([DIRECTION.UP, DIRECTION.DOWN].includes(this.direction) && [DIRECTION.LEFT, DIRECTION.RIGHT].includes(direction)) ||
                ([DIRECTION.UP, DIRECTION.DOWN].includes(direction) && [DIRECTION.LEFT, DIRECTION.RIGHT].includes(this.direction))
            );
    }

    run() {
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.interval = this.getInterval();
    }

    getInterval() {
        return setInterval(() => {
            if (!this.paused) {
                this.eventHandled = false;

                let x = this.x,
                    y = this.y;

                switch (this.direction) {
                    case DIRECTION.UP:
                        y -= PART_SIZE;
                        break;
                    case DIRECTION.RIGHT:
                        x += PART_SIZE;
                        break;
                    case DIRECTION.DOWN:
                        y += PART_SIZE;
                        break;
                    case DIRECTION.LEFT:
                        x -= PART_SIZE;
                        break;
                    default:
                        console.error('WRONG DIRECTION');
                }

                this.parts.forEach((part, index, parts) => {
                    if (index) {
                        if (this.isCollision(part)) {
                            this.gameOver();
                        }

                        part.move(parts[index - 1].previous.x, parts[index - 1].previous.y);
                    } else {
                        part.move(x, y);
                    }
                });

                if (this.isEnd()) {
                    this.gameOver();
                }

                if (this.isApple()) {
                    this.eat();
                }
            }
        }, this.getTime())
    }

    getTime() {
        console.log(this.points);
        const time = START_INTERVAL_TIME - this.points * POINT_MULTIPLIER;

        if (time > START_INTERVAL_TIME) {
            return START_INTERVAL_TIME;
        }

        if (time < MAX_INTERVALTIME) {
            return MAX_INTERVALTIME;
        }

        console.log(time);
        return time;
    }

    stop() {
        clearInterval(this.interval);
    }

    pause() {
        if (this.paused) {
            this.continue();
        } else {
            this.paused = true;
            this.pauseBoard.classList.add('paused');
        }
    }

    continue() {
        let counter = 3;
        this.pauseBoard.innerHTML = counter.toString();
        let interval = setInterval(() => {
            if (--counter) {
                this.pauseBoard.innerHTML = counter.toString();
            } else {
                this.pauseBoard.classList.remove('paused');
                setTimeout(() => this.pauseBoard.innerHTML = 'PAUSED', 300);
                clearInterval(interval);
                this.paused = false;
            }
        }, 1000);
    }

    gameOver() {
        this.stop();
        console.log('GAME OVER');
        this.reset();
    }

    listen() {
        const _this = this;
        document.onkeydown = function(event) {
            if (event.key === ' ') {
                _this.pause();
            } else if (!_this.eventHandled && !_this.paused) {
                _this.setDirection(event.key);
                _this.eventHandled = true;
            }
        }
    }

    get x() {
        return this.parts[0].x;
    }

    get y() {
        return this.parts[0].y;
    }
}
