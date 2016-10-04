var xf1set = [], yf1set = [], zf1set = [];
var xf2set = [], yf2set = [], zf2set = [];
var xf3set = [], yf3set = [], zf3set = [];
var xf4set = [], yf4set = [], zf4set = [];
var xf5set = [], yf5set = [], zf5set = [];

function dataSplit(trset) {
	
	var x = [];
	var y = [];
	var z = [];

	for (var j = 0; j < trset.length; j++) {

		var xt = [];
		var yt = [];
		var zt = [];

		for (var k = 0; k < 20; k++) {
			
			xt[k] = trset[j][k * 3] * 1;
			yt[k] = trset[j][k * 3 + 1] * 1;
			zt[k] = trset[j][k * 3 + 2] * 1;
		}

		x[j] = xt;
		y[j] = yt;
		z[j] = zt;
	}
	
	for (j = 0; j < trset.length; j++) {

		var xf1 = [], xf2 = [], xf3 = [], xf4 = [], xf5 = [];
		var yf1 = [], yf2 = [], yf3 = [], yf4 = [], yf5 = [];
		var zf1 = [], zf2 = [], zf3 = [], zf4 = [], zf5 = [];

		for (var i = 0; i < 4; i++) {
			xf1[i] = x[j][i * 5];
			xf2[i] = x[j][i * 5 + 1];
			xf3[i] = x[j][i * 5 + 2];
			xf4[i] = x[j][i * 5 + 3];
			xf5[i] = x[j][i * 5 + 4];
			yf1[i] = y[j][i * 5];
			yf2[i] = y[j][i * 5 + 1];
			yf3[i] = y[j][i * 5 + 2];
			yf4[i] = y[j][i * 5 + 3];
			yf5[i] = y[j][i * 5 + 4];
			zf1[i] = z[j][i * 5];
			zf2[i] = z[j][i * 5 + 1];
			zf3[i] = z[j][i * 5 + 2];
			zf4[i] = z[j][i * 5 + 3];
			zf5[i] = z[j][i * 5 + 4];
		}

		xf1set[j] = xf1;
		xf2set[j] = xf2;
		xf3set[j] = xf3;
		xf4set[j] = xf4;
		xf5set[j] = xf5;

		yf1set[j] = yf1;
		yf2set[j] = yf2;
		yf3set[j] = yf3;
		yf4set[j] = yf4;
		yf5set[j] = yf5;

		zf1set[j] = zf1;
		zf2set[j] = zf2;
		zf3set[j] = zf3;
		zf4set[j] = zf4;
		zf5set[j] = zf5;
	}
}	