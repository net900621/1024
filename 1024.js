var f = {
	index: 4,
	arr: new Array(16),
	xDom: function(){
		return Math.random() > 0.5 ? 1 : 2;
	},
	initArr: function(arr){
		var i = 0, j = 0;
		for(var m = 0; m < arr.length; m++){
			arr[m] = arr[m] || 0;
		}
		if (!arr.toString().match('0')) {
			i = 3;
		}else if (arr.toString().match(/0/g).length == 1) {
			i = 1
		}
		while(i < 2){
			j = Math.floor(Math.random() * this.index * this.index);
			if(!+arr[j]) (arr[j] = this.xDom()) && i++;
		}
		return arr;
	},
	printArr: function(arr, is1024){
		console.clear();
		this.arr = arr;
		var str = '';
		for(var i = 0; i < arr.length; i++){
			arr[i] = arr[i] || 0;
			if(arr[i] < 10){
				str += '  ';
			}else if(arr[i] < 100){
				str += ' ';
			}
			str += arr[i];
			if(i % this.index == (this.index - 1)){
				str += '\n';
			}else{
				str += '|'
			}
		}
		console.log(str);
		if (is1024) {
			console.log('你赢了');
		}
	},
	matrix: function(arr){
		var _arr = [], i = 0, j = 0;
		for(; i < this.index; i++){
			for(j = 0; j < this.index; j++){
				_arr[j * this.index + i] = arr[i * this.index + j];
            }
		}
		return _arr
	},
	mergeArr: function(arr, type){
		var _arr = arr,
			_index = 0;
		if (type) {
			for (var i = 0; i < _arr.length; i++) {
				if (i != 0) {
					if (_arr[i] == _arr[i - 1] && _arr[i] != 0) {
						_arr[i] = +_arr[i] + +_arr[i - 1];
						_arr[i - 1] = 0;
						_index = 1;
					}else if (_arr[i] == 0 && _arr[i - 1] != 0) {
						_arr[i] = _arr[i - 1];
						_arr[i - 1] = 0;
						_index = 1;
					}
				}
			}
		}else{
			for (var i = _arr.length - 1; i >= 0; i--) {
				if (i != _arr.length - 1 ) {
					if (_arr[i] == _arr[i + 1] && _arr[i] != 0) {
						_arr[i] = +_arr[i] + +_arr[i + 1];
						_arr[i + 1] = 0;
						_index = 1;
					}else if (_arr[i] == 0 && _arr[i + 1] != 0) {
						_arr[i] = _arr[i + 1];
						_arr[i + 1] = 0;
						_index = 1;
					}
				}
			}
		}
		return [_arr, _index];
	},
	changeArr: function(type, arr){
		var i = 0, j = 0;
		var is1024 = 0;
		var num = 1;
		var _arr = new Array(this.index), _arrF = new Array();
		if (type == 'u' || type == 'd') {
			arr = this.matrix(arr);
		}
		for(; i < this.index; i++){
			for(j = 0; j < this.index; j++){
				_arr[j] = arr [i * this.index + j];
            }
            num = 1;
			if (type == 'l'|| type == 'u') {
	            while(num){
	            	_arr = this.mergeArr(_arr, 0);
	            	num = _arr[1];
	            	_arr = _arr[0];

	            }
	            if (_arr[0] >= 1024) {
	            	is1024 = 1;
	            }
        	}else{
	            while(num){
	            	_arr = this.mergeArr(_arr, 1);
	            	num = _arr[1];
	            	_arr = _arr[0];

	            }
	            if (_arr[this.index - 1] >= 1024) {
	            	is1024 = 1;
	            }
        	}
        	_arrF = _arrF.concat(_arr);
		}
		if (type == 'u' || type == 'd') {
			_arrF = this.matrix(_arrF);
		}
		_arrF = this.initArr(_arrF);
		this.printArr(_arrF, is1024);
	},
	changeDom: function(e){
        if(e.keyCode == 37 || e.keyCode == 65){
        	this.changeArr('l', this.arr);
        }else if(e.keyCode == 38 || e.keyCode == 87){
            this.changeArr('u', this.arr);
        }else if(e.keyCode == 39 || e.keyCode == 68){
        	this.changeArr('r', this.arr);
        }else if(e.keyCode == 40 || e.keyCode == 83){
        	this.changeArr('d', this.arr);
        }
	},
	init: function(index){
		this.index = index;
		this.arr = new Array(index * index);
		document.onkeydown = this.changeDom.bind(this);
		this.initArr(this.arr);
		this.printArr(this.arr, 0);
	}
}
f.init(4);
