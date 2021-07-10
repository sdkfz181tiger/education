console.log("Hello, JavaScript!!");

// 番外編
//    バブルソート

let nums = [4, 3, 1, 2];

window.onload = (event)=>{

	console.log("最初:" + nums.join(","));

	// 小さい順に並び替えるバブルソート

	// for文で使っている、
	// lはleft、配列の先頭という意味で、
	// rはright、配列の最後尾という意味として説明しますね。
	//     left <- [4, 3, 1, 2] -> right

	for(let r=nums.length-1; 0<r; r--){// rを配列の最後尾から先頭まで
		console.log("=========");
		console.log("今からarr[" + r + "]まで調べるざます");
		for(let l=0; l<r; l++){// lを配列の先頭からr未満まで <- ポイント
			if(nums[l] > nums[l+1]){// lと、その隣(l+1)を比較する
				console.log("  これは交換ざます:" + nums[l] + " <-> " + nums[l+1]);
				let tmp = nums[l];// lと、その隣(l+1)を交換する
				nums[l] = nums[l+1];
				nums[l+1] = tmp;
				console.log("     ->" + nums.join(","));
			}
		}
		console.log(nums[r] + "は確定でございます!!(もう調べなくていいね)");
	}

	console.log("結果:" + nums.join(","));
}

