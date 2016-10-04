function fileInit(){
	
	console.log("file init");
	var documentsDir, file;
	
	/*************************   File Naming Rules  ******************************
	 *************************   Length of Samples  ******************************
	 *************************  short : 0, long : 1 ******************************
	 *************************    Kinds of Motion   ******************************
	 ******** left : 0, right : 1, counterclockwise : 2, clockwise : 3 ***********/
	
	/* files to store training result variables */
	var file00,file10;
	var file01,file11;
	var file02,file12;
	var file03,file13;
	
	var trained_variable_filename =['trained00', 'trained10', 'trained01', 'trained11', 
	                                 'trained02', 'trained12', 'trained03', 'trained13'];
	

	/* files to store training result - Acceleration values on x, y, z axis */
	var training_rawdata_filename = ["leftsideshort", "leftsidelong", "rightsideshort","rightsidelong",
	"circlecounterclockwiseshort", "circlecounterclockwiselong", "circleclockwiseshort", "circleclockwiselong"];
	
	/* Open Tizen File System */
	tizen.filesystem.resolve('documents', onResolveSuccess, onResolveError,'rw');

	function onResolveError(e) {
		console.log('message: ' + e.message);
	}

	function onError(e) {
		console.log('message: ' + e.message);
	}
	function onResolveSuccess(dir) {
		
		documentsDir = dir;
		var init = true;
		
		/* Create Variable Files */
		for(var i = 0; i < trained_variable_filename.length; i++){
			try {
				documentsDir.createFile(trained_variable_filename[i]);
				console.log("File Created Variable");
			} catch (IOError) {
				console.log("File Already Exist");
				
				//init = false;
			}
		}
		
		if(init){
			try {
				file00 = documentsDir.resolve('trained00');
				file10 = documentsDir.resolve('trained10');
				file01 = documentsDir.resolve('trained01');
				file11 = documentsDir.resolve('trained11');
				file02 = documentsDir.resolve('trained02');
				file12 = documentsDir.resolve('trained12');
				file03 = documentsDir.resolve('trained03');
				file13 = documentsDir.resolve('trained13');
				console.log("File Resolve Variable");
			} catch (exc) {
				console.log('Could not resolve file: ' + exc.message);
				return;
			}

			/* initialize file with '#' to distinguish initial intact file from modified */
			try {
				file00.openStream('w', writeToStream, onError);
				file01.openStream('w', writeToStream, onError);
				file10.openStream('w', writeToStream, onError);
				file11.openStream('w', writeToStream, onError);
				file02.openStream('w', writeToStream, onError);
				file12.openStream('w', writeToStream, onError);
				file03.openStream('w', writeToStream, onError);
				file13.openStream('w', writeToStream, onError);
				console.log("File Written Variable");
			} catch (exc) {
				console.log('Could not write to file: ' + exc.message);
			}
		}
		
		/* Create Raw Data Files */
		for(i = 0; i < training_rawdata_filename.length; i++){
			try {
				documentsDir.createFile(training_rawdata_filename[i]);
				console.log("File Created Raw");
			} catch (IOError) {
				console.log("File Already Exist");
				
				documentsDir.resolve("leftsideshort").openStream('w', writeinitraw, onError);
				documentsDir.resolve("leftsidelong").openStream('w', writeinitraw, onError);
				documentsDir.resolve("rightsideshort").openStream('w', writeinitraw, onError);
				documentsDir.resolve("rightsidelong").openStream('w', writeinitraw, onError);
				
				documentsDir.resolve("circlecounterclockwiseshort").openStream('w', writeinitraw, onError);
				documentsDir.resolve("circlecounterclockwiselong").openStream('w', writeinitraw, onError);
				documentsDir.resolve("circleclockwiseshort").openStream('w', writeinitraw, onError);
				documentsDir.resolve("circleclockwiselong").openStream('w', writeinitraw, onError);
			}
			
		}
		
	}
	
	function writeToStream(fileStream) {

		var streamData = '#';
		try {
			fileStream.write(streamData);
			fileStream.close();
		} catch (exc) {
			console.log('Could not write to file: ' + exc.message);
		}
	}
	
	function writeinitraw(fileStream) {

		var streamData = '';
		try {
			fileStream.write(streamData);
			fileStream.close();
		} catch (exc) {
			console.log('Could not write to file: ' + exc.message);
		}
	}
}

