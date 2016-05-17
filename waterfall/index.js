window.onload = function(){
	new waterFall("main",'box')
}

var waterFall = function(id,box){
	this.id = document.getElementById(id);
	this.box = box;
	this.init();
}
waterFall.prototype.init = function(){
	var self = this,
		boxArr = this.getByClass(this.id,this.box),
		itemWidth = boxArr[0].offsetWidth,
		clientW = this.ClientInfo().width,
		// 计算列数
		cols = Math.floor(clientW/itemWidth), 
		boxHeightArr = [],
		minHieght = 0 ,
		minIndex = 0 ,
		len = boxArr.length;
		for(var i = 0; i < len; i++){
			if(i < cols){
				boxHeightArr.push(boxArr[i].offsetHeight);
			}
			else{
				//取得数组中最小的高度
				minHieght = Math.min.apply(null,boxHeightArr);
				//找到最小值对应的索引
				minIndex = this.getMinIndex(boxHeightArr,minHieght);
				boxArr[i].style.position = 'absolute';
				boxArr[i].style.left = boxArr[minIndex].offsetLeft + 'px';
				boxArr[i].style.top = minHieght + 'px';
				//找到最小高度，然后对其进行重新赋值
				boxHeightArr[minIndex] = boxHeightArr[minIndex] + boxArr[i].offsetHeight;
			}
		}
		this.id.style.cssText = 'width:'+cols*itemWidth+'px;margin:10px auto;';
		
		window.onscroll = function(){
			self.scroll();
		}
}
/**
 * 获取 class元素 , 返回一个class数组
 * @param {Object} oParent
 * @param {Object} clsName
 */
waterFall.prototype.getByClass = function(oParent,clsName){
	var clsArr = [],
	 	oElements = oParent.getElementsByTagName("*"),
	 	len = oElements.length;
	for(var i=0; i < len; i++){
		if(oElements[i].className === clsName){
			clsArr.push(oElements[i]);
		}
	}
	return clsArr;
}
waterFall.prototype.ClientInfo = function(){
	return {
		width : document.documentElement.clientWidth || document.body.clientWidth,
		height : document.documentElement.clientHeight || document.body.clientHeight
	}
}
/**
 * 获取最小值对应的索引
 * @param {Object} arr
 * @param {Object} val
 */
waterFall.prototype.getMinIndex = function(arr,val){
	if(Object.prototype.toString.call(arr) !== '[object Array]'){
		return ;
	}
	for(var item in arr){
		if(arr[item] === val){
			return item;
		}
	}
}
waterFall.prototype.scroll = function(){
	var initData = {data:[{src:'../img/1.jpg'},{src:'../img/2.jpg'},{src:'../img/3.jpg'},{src:'../img/4.jpg'},{src:'../img/5.jpg'}]}
	if(this.checkScroll()){
		for(var i = 0; i < initData.data.length; i++){
			var oBox = document.createElement('div');
			oBox.className = 'box';
			var oPic = document.createElement("div");
			oPic.className = 'pic';
			oBox.appendChild(oPic);
			var oImg = document.createElement("img");
			oImg.src = initData.data[i].src;
			oPic.appendChild(oImg);
			this.id.appendChild(oBox);
			this.init();
		}
	}
}
waterFall.prototype.checkScroll = function(){
	var clientH  = this.ClientInfo().height,
		aBoxs    = this.getByClass(this.id,'box'),
		oBoxLast = aBoxs[aBoxs.length-1].offsetTop + Math.floor(aBoxs[aBoxs.length-1].offsetHeight/2),
		scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
		if((scrollTop+clientH) > oBoxLast){
			return true;
		}
	return false;	
}
