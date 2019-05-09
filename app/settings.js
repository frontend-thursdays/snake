const
    PART_SIZE = 32,
    DIRECTION = {
        UP:    'ArrowUp',
        RIGHT: 'ArrowRight',
        DOWN:  'ArrowDown',
        LEFT:  'ArrowLeft'
    },
    START_INTERVAL_TIME = 300,
    MAX_INTERVALTIME    = 50,
    POINT_MULTIPLIER    = 5,

    RANDOM_X = () => Math.floor(Math.random() * Math.floor(window.innerWidth  / PART_SIZE)) * PART_SIZE,
    RANDOM_Y = () => Math.floor(Math.random() * Math.floor(window.innerHeight / PART_SIZE)) * PART_SIZE,

    WINDOW_START_X = () => 0,
    WINDOW_START_Y = () => 0,
    WINDOW_END_X   = () => window.innerWidth,
    WINDOW_END_Y   = () => window.innerHeight;