// file out 할 때 label 뿐만 아니라 option까지 고려해서 총 12개의 경우의 수 필요
// final file out trained 할 때 기존 trained file을 읽어서 array로 만들어 update 하고 out
function fileOut(accels, label, filename) {
	
	var documentsDir, file;
	
	tizen.filesystem.resolve('documents', onResolveSuccess, onResolveError,'rw');

	function onResolveError(e) {
		console.log('message: ' + e.message);
	}

	function onError(e) {
		console.log('message: ' + e.message);
	}
	function onResolveSuccess(dir) {
		documentsDir = dir;
		
		
		try {
			file = documentsDir.resolve(filename);
		} catch (exc) {
			console.log('Could not resolve file: ' + exc.message);
			return;
		}

		try {
			file.openStream('a', writeToStream, onError);
		} catch (exc) {
			console.log('Could not write to file: ' + exc.message);
		}
	}
	
	function writeToStream(fileStream) {

		var streamData = '';
		
		var size = accels.length;
		
		streamData += accels[0];
		for (var i = 1; i < size; i++) {
			streamData += ',';
			streamData += accels[i];
		}

		streamData += '&';
		streamData += label;
		streamData += '!';
		try {
			fileStream.write(streamData);
			fileStream.close();
		} catch (exc) {
			console.log('Could not write to file: ' + exc.message);
		}
	}
}

var samples;
var dataset = [];
function fileIn(filename){
	var file;
	tizen.filesystem.resolve("documents", 
			function(dir){
		       file = dir.resolve(filename);
		       file.openStream(
		    	    "r", 
				    function(fs) {
		                var text = fs.read(file.fileSize);
		                text = text.slice(0, text.length-1);
		                samples = text.split('!');
		                fs.close();
		                for(var i = 0 ; i < samples.length; i++){
		                	var sample_data = samples[i];
		                	var data = sample_data.split('&');
		                	dataset[i] = data[0].split(',');	
		                }
		                
		                dataSplit( dataset );
		                training(filename, data[1]);
		            }, 
		            function(e) {
		                console.log("Error " + e.message);
		            }, "UTF-8"
		       );
		    }
	);
}

function fileOutTrained(dset, rset, label) {
	
	var documentsDir, file, fileread;
	
	tizen.filesystem.resolve('documents', onResolveSuccess, onResolveError,'rw');

	function onResolveError(e) {
		console.log('message: ' + e.message);
	}

	function onError(e) {
		console.log('message: ' + e.message);
	}
	function onResolveSuccess(dir) {
		documentsDir = dir;
		
		try {
			file = documentsDir.resolve('trained' + label);
		} catch (exc) {
			console.log('Could not resolve file: ' + exc.message);
			return;
		}

		
		try {
			file.openStream('w', writeToStream, onError);
		} catch (exc) {
			console.log('Could not write to file: ' + exc.message);
		}
	}
	
	
	function writeToStream(fileStream) {

		var streamData = '';
		
		//if(isnew){
			for (var i = 0; i < dset.length; i++) { // dset.length = 15
				for (var j = 0; j < dset[0].length; j++) { // dset[0].length = 4
					
					streamData += dset[i][j];
					streamData += ',';
				}
			}
			
			streamData = streamData.slice(0, streamData.length-1);
			
			streamData += '&';
			
			for (var j = 0; j < rset.length; j++) {
				
				streamData += rset[j];
				streamData += ',';
			}
			streamData = streamData.slice(0, streamData.length-1);
			
			streamData += '&';
			streamData += label;
			//

			try {
				fileStream.write(streamData);
				fileStream.close();
			} catch (exc) {
				console.log('Could not write to file: ' + exc.message);
			}
		
	}
}

var dxdataset = [];
var rxdataset = [];
var labelset = [];

