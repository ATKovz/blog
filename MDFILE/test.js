/* var QuickSort = function(arr){
	if(arr.length === 0){
		return [];
	}
	var lt = [],
		gt = [],
		base = arr[0];
	for(let i=1; i<arr.length; i++){
		if(base>=arr[i]){
			lt.push(arr[i]);
		}else{
			gt.push(arr[i]);
		}
	}
	let result = QuickSort(lt).concat(base, QuickSort(gt));
	console.log(result);
	return result;
};

var arrs = [4,5,7,3,1,4,9,6,23,56,32];

QuickSort(arrs); */





function mergeArray(arr, left, leftEnd, right, rightEnd){
	let leftArr = [],
		rightArr = [];
	for(let i=left; i<leftEnd; i++){
		leftArr.push(arr[i]);

	}
	for(let i=right; i<rightEnd; i++){
		rightArr.push(arr[i]);
	}
	let a = 0;
	let b = 0;
	//此处的infinity相当于是墙。防止下标溢出
	rightArr.push(Infinity); 
	leftArr.push(Infinity);
	for(let i = left; i<rightEnd; i++){
		if(leftArr[a]<rightArr[b]){
			arr[i] = leftArr[a];
			a++;
		}else{
			arr[i] = rightArr[b];
			b++;
		}
	}
}
function mergeSort(arr){
	if(arr.length<1){
		return arr;
	}
	let step = 1;
	let left = 0
		,right = 0;
	while(step<arr.length){
		left = 0;
		right = left + step;
		while(right + step <= arr.length){
			mergeArray(arr, left, left+step, right, right+step);
			left = right + step;
			right = left + step;
		}
		step*=2;
	}
	return arr;
}


//对数组进行排序
var arrs = [4,5,30,3,1,4,9,6,23,56,32,34];
mergeSort(arrs);
console.log(arrs);
