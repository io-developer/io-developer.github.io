class PseudoTexture {
    constructor(ctx, width, height) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.imageData = ctx.createImageData(width, height);
    }
    
    getDataOffset(x, y) {
        return 4 * y * this.width + 4 * x;
    }

    getPixel(x, y, rgba) {
        const pos = this.getDataOffset(x, y);
        for (let i = 0; i < 4; i++) {
            this.imageData.data[pos + i] = rgba[i];
        }
    }

    setPixel(x, y, rgba) {
        const pos = this.getDataOffset(x, y);
        for (let i = 0; i < 4; i++) {
            this.imageData.data[pos + i] = rgba[i];
        }
        return this;
    }

    shade(fragmentCb, fragmentScale = 1) {
        const scale = Math.floor(Math.max(1, fragmentScale));
        const width = Math.floor(this.width / scale);
        const height = Math.floor(this.height / scale);
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let color = fragmentCb(x, y, x / width, y / height);
                for (let dy = 0; dy < scale; dy++) {
                    for (let dx = 0; dx < scale; dx++) {
                        this.setPixel(scale * x + dx, scale * y + dy, color);
                    }
                }
            }
        }
        return this;
    }

    updateContext(x = 0, y = 0) {
        this.ctx.putImageData(this.imageData, x, y); 
        return this;
    }
};
