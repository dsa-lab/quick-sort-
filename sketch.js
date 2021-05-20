let w=5;
let values=[];
let states=[];

function setup(){
createCanvas(windowWidth,windowHeight);
values=new Array(floor(width/w));
for(let i=0;i<values.length;i++){
	values[i]=random(height);
	states[i]=-1;
}
quickSort(values);

}

function draw(){
	stroke("#fff");
	

	background(0);
	for(let i=1;i<values.length;i++){
		if(states[i]===1)
	    fill("red");
		else if(states[i]===0)
		fill("yellow");
		else
		fill("#333");
		rect(i*w,height-values[i],w,values[i]);
	}
}

async function partition(arr,low,high){
	let pivot=arr[high];
	let i=low-1;
	for(let i=0;i<states.length;i++){
		states[i]=-1;
	}
	states[low]=1;
	for(let j=low;j<high;j++){
		states[j+1]=0;
		if(arr[j]<pivot){
			i++;
			
			await swap(arr,i,j);
		}
	}
	await swap(arr,i+1,high);
	for(let i=0;i<states.length;i++){
		states[i]=-1;
	}
	return i+1;
}


async function quickSortUtil(arr,low,high){
	if(low <high){
		for(let i=0;i<states.length;i++){
			states[i]=-1;
		}
	let pi=await partition(arr,low,high);
	await Promise.all([quickSortUtil(arr,low,pi-1),quickSortUtil(arr,pi+1,high)]);
	for(let i=0;i<states.length;i++){
		states[i]=-1;
	}
	}
}

 function quickSort(arr){
	quickSortUtil(arr,0,arr.length-1);
}


 async function swap(arr,i,j){
	await sleep(10);

	let temp=arr[i];
	arr[i]=arr[j];
    arr[j]=temp;
}
	let pivotIndex=low;



async function sleep(ms){
	return new  Promise(resolve=>setTimeout(resolve,ms));
}