function fileInTrained(){
	var file00,file10;
	var file01,file11;
	var file02,file12;
	var file03,file13;
	
	/*dxdataset = [];
	rxdataset = [];
	labelset = [];*/

	tizen.filesystem.resolve("documents", 
		function(dir){
			file00 = dir.resolve("trained00");
			file00.openStream("r", 
			    function(fs) {
	                var text = fs.read(file00.fileSize);
	                if(text != "#"){
	                	
		                samples = text.split('&');
		                fs.close();
		                var dxdata = samples[0].split(',');
		                var rxdata = samples[1].split(',');
		                var label = samples[2];
		                
		                dxdataset.push(dxdata);
		                rxdataset.push(rxdata);
		                labelset.push(label);
		                
		                console.log("file imported");
	                } else {
	                	console.log("file empty");
	                }
	            }, 
	            function(e) {
	                console.log("Error " + e.message);
	            }, "UTF-8"
	       );
	    }
	);
	
	tizen.filesystem.resolve("documents", 
			function(dir){
				file10 = dir.resolve("trained10");
		       file10.openStream("r", 
				    function(fs) {
		                var text = fs.read(file10.fileSize);
		                if(text != "#"){

			                samples = text.split('&');
			                fs.close();
			                var dxdata = samples[0].split(',');
			                var rxdata = samples[1].split(',');
			                var label = samples[2];
			                
			                dxdataset.push(dxdata);
			                rxdataset.push(rxdata);
			                labelset.push(label);
			                
			                console.log("file imported");
			                
		                } else {
		                	console.log("file empty");
		                }
		            }, 
		            function(e) {
		                console.log("Error " + e.message);
		            }, "UTF-8"
		       );
		    }
		);
	
	
	
	tizen.filesystem.resolve("documents", 
			function(dir){
				file01 = dir.resolve("trained01");
		       file01.openStream("r", 
				    function(fs) {
		                var text = fs.read(file01.fileSize);
		                if(text != "#"){

			                samples = text.split('&');
			                fs.close();
			                var dxdata = samples[0].split(',');
			                var rxdata = samples[1].split(',');
			                var label = samples[2];

			                dxdataset.push(dxdata);
			                rxdataset.push(rxdata);
			                labelset.push(label);
			                
			                console.log("file imported");
		                } else {
		                	console.log("file empty");
		                }
		            }, 
		            function(e) {
		                console.log("Error " + e.message);
		            }, "UTF-8"
		       );
		    }
		);
	
	tizen.filesystem.resolve("documents", 
			function(dir){
				file11 = dir.resolve("trained11");
		       file11.openStream("r", 
				    function(fs) {
		                var text = fs.read(file11.fileSize);
		                if(text != "#"){

			                samples = text.split('&');
			                fs.close();
			                var dxdata = samples[0].split(',');
			                var rxdata = samples[1].split(',');
			                var label = samples[2];
			                
			                dxdataset.push(dxdata);
			                rxdataset.push(rxdata);
			                labelset.push(label);
			                
			                console.log("file imported");
			                
		                } else {
		                	console.log("file empty");
		                }
		            }, 
		            function(e) {
		                console.log("Error " + e.message);
		            }, "UTF-8"
		       );
		    }
		);
		
		tizen.filesystem.resolve("documents", 
				function(dir){
					file02 = dir.resolve("trained02");
			       file02.openStream("r", 
					    function(fs) {
			                var text = fs.read(file02.fileSize);
			                if(text != "#"){

				                samples = text.split('&');
				                fs.close();
				                var dxdata = samples[0].split(',');
				                var rxdata = samples[1].split(',');
				                var label = samples[2];
				                
				                dxdataset.push(dxdata);
				                rxdataset.push(rxdata);
				                labelset.push(label);
				                
				                console.log("file imported");
			                } else {
			                	console.log("file empty");
			                }
			            }, 
			            function(e) {
			                console.log("Error " + e.message);
			            }, "UTF-8"
			       );
			    }
			);
		
		tizen.filesystem.resolve("documents", 
				function(dir){
					file12 = dir.resolve("trained12");
			       file12.openStream("r", 
					    function(fs) {
			                var text = fs.read(file12.fileSize);
			                if(text != "#"){

				                samples = text.split('&');
				                fs.close();
				                var dxdata = samples[0].split(',');
				                var rxdata = samples[1].split(',');
				                var label = samples[2];
				                
				                dxdataset.push(dxdata);
				                rxdataset.push(rxdata);
				                labelset.push(label);
				                
				                console.log("file imported");
			                } else {
			                	console.log("file empty");
			                }
			            }, 
			            function(e) {
			                console.log("Error " + e.message);
			            }, "UTF-8"
			       );
			    }
			);
		
		tizen.filesystem.resolve("documents", 
				function(dir){
					file03 = dir.resolve("trained03");
			       file03.openStream("r", 
					    function(fs) {
			                var text = fs.read(file03.fileSize);
			                if(text != "#"){

				                samples = text.split('&');
				                fs.close();
				                var dxdata = samples[0].split(',');
				                var rxdata = samples[1].split(',');
				                var label = samples[2];
				                
				                dxdataset.push(dxdata);
				                rxdataset.push(rxdata);
				                labelset.push(label);
				                
				                console.log("file imported");
			                } else {
			                	console.log("file empty");
			                }
			            }, 
			            function(e) {
			                console.log("Error " + e.message);
			            }, "UTF-8"
			       );
			    }
			);
			
			tizen.filesystem.resolve("documents", 
					function(dir){
						file13 = dir.resolve("trained13");
				       file13.openStream("r", 
						    function(fs) {
				                var text = fs.read(file13.fileSize);
				                if(text != "#"){

					                samples = text.split('&');
					                fs.close();
					                var dxdata = samples[0].split(',');
					                var rxdata = samples[1].split(',');
					                var label = samples[2];
					                
					                dxdataset.push(dxdata);
					                rxdataset.push(rxdata);
					                labelset.push(label);
					                
					                console.log("file imported");
				                } else {
				                	console.log("file empty");
				                }
				            }, 
				            function(e) {
				                console.log("Error " + e.message);
				            }, "UTF-8"
				       );
				    }
				);
						
}