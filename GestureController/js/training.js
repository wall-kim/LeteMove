var rset = [];

var rxf1 = 0;
var rxf2 = 0;
var rxf3 = 0;
var rxf4 = 0;
var rxf5 = 0;

var ryf1 = 0;
var ryf2 = 0;
var ryf3 = 0;
var ryf4 = 0;
var ryf5 = 0;

var rzf1 = 0;
var rzf2 = 0;
var rzf3 = 0;
var rzf4 = 0;
var rzf5 = 0;

var dset = [];

var dxf1pointset = [0,0,0,0];
var dxf2pointset = [0,0,0,0];
var dxf3pointset = [0,0,0,0];
var dxf4pointset = [0,0,0,0];
var dxf5pointset = [0,0,0,0];
var dyf1pointset = [0,0,0,0];
var dyf2pointset = [0,0,0,0];
var dyf3pointset = [0,0,0,0];
var dyf4pointset = [0,0,0,0];
var dyf5pointset = [0,0,0,0];
var dzf1pointset = [0,0,0,0];
var dzf2pointset = [0,0,0,0];
var dzf3pointset = [0,0,0,0];
var dzf4pointset = [0,0,0,0];
var dzf5pointset = [0,0,0,0];

function training(filename, label) {
	
	dxf1pointset = [0,0,0,0];
	dxf2pointset = [0,0,0,0];
	dxf3pointset = [0,0,0,0];
	dxf4pointset = [0,0,0,0];
	dxf5pointset = [0,0,0,0];
	dyf1pointset = [0,0,0,0];
	dyf2pointset = [0,0,0,0];
	dyf3pointset = [0,0,0,0];
	dyf4pointset = [0,0,0,0];
	dyf5pointset = [0,0,0,0];
	dzf1pointset = [0,0,0,0];
	dzf2pointset = [0,0,0,0];
	dzf3pointset = [0,0,0,0];
	dzf4pointset = [0,0,0,0];
	dzf5pointset = [0,0,0,0];

	var sampleslength = samples.length;
	
	console.log(xf1set.length);
	console.log(sampleslength);
	console.log(dxf1pointset);
	
	for(var i = 0; i< 4; i++){
		for(var j = 0; j < samples.length; j++){
			dxf1pointset[i] += xf1set[j][i];
			dxf2pointset[i] += xf2set[j][i];
			dxf3pointset[i] += xf3set[j][i];
			dxf4pointset[i] += xf4set[j][i];
			dxf5pointset[i] += xf5set[j][i];

			dyf1pointset[i] += yf1set[j][i];
			dyf2pointset[i] += yf2set[j][i];
			dyf3pointset[i] += yf3set[j][i];
			dyf4pointset[i] += yf4set[j][i];
			dyf5pointset[i] += yf5set[j][i];
			
			dzf1pointset[i] += zf1set[j][i];
			dzf2pointset[i] += zf2set[j][i];
			dzf3pointset[i] += zf3set[j][i];
			dzf4pointset[i] += zf4set[j][i];
			dzf5pointset[i] += zf5set[j][i];
			
			console.log(xf1set[j]);
			console.log(dxf1pointset);
		}

		dxf1pointset[i] = dxf1pointset[i] / sampleslength;
		dxf2pointset[i] = dxf2pointset[i] / sampleslength;
		dxf3pointset[i] = dxf3pointset[i] / sampleslength;
		dxf4pointset[i] = dxf4pointset[i] / sampleslength;
		dxf5pointset[i] = dxf5pointset[i] / sampleslength;
		
		dyf1pointset[i] = dyf1pointset[i] / sampleslength;
		dyf1pointset[i] = dyf2pointset[i] / sampleslength;
		dyf3pointset[i] = dyf3pointset[i] / sampleslength;
		dyf4pointset[i] = dyf4pointset[i] / sampleslength;
		dyf5pointset[i] = dyf5pointset[i] / sampleslength;

		dzf1pointset[i] = dzf1pointset[i] / sampleslength;
		dzf2pointset[i] = dzf2pointset[i] / sampleslength;
		dzf3pointset[i] = dzf3pointset[i] / sampleslength;
		dzf4pointset[i] = dzf4pointset[i] / sampleslength;
		dzf5pointset[i] = dzf5pointset[i] / sampleslength;
		
		console.log(dxf1pointset);
	}

	/*console.log(dzf2pointset);
	console.log(rzf4);*/
	
	dset[0] = dxf1pointset;
	dset[1] = dxf2pointset;
	dset[2] = dxf3pointset;
	dset[3] = dxf4pointset;
	dset[4] = dxf5pointset;
		
	dset[5] = dyf1pointset;
	dset[6] = dyf1pointset;
	dset[7] = dyf3pointset;
	dset[8] = dyf4pointset;
	dset[9] = dyf5pointset;
				
	dset[10] = dzf1pointset;
	dset[11] = dzf2pointset;
	dset[12] = dzf3pointset; 
	dset[13] = dzf4pointset;
	dset[14] = dzf5pointset;		
	
	for(j = 0; j < samples.length ; j++){

		rxf1 += Math.sqrt(Math.pow(xf1set[j][0] - dxf1pointset[0], 2) + Math.pow(xf1set[j][1] - dxf1pointset[1], 2)+ Math.pow(xf1set[j][2] - dxf1pointset[2], 2) + Math.pow(xf1set[j][3] - dxf1pointset[3], 2));
		rxf2 += Math.sqrt(Math.pow(xf2set[j][0] - dxf2pointset[0], 2) + Math.pow(xf2set[j][1] - dxf2pointset[1], 2)+ Math.pow(xf2set[j][2] - dxf2pointset[2], 2) + Math.pow(xf2set[j][3] - dxf2pointset[3], 2));
		rxf3 += Math.sqrt(Math.pow(xf3set[j][0] - dxf3pointset[0], 2) + Math.pow(xf3set[j][1] - dxf3pointset[1], 2)+ Math.pow(xf3set[j][2] - dxf3pointset[2], 2) + Math.pow(xf3set[j][3] - dxf3pointset[3], 2));
		rxf4 += Math.sqrt(Math.pow(xf4set[j][0] - dxf4pointset[0], 2) + Math.pow(xf4set[j][1] - dxf4pointset[1], 2)+ Math.pow(xf4set[j][2] - dxf4pointset[2], 2) + Math.pow(xf4set[j][3] - dxf4pointset[3], 2));
		rxf5 += Math.sqrt(Math.pow(xf5set[j][0] - dxf5pointset[0], 2) + Math.pow(xf5set[j][1] - dxf5pointset[1], 2)+ Math.pow(xf5set[j][2] - dxf5pointset[2], 2) + Math.pow(xf5set[j][3] - dxf5pointset[3], 2));

		ryf1 += Math.sqrt(Math.pow(yf1set[j][0] - dyf1pointset[0], 2) + Math.pow(yf1set[j][1] - dyf1pointset[1], 2)+ Math.pow(yf1set[j][2] - dyf1pointset[2], 2) + Math.pow(yf1set[j][3] - dyf1pointset[3], 2));
		ryf2 += Math.sqrt(Math.pow(yf2set[j][0] - dyf2pointset[0], 2) + Math.pow(yf2set[j][1] - dyf2pointset[1], 2)+ Math.pow(yf2set[j][2] - dyf2pointset[2], 2) + Math.pow(yf2set[j][3] - dyf2pointset[3], 2));
		ryf3 += Math.sqrt(Math.pow(yf3set[j][0] - dyf3pointset[0], 2) + Math.pow(yf3set[j][1] - dyf3pointset[1], 2)+ Math.pow(yf3set[j][2] - dyf3pointset[2], 2) + Math.pow(yf3set[j][3] - dyf3pointset[3], 2));
		ryf4 += Math.sqrt(Math.pow(yf4set[j][0] - dyf4pointset[0], 2) + Math.pow(yf4set[j][1] - dyf4pointset[1], 2)+ Math.pow(yf4set[j][2] - dyf4pointset[2], 2) + Math.pow(yf4set[j][3] - dyf4pointset[3], 2));
		ryf5 += Math.sqrt(Math.pow(yf5set[j][0] - dyf5pointset[0], 2) + Math.pow(yf5set[j][1] - dyf5pointset[1], 2)+ Math.pow(yf5set[j][2] - dyf5pointset[2], 2) + Math.pow(yf5set[j][3] - dyf5pointset[3], 2));

		rzf1 += Math.sqrt(Math.pow(zf1set[j][0] - dzf1pointset[0], 2) + Math.pow(zf1set[j][1] - dzf1pointset[1], 2)+ Math.pow(zf1set[j][2] - dzf1pointset[2], 2) + Math.pow(zf1set[j][3] - dzf1pointset[3], 2));
		rzf2 += Math.sqrt(Math.pow(zf2set[j][0] - dzf2pointset[0], 2) + Math.pow(zf2set[j][1] - dzf2pointset[1], 2)+ Math.pow(zf2set[j][2] - dzf2pointset[2], 2) + Math.pow(zf2set[j][3] - dzf2pointset[3], 2));
		rzf3 += Math.sqrt(Math.pow(zf3set[j][0] - dzf3pointset[0], 2) + Math.pow(zf3set[j][1] - dzf3pointset[1], 2)+ Math.pow(zf3set[j][2] - dzf3pointset[2], 2) + Math.pow(zf3set[j][3] - dzf3pointset[3], 2));
		rzf4 += Math.sqrt(Math.pow(zf4set[j][0] - dzf4pointset[0], 2) + Math.pow(zf4set[j][1] - dzf4pointset[1], 2)+ Math.pow(zf4set[j][2] - dzf4pointset[2], 2) + Math.pow(zf4set[j][3] - dzf4pointset[3], 2));
		rzf5 += Math.sqrt(Math.pow(zf5set[j][0] - dzf5pointset[0], 2) + Math.pow(zf5set[j][1] - dzf5pointset[1], 2)+ Math.pow(zf5set[j][2] - dzf5pointset[2], 2) + Math.pow(zf5set[j][3] - dzf5pointset[3], 2));

	}

	rset[0] = 2 * (rxf1 / sampleslength);
	rset[1] = 2 * (rxf2 / sampleslength);
	rset[2] = 2 * (rxf3 / sampleslength);
	rset[3] = 2 * (rxf4 / sampleslength);
	rset[4] = 2 * (rxf5 / sampleslength);

	rset[5] = 2 * (ryf1 / sampleslength);
	rset[6] = 2 * (ryf2 / sampleslength);
	rset[7] = 2 * (ryf3 / sampleslength);
	rset[8] = 2 * (ryf4 / sampleslength);
	rset[9] = 2 * (ryf5 / sampleslength);

	rset[10] = 2 * (ryf1 / sampleslength);
	rset[11] = 2 * (ryf2 / sampleslength);
	rset[12] = 2 * (ryf3 / sampleslength);
	rset[13] = 2 * (ryf4 / sampleslength);
	rset[14] = 2 * (ryf5 / sampleslength);
	
	console.log("*************");
	console.log(sampleslength);
	console.log("*************");
	console.log(rset[0]);
	console.log(rset[1]);
	console.log(rset[2]);
	console.log(rset[3]);
	console.log(rset[4]);
	console.log("/////////////");
	console.log(dxf1pointset);
	console.log(dset[0]);
	console.log("/////////////");
	
	
	
	
	fileOutTrained(dset, rset, label);
	
}