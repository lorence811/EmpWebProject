/**
 *
 */

var back = function(){
	var url = 'http://localhost:8090/javaTraining/ApList.html';
	// 画面遷移
	location.href=url;
}

$(document).ready(function() {
	// 登録ボタンを押したときのイベント
	$('#back').click(back);
});