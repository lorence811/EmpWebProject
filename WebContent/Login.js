/**
 *
 */
var login = function(){
	console.log('login')

	var inputEmpId = $('#EmpId').val();
	var inputPassword = $('#Password').val();
	var requestQuery = {
			EmpId : inputEmpId,
			Password : inputPassword,
		};

	console.log(requestQuery);

	// サーバーにデータを送信する。
	$.ajax({
		type : 'POST',
		dataType:'json',
		url : '/javaTraining/EmpLoginServlet',
		data : requestQuery,
		success : function(json) {
			// サーバーとの通信に成功した時の処理
			// 確認のために返却値を出力
			console.log('返却値', json);
			if(json.result === 'ok'){
				var url = 'http://localhost:8090/javaTraining/EmployeeList.html';
				location.href=url;
			}else {
				alert('ユーザーIDかパスワードが間違っています');
			}

		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			// サーバーとの通信に失敗した時の処理
			alert('データベースへの更新に失敗しました。');
			console.log(errorThrown)
		}
	});

}
var loginrequest="";
var load=function(){
	var parameter  = location.search.substring( 1, location.search.length );
	parameter = decodeURIComponent( parameter );
	parameter = parameter.split('=')[1];
	var requestQuery = {
			loginRequest : parameter,
		};
	$.ajax({
		type : 'GET',
		dataType:'json',
		url : '/javaTraining/EmpLoginServlet',
		data : requestQuery,
		success : function(json) {
			if(json === "success"){
				var url = 'http://localhost:8090/javaTraining/EmployeeList.html';
				location.href=url;
			}else if(json === "already"){
				alert('ログイン済み、社員一覧ページへ移動します。');
				var url = 'http://localhost:8090/javaTraining/EmployeeList.html';
				location.href=url;
			}else{
				console.log(json);
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			// サーバーとの通信に失敗した時の処理
			alert('データベースへの更新に失敗しました。');
			console.log(errorThrown)
		}
	});
}
var logout=function(){
	loginrequest="logout";
	var url = 'http://localhost:8090/javaTraining/Login.html?q='+loginrequest;
	location.href=url;
}
$(document).ready(function() {
	load();
	// ログインボタンを押したときのイベント
	$('#commit').click(login);
	$('#logout').click(logout);
});
