var canvas = document.getElementById('idCanvas');
var btnStep = document.getElementById('idStep');
btnStep.onclick = function() {
    step();
};

var ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;

var texture = new PseudoTexture(ctx, 800, 800);
var dataScale = 2;
var data = new DataMatrix(texture.width / dataScale, texture.height / dataScale);
data.setAt(200, 200, 1);

function updateData() {
    data.shade(function(data, x, y) {
        const v00 = data.getAt(x - 1, y - 1);
        const v01 = data.getAt(x - 0, y - 1);
        const v02 = data.getAt(x + 1, y - 1);

        const v10 = data.getAt(x - 1, y - 0);
    //  const v11 = data.getAt(x - 0, y - 0);
        const v12 = data.getAt(x + 1, y - 0);

        const v20 = data.getAt(x - 1, y + 1);
        const v21 = data.getAt(x - 0, y + 1);
        const v22 = data.getAt(x + 1, y + 1);

        const sum = v00 + v01 + v02 + v10 + /*v11 +*/ v12 + v20 + v21 + v22;
        return sum % 2 == 0 ? 0 : 1;
    });
}

function renderData() {
    texture.shade(function(x, y, u, v) {
        const val = data.getAt(x, y);
        return [Math.floor(val * 255), 0, 0, 255];
    }, dataScale).updateContext();
}

function step() {
    updateData();
    renderData();
}

renderData();

/*
setInterval(step, 1000);
*/
