var SAAgent = null;
var SASocket = null;
var CHANNELID = 104;
var ProviderAppName = "GLtron";

function createHTML(log_string)
{
	var content = document.getElementById("toast-content-main");
	content.textContent = log_string;
	tau.openPopup("#toast-main");
}

function createToastTrain(log_string)
{
	var content = document.getElementById("toast-content-train");
	content.textContent = log_string;
	tau.openPopup("#toast-train");
}

function createToastControl(log_string)
{
	var content = document.getElementById("toast-content-control");
	content.textContent = log_string;
	tau.openPopup("#toast-control");
}

function onerror(err) {
	console.log("err [" + err + "]");
}

var agentCallback = {
	onconnect : function(socket) {
		SASocket = socket;
		createHTML("Connection established with RemotePeer");
		SASocket.setSocketStatusListener(function(reason){
			console.log("Service connection lost, Reason : [" + reason + "]");
			disconnect();
		});
		SASocket.setDataReceiveListener(onreceive);
	},
	onerror : onerror
};

var peerAgentFindCallback = {
	onpeeragentfound : function(peerAgent) {
		try {
			if (peerAgent.appName == ProviderAppName) {
				SAAgent.setServiceConnectionListener(agentCallback);
				SAAgent.requestServiceConnection(peerAgent);
			} else {
				createHTML("Not expected app : " + peerAgent.appName);
			}
		} catch(err) {
			console.log("exception [" + err.name + "] msg[" + err.message + "]");
		}
	},
	onerror : onerror
}

function onsuccess(agents) {
	try {
		if (agents.length > 0) {
			SAAgent = agents[0];

			SAAgent.setPeerAgentFindListener(peerAgentFindCallback);
			SAAgent.findPeerAgents();
		} else {
			createHTML("Not found SAAgent");
		}
	} catch(err) {
		console.log("exception [" + err.name + "] msg[" + err.message + "]");
	}
}

function connect() {
	if (SASocket) {
		createHTML('Already connected');
        return false;
    }
	try {
		webapis.sa.requestSAAgent(onsuccess, function (err) {
			console.log("err [" + err.name + "] msg[" + err.message + "]");
		});
	} catch(err) {
		console.log("exception [" + err.name + "] msg[" + err.message + "]");
	}
}

function disconnect() {
	try {
		if (SASocket != null) {
			SASocket.close();
			SASocket = null;
			createHTML("closeConnection");
		}
	} catch(err) {
		console.log("exception [" + err.name + "] msg[" + err.message + "]");
	}
}

function onreceive(channelId, data) {
	createToastControl(data);
}

function fetch(message) {
	try {
		var shot = 0;
		if(message === '10'){
			shot = 1;
		} else if (message === '12'){
			shot = 11;
		}
		SASocket.sendData(CHANNELID, shot);
	} catch(err) {
		console.log("exception [" + err.name + "] msg[" + err.message + "]");
	}
}

var accelswitch = false;
var turns = 0;
var accels = [];
var accel_modi = [];
var option_selected = "";
var control_option_selected = "";
var label_selected = "";
var label_filename = "";
var label = 0;
var option = 0;
var sample_length = 0;
var control_sample_length = 0;
var is_main = true;

