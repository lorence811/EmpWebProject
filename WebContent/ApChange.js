/**
 *
 */
var parameter  = location.search;
parameter = decodeURIComponent( parameter );
parameter = parameter.split('=')[1];

var success = function(){
	var url = 'http://localhost:8090/javaTraining/Apsuccess.html';
	// 画面遷移
	location.href=url;
}
var cancel = function(){
	var url = 'http://localhost:8090/javaTraining/ApList.html'
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
		url : '/javaTraining/ApChangeServlet',
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

var getAp = function(){
	var requestQuery = { ApId  : parameter };
	console.dir(requestQuery);

	console.log( requestQuery);

	$.ajax({
		type:'GET',
		dataType:'json',
		url:'/javaTraining/ApChangeServlet',
		data : requestQuery,
		success : function(json) {
			console.log('返却値', json);
			document.getElementById( "ApId" ).value=json.apId ;
			document.getElementById( "ApName" ).value=json.apName ;
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert('データは通信に失敗しました');
			console.log(errorThrown)
		}
	});
}

$(document).ready(function() {
	// ログインボタンを押したときのイベント
	$('#cancel').click(cancel);
	$('#commit').click(registAp);
	getAp();
});
