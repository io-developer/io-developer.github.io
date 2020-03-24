class DataMatrix {
    constructor(width, height, val = 0) {
        this.width = width;
        this.height = height;
        this.data = [];
        for (let i = 0, l = width * height; i < l; i++) {
            this.data[i] = val;
        }
    }

    getOffset(x, y) {
        return Math.floor(y) * this.width + Math.floor(x);
    }

    getAt(x, y, def = 0) {
        const offset = this.getOffset(x, y);
        return offset >= 0 && offset < this.data.length ? this.data[offset] : def;
    }

    setAt(x, y, val) {
        const offset = this.getOffset(x, y);
        if (offset >= 0 && offset < this.data.length) {
            this.data[offset] = val;
        }
        return this;
    }

    shade(fragmentCb) {
        const newData = new DataMatrix(this.width, this.height);
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                let val = fragmentCb(this, x, y);
                newData.setAt(x, y, val);
            }
        }
        this.data = newData.data;
        return this;
    }
}