window.onload = function () {
	console.log("page on");
	
	fileInit();
	// Screen always on
	tizen.power.request("SCREEN", "SCREEN_NORMAL");
	
	document.getElementById("train-start-turns").innerHTML = turns;
	
    // Add eventListener for tizenhwkey
    document.addEventListener('tizenhwkey', function(e) {
    	if (event.keyName === 'back') {
    		if(is_main){
    			tizen.application.getCurrentApplication().exit();
    		} else {
    			is_main = true;
    			window.removeEventListener("devicemotion", handleMotionRealTime, true);
        		window.removeEventListener("devicemotion", handleMotion, true);
        		console.log("listener dettached");

    			tau.back();
    		}
    	}
    });
    
    /* label selected */
    document.getElementById("train-label-selected-text").innerHTML = "label = " + label_selected;
    document.getElementById('train-label-btn1').addEventListener('click', function() {
    	label_selected = "⇋";
    	label_filename = "leftside";
    	label = 0;
    	document.getElementById("train-label-selected-text").innerHTML = "label = " + label_selected;
	}, true);
    
    document.getElementById('train-label-btn2').addEventListener('click', function() {
    	label_selected = "⇌";
    	label_filename = "rightside";
    	label = 1;
    	document.getElementById("train-label-selected-text").innerHTML = "label = " + label_selected;
	}, true);
    
    document.getElementById('train-label-btn3').addEventListener('click', function() {
    	label_selected = "↺";
    	label_filename = "circlecounterclockwise";
    	label = 2;
    	document.getElementById("train-label-selected-text").innerHTML = "label = " + label_selected;
	}, true);
    
    document.getElementById('train-label-btn4').addEventListener('click', function() {
    	label_selected = "↻";
    	label_filename = "circleclockwise";
    	label = 3;
    	document.getElementById("train-label-selected-text").innerHTML = "label = " + label_selected;
	}, true);
    
    /* option selected */
    document.getElementById("train-option-selected-text").innerHTML = "option = " + option_selected;
    document.getElementById('train-option-short').addEventListener('click', function() {
    	option_selected = "short";
    	option = 0;
    	document.getElementById("train-option-selected-text").innerHTML = "option = " + option_selected;
    	sample_length = 63;
	}, true);
    
    document.getElementById('train-option-long').addEventListener('click', function() {
    	option_selected = "long";
    	option = 1;
    	document.getElementById("train-option-selected-text").innerHTML = "option = " + option_selected;
    	sample_length = 123;
	}, true);
    
    /* Controller Option Selection */
    document.getElementById('control-option-long').addEventListener('click', function() {
    	control_option_selected = "long";
    	document.getElementById("control-option-selected-text").innerHTML = "option = " + control_option_selected;
    	control_sample_length = 120;
	}, true);
    
    document.getElementById('control-option-short').addEventListener('click', function() {
    	control_option_selected = "short";
    	document.getElementById("control-option-selected-text").innerHTML = "option = " + control_option_selected;
    	control_sample_length = 60;
	}, true);
    
    /* Training */
    document.getElementById('train-header').addEventListener('click', function() {
    	fileOut(accel_modi[0], option + "" + label, label_filename + option_selected);
    	fileIn(label_filename + option_selected);
    	document.getElementById("train-start-turns").innerHTML = 0;
    	createToastTrain("Trained");
	}, true);
    
    /* Data Gathering */	
    document.getElementById('train-start-btn').addEventListener('click', trainStart, true);
    function trainStart() {
    	
    	accels = [];
    	for (var p = 0; p < sample_length -3; p++) {
    		accels[p] = 0;
    	}
    	
    	turns = 0;
    	accelswitch = true;
    	window.addEventListener("devicemotion", handleMotion, true);
	}
    
    /* Training data gathering */
	function handleMotion(e) {
		if (accelswitch) {
				
				accels.shift();
				accels.shift();
				accels.shift();
				
				accels.push(e.acceleration.x);
				accels.push(e.acceleration.y);
				accels.push(e.acceleration.z);
				 
				accel_modi[0] = dataModi(accels);
				dataSplit( accel_modi );
				 
				document.getElementById("train-start-turns").innerHTML = turns;
				turns = turns + 3;
				
			if (turns === sample_length) {
				accelswitch = false;
				document.getElementById("train-start-turns").innerHTML = "Completed";
				
			}
		}
	}
	
	var score = 0;
	var score_max = 0;
	var label_max = 0;
	
	/* Control (Predict) */
    document.getElementById('control-start-btn').addEventListener('click', function() {
    	
    	accels = [];
    	for (var p = 0; p < control_sample_length; p++) {
    		accels[p] = 0;
    	}
    	document.getElementById("control-label").innerHTML = "";
    	window.addEventListener("devicemotion", handleMotionRealTime, true);
	}, true);
	
	/* control data gathering */
	function handleMotionRealTime(e) {
			accels.shift();
			accels.shift();
			accels.shift();
			
			accels.push(e.acceleration.x);
			accels.push(e.acceleration.y);
			accels.push(e.acceleration.z);
				 
			accel_modi[0] = dataModi(accels);
			dataSplit( accel_modi );
				 
			for(var i = 0 ; i < dxdataset.length; i++){
				score = predict(i);
				console.log(score);
				if(score > score_max){
					score_max = score;
					label_max = labelset[i];
				}
			}
				
			if (score_max > 13) {
				for (var p = 0; p < control_sample_length; p++) {
					accels[p] = 0;
				}
				score_max = 0;
				fetch(label_max);
				document.getElementById("control-label").innerHTML = "Gestrue Recognized";
			}
			document.getElementById("control-result").innerHTML = "Sensing Gesture";
	}
	
};