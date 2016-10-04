var trainingsubset011x = [], trainingsubset011y = [], trainingsubset011z = [];
var trainingsubset012x = [], trainingsubset012y = [], trainingsubset012z = [];
var trainingsubset013x = [], trainingsubset013y = [], trainingsubset013z = [];
var trainingsubset014x = [], trainingsubset014y = [], trainingsubset014z = [];

function dataModi(accels) {
	
	var segment_size = accels.length / 15; // 3 axis x 5 segments (4 frames)
	var frame_size = segment_size * 2; 
	
	//segment size = 8 & frame size = 16 with 120 data size
	//segment size = 4 & frame size = 8 with 60 data size

	for (var i = segment_size * 0; i < frame_size + (segment_size * 0); i++) {
		trainingsubset011x[i] = accels[i * 3];
		trainingsubset011y[i] = accels[i*3+1];
		trainingsubset011z[i] = accels[i*3+2];
	}
	for(i = segment_size * 1; i < frame_size + (segment_size * 1); i++){
		trainingsubset012x[i-(segment_size * 1)] = accels[i*3];
		trainingsubset012y[i-(segment_size * 1)] = accels[i*3+1];
		trainingsubset012z[i-(segment_size * 1)] = accels[i*3+2];
	}
	for(i = segment_size * 2; i < frame_size + (segment_size * 2); i++){
		trainingsubset013x[i-(segment_size * 2)] = accels[i*3];
		trainingsubset013y[i-(segment_size * 2)] = accels[i*3+1];
		trainingsubset013z[i-(segment_size * 2)] = accels[i*3+2];
	}
	for(i = segment_size * 3; i < frame_size + (segment_size * 3); i++){
		trainingsubset014x[i-(segment_size * 3)] = accels[i*3];
		trainingsubset014y[i-(segment_size * 3)] = accels[i*3+1];
		trainingsubset014z[i-(segment_size * 3)] = accels[i*3+2];
	}

	var dfted011x = computeDft(trainingsubset011x); var dfted012x = computeDft(trainingsubset012x); var dfted013x = computeDft(trainingsubset013x); var dfted014x = computeDft(trainingsubset014x);
	var dfted011y = computeDft(trainingsubset011y); var dfted012y = computeDft(trainingsubset012y); var dfted013y = computeDft(trainingsubset013y); var dfted014y = computeDft(trainingsubset014y);
	var dfted011z = computeDft(trainingsubset011z); var dfted012z = computeDft(trainingsubset012z); var dfted013z = computeDft(trainingsubset013z); var dfted014z = computeDft(trainingsubset014z);

	var tr_set_c01 = [];

	tr_set_c01.push(getMean(dfted011x)); tr_set_c01.push(getMean(dfted011y)); tr_set_c01.push(getMean(dfted011z));
	tr_set_c01.push(getEnergy(dfted011x, sumofsquares(dfted011x))); tr_set_c01.push(getEnergy(dfted011y, sumofsquares(dfted011y))); tr_set_c01.push(getEnergy(dfted011z, sumofsquares(dfted011z)));
	tr_set_c01.push(getEntropy(dfted011x, sumofabs(dfted011x))); tr_set_c01.push(getEntropy(dfted011y, sumofabs(dfted011y))); tr_set_c01.push(getEntropy(dfted011z, sumofabs(dfted011z)));
	tr_set_c01.push(getStd(trainingsubset011x)); tr_set_c01.push(getStd(trainingsubset011y)); tr_set_c01.push(getStd(trainingsubset011z));
	tr_set_c01.push(getCorrelation([trainingsubset011x, trainingsubset011y])); tr_set_c01.push(getCorrelation([trainingsubset011y, trainingsubset011z])); tr_set_c01.push(getCorrelation([trainingsubset011z, trainingsubset011x]));

	tr_set_c01.push(getMean(dfted012x)); tr_set_c01.push(getMean(dfted012y)); tr_set_c01.push(getMean(dfted012z));
	tr_set_c01.push(getEnergy(dfted012x, sumofsquares(dfted012x))); tr_set_c01.push(getEnergy(dfted012y, sumofsquares(dfted012y))); tr_set_c01.push(getEnergy(dfted012z, sumofsquares(dfted012z)));
	tr_set_c01.push(getEntropy(dfted012x, sumofabs(dfted012x))); tr_set_c01.push(getEntropy(dfted012y, sumofabs(dfted012y))); tr_set_c01.push(getEntropy(dfted012z, sumofabs(dfted012z)));
	tr_set_c01.push(getStd(trainingsubset012x)); tr_set_c01.push(getStd(trainingsubset012y)); tr_set_c01.push(getStd(trainingsubset012z));
	tr_set_c01.push(getCorrelation([trainingsubset012x, trainingsubset012y])); tr_set_c01.push(getCorrelation([trainingsubset012y, trainingsubset012z])); tr_set_c01.push(getCorrelation([trainingsubset012z, trainingsubset012x]));

	tr_set_c01.push(getMean(dfted013x)); tr_set_c01.push(getMean(dfted013y)); tr_set_c01.push(getMean(dfted013z));
	tr_set_c01.push(getEnergy(dfted013x, sumofsquares(dfted013x))); tr_set_c01.push(getEnergy(dfted013y, sumofsquares(dfted013y))); tr_set_c01.push(getEnergy(dfted013z, sumofsquares(dfted013z)));
	tr_set_c01.push(getEntropy(dfted013x, sumofabs(dfted013x))); tr_set_c01.push(getEntropy(dfted013y, sumofabs(dfted013y))); tr_set_c01.push(getEntropy(dfted013z, sumofabs(dfted013z)));
	tr_set_c01.push(getStd(trainingsubset013x)); tr_set_c01.push(getStd(trainingsubset013y)); tr_set_c01.push(getStd(trainingsubset013z));
	tr_set_c01.push(getCorrelation([trainingsubset013x, trainingsubset013y])); tr_set_c01.push(getCorrelation([trainingsubset013y, trainingsubset013z])); tr_set_c01.push(getCorrelation([trainingsubset013z, trainingsubset013x]));

	tr_set_c01.push(getMean(dfted014x)); tr_set_c01.push(getMean(dfted014y)); tr_set_c01.push(getMean(dfted014z));
	tr_set_c01.push(getEnergy(dfted014x, sumofsquares(dfted014x))); tr_set_c01.push(getEnergy(dfted014y, sumofsquares(dfted014y))); tr_set_c01.push(getEnergy(dfted014z, sumofsquares(dfted014z)));
	tr_set_c01.push(getEntropy(dfted014x, sumofabs(dfted014x))); tr_set_c01.push(getEntropy(dfted014y, sumofabs(dfted014y))); tr_set_c01.push(getEntropy(dfted014z, sumofabs(dfted014z)));
	tr_set_c01.push(getStd(trainingsubset014x)); tr_set_c01.push(getStd(trainingsubset014y)); tr_set_c01.push(getStd(trainingsubset014z));
	tr_set_c01.push(getCorrelation([trainingsubset014x, trainingsubset014y])); tr_set_c01.push(getCorrelation([trainingsubset014y, trainingsubset014z])); tr_set_c01.push(getCorrelation([trainingsubset014z, trainingsubset014x]));

	return tr_set_c01;
}


