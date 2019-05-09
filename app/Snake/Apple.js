class Apple {
    static generate() {
        if (!Apple.element) {
            Apple.element = document.getElementById('apple');
        }

        Apple.x = RANDOM_X();
        Apple.y = RANDOM_Y();
        Apple.element.style.left = `${Apple.x}px`;
        Apple.element.style.top  = `${Apple.y}px`;
    }
}
