function predict(i){
	
	var score = 0;
	
	/* Score function */
	function f(F1,F2,F3,F4,dFs1,dFs2,dFs3,dFs4,dist){
		if( ( (Math.pow(F1 - dFs1, 2) + Math.pow(F2 - dFs2, 2) + Math.pow(F3 - dFs3, 2) + Math.pow(F4 - dFs4, 2)) / Math.pow(dist,2) ) < 1){
			score++;
		}
	}
	
	f(xf1set[0][0],xf1set[0][1],xf1set[0][2],xf1set[0][3],dxdataset[i][0],dxdataset[i][1],dxdataset[i][2],dxdataset[i][3],rxdataset[i][0]*1);
	f(xf2set[0][0],xf2set[0][1],xf2set[0][2],xf2set[0][3],dxdataset[i][4],dxdataset[i][5],dxdataset[i][6],dxdataset[i][7],rxdataset[i][1]*1);
	f(xf3set[0][0],xf3set[0][1],xf3set[0][2],xf3set[0][3],dxdataset[i][8],dxdataset[i][9],dxdataset[i][10],dxdataset[i][11],rxdataset[i][2]*1);
	f(xf4set[0][0],xf4set[0][1],xf4set[0][2],xf4set[0][3],dxdataset[i][12],dxdataset[i][13],dxdataset[i][14],dxdataset[i][15],rxdataset[i][3]*1);
	f(xf5set[0][0],xf5set[0][1],xf5set[0][2],xf5set[0][3],dxdataset[i][16],dxdataset[i][17],dxdataset[i][18],dxdataset[i][19],rxdataset[i][4]*1);
	
	f(yf1set[0][0],yf1set[0][1],yf1set[0][2],yf1set[0][3],dxdataset[i][20],dxdataset[i][21],dxdataset[i][22],dxdataset[i][23],rxdataset[i][5]*1);
	f(yf2set[0][0],yf2set[0][1],yf2set[0][2],yf2set[0][3],dxdataset[i][24],dxdataset[i][25],dxdataset[i][26],dxdataset[i][27],rxdataset[i][6]*1);
	f(yf3set[0][0],yf3set[0][1],yf3set[0][2],yf3set[0][3],dxdataset[i][28],dxdataset[i][29],dxdataset[i][30],dxdataset[i][31],rxdataset[i][7]*1);
	f(yf4set[0][0],yf4set[0][1],yf4set[0][2],yf4set[0][3],dxdataset[i][32],dxdataset[i][33],dxdataset[i][34],dxdataset[i][35],rxdataset[i][8]*1);
	f(yf5set[0][0],yf5set[0][1],yf5set[0][2],yf5set[0][3],dxdataset[i][36],dxdataset[i][37],dxdataset[i][38],dxdataset[i][39],rxdataset[i][9]*1);

	f(zf1set[0][0],zf1set[0][1],zf1set[0][2],zf1set[0][3],dxdataset[i][40],dxdataset[i][41],dxdataset[i][42],dxdataset[i][43],rxdataset[i][10]*1);
	f(zf2set[0][0],zf2set[0][1],zf2set[0][2],zf2set[0][3],dxdataset[i][44],dxdataset[i][45],dxdataset[i][46],dxdataset[i][47],rxdataset[i][11]*1);
	f(zf3set[0][0],zf3set[0][1],zf3set[0][2],zf3set[0][3],dxdataset[i][48],dxdataset[i][49],dxdataset[i][50],dxdataset[i][51],rxdataset[i][12]*1);
	f(zf4set[0][0],zf4set[0][1],zf4set[0][2],zf4set[0][3],dxdataset[i][52],dxdataset[i][53],dxdataset[i][54],dxdataset[i][55],rxdataset[i][13]*1);
	f(zf5set[0][0],zf5set[0][1],zf5set[0][2],zf5set[0][3],dxdataset[i][56],dxdataset[i][57],dxdataset[i][58],dxdataset[i][59],rxdataset[i][14]*1);
	
	/*console.log(yf2set[0]);*/
	/*console.log(dxdataset[0]);
	console.log(rxdataset[0]);*/
	
	return score;
}