/* Standard Deviation : amplitude variability */
function getStd(subset) {
  var sum = 0;
  for(var i = 0; i < subset.length; i++) {
    sum += subset[i];
  }
  var average = sum / subset.length;
  var total = 0;
  for(var j = 0; j < subset.length; j++) {
    var temp = subset[j] - average;
    total += Math.pow(temp, 2);
  }
  return Math.sqrt(total/(subset.length));
}

/* Correlation : strength of linear relationship between two axis */
/**
 *  @fileoverview Pearson correlation score algorithm.
 *  @author matt.west@kojilabs.com (Matt West)
 *  @license Copyright 2013 Matt West.
 *  Licensed under MIT (http://opensource.org/licenses/MIT).
 */
/**
 *  Calculate the person correlation score between two items in a dataset.
 *
 *  @param  {object}  prefs The dataset containing data about both items that
 *                    are being compared.
 *  @param  {string}  p1 Item one for comparison.
 *  @param  {string}  p2 Item two for comparison.
 *  @return {float}  The pearson correlation score.
 */

function getCorrelation(prefs) {
  var p1 = 0; var p2 = 1;
  var si = [];

  for (var key in prefs[p1]) {
    if (prefs[p2][key]) si.push(key);
  }

  var n = si.length;

  if (n == 0) return 0;

  var sum1 = 0;
  for (var i = 0; i < si.length; i++) sum1 += prefs[p1][si[i]];

  var sum2 = 0;
  for (var i = 0; i < si.length; i++) sum2 += prefs[p2][si[i]];

  var sum1Sq = 0;
  for (var i = 0; i < si.length; i++) {
    sum1Sq += Math.pow(prefs[p1][si[i]], 2);
  }

  var sum2Sq = 0;
  for (var i = 0; i < si.length; i++) {
    sum2Sq += Math.pow(prefs[p2][si[i]], 2);
  }

  var pSum = 0;
  for (var i = 0; i < si.length; i++) {
    pSum += prefs[p1][si[i]] * prefs[p2][si[i]];
  }

  var num = pSum - (sum1 * sum2 / n);
  var den = Math.sqrt((sum1Sq - Math.pow(sum1, 2) / n) *
      (sum2Sq - Math.pow(sum2, 2) / n));

  if (den == 0) return 0;

  return num / den;
}

