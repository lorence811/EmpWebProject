/**
 *
 */
var success = function(){
	var url = 'http://localhost:8090/javaTraining/Apsuccess.html';
	// 画面遷移
	location.href=url;
}
var cancel = function(){
	var url = 'http://localhost:8090/javaTraining/ApList.html';
	// 画面遷移
	location.href=url;
}
var registAp = function(){
	var inputApId = $('#ApId').val();

	var inputApName = $('#ApName').val();

	var requestQuery = {
		ApId : inputApId,
		ApName : inputApName,
	};
	console.log('requestQuery',requestQuery);
	// サーバーにデータを送信する。
	$.ajax({
		type : 'POST',
		dataType:'json',
		url : '/javaTraining/ApAddNewServlet',
		data : requestQuery,
		success : function(json) {
			// サーバーとの通信に成功した時の処理
			// 確認のために返却値を出力
			console.log('返却値', json);
			success();
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			// サーバーとの通信に失敗した時の処理
			alert('データベースへの更新に失敗しました。');
			console.log(errorThrown)
		}
	});
}

$(document).ready(function() {
	// ログインボタンを押したときのイベント
	$('#cancel').click(cancel);
	$('#commit').click(registAp);
});