function sumofsquares(dfted){
  var sumofsq = 0;
  for(var i = 1; i < dfted[0].length; i++){
    sumofsq += (Math.pow(dfted[0][i], 2) + Math.pow(dfted[1][i], 2));
  }
  return sumofsq;
}

function sumofabs(dfted){
  var sumofab = 0;
  for(var i = 1; i < dfted[0].length; i++){
    sumofab += Math.sqrt(Math.pow(dfted[0][i], 2) + Math.pow(dfted[1][i], 2));
  }
  return sumofab;
}

/* Entropy */
function getEntropy(dfted, sumofabs) {
  var p = 0;
  var entropy = 0;
  for(var j = 1; j < dfted[0].length; j++){
    p = Math.sqrt(Math.pow(dfted[0][j], 2) + Math.pow(dfted[1][j], 2)) / sumofabs;
    entropy -= p * (Math.log(p) / Math.log(2));
  }
  return entropy;
}

/* Energy */
function getEnergy(setenergy, sumofsquares) {
  return sumofsquares / (setenergy[0].length - 1);
}

/* Mean : DC component of fourier transformed signal
 * in this case, since imaginary numbers of all the first value of arrays are 0, dfted011x[0][0] is DC component of signal
 */
function getMean(dfted) {
  return dfted[0][0] + dfted[1][0];
}

/* Discrete Fourier Transform */
function computeDft(inreal) { //, inimag) {
    var n = inreal.length;
    var outreal = new Array(n);
    var outimag = new Array(n);
    for (var k = 0; k < n; k++) { // For each output element
        var sumreal = 0;
        var sumimag = 0;
        for (var t = 0; t < n; t++) { // For each input element
            var angle = 2 * Math.PI * t * k / n;
            sumreal +=  inreal[t] * Math.cos(angle); //+ inimag[t] * Math.sin(angle);
            sumimag += -inreal[t] * Math.sin(angle); //+ inimag[t] * Math.cos(angle);
        }
        outreal[k] = sumreal;
        outimag[k] = sumimag;
    }
    return [outreal, outimag];
}
