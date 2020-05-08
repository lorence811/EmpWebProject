/**
 *
 */
var toEmpList= function(){
	var url = 'http://localhost:8090/javaTraining/EmployeeList.html';
	// 画面遷移
	location.href=url;
}
var toLogin= function(){
	var url = 'http://localhost:8090/javaTraining/Login.html';
	// 画面遷移
	location.href=url;
}
var toAp = function(){
	var url = 'http://localhost:8090/javaTraining/ApList.html';
	// 画面遷移
	location.href=url;
}
var toExpense = function(){
	var url = 'http://localhost:8090/javaTraining/Expense.html';
	// 画面遷移
	location.href=url;
}
var ChangePassword = function(){
	var url = 'http://localhost:8090/javaTraining/ChangePassword.html';
	// 画面遷移
	location.href=url;
}

var load=function(){

	$.ajax({
		type : 'GET',
		dataType:'json',
		url : '/javaTraining/LoginCertificationServlet',
		success : function(json) {
			if(json.result === "true"){
				EmpRole=json.EmpRole;
				$('#loginChange').html('<button id=logout type="button">ログアウト</button>');
				$('#logout').click(logout);
				$('#header').append('<div class=headermenu><button id=ChangePassword  type="button">パスワード変更</button></div>');
				$('#header').append('<div class=headermenu><button id=Expense  type="button">支払申請管理</button></div>');
				$('#header').append('<p id=LoginEmpName>'+json.EmpName+'さん</p>');
				$('#Expense').click(toExpense);
				$('#ChangePassword').click(ChangePassword);
				if(json.EmpRole === "R02"){
					EmpidforSetting=json.EmpId;
					$('#roleSetting').html("");
				}else if(json.EmpRole === "R01"){
					$('#LoginEmpName').append('　管理者');
				}

			}else{
				var tableElemnt = '';
				tableElemnt += '<h1>ログインしてください。</h1>';
				$('#contentcontainer').html(tableElemnt);
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			// サーバーとの通信に失敗した時の処理
			alert('データベースへの更新に失敗しました。');
			console.log(errorThrown)
		}
	});
}
var changepassword = function(){
	var inputPassword = $('#Password').val();
	var inputRepassword = $('#rePassword').val();

	if(inputPassword === inputRepassword){
		var requestQuery = {
				password : inputPassword,
			};

		$.ajax({
			type : 'POST',
			dataType:'json',
			url : '/javaTraining/ChangePasswordServlet',
			data : requestQuery,
			success : function(json) {
				// サーバーとの通信に成功した時の処理
				// 確認のために返却値を出力
				console.log('返却値', json);
				alert('パスワードが変更されました、再度ログインしてください。');
				logout();
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				// サーバーとの通信に失敗した時の処理
				alert('データベースへの更新に失敗しました。');
				console.log(errorThrown)
			}
		});
	}else{
		alert('入力したパスワードが一致しませんでした。再度入力してください。')
	}

}
var logout=function(){
	var loginrequest="logout";
	var url = 'http://localhost:8090/javaTraining/Login.html?q='+loginrequest;
	location.href=url;
}
$(document).ready(function() {
	load();
	// ログインボタンを押したときのイベント
	$('#toAp').click(toAp);
	$('#toEmpList').click(toEmpList);
	$('#toLogin').click(toLogin);
	$('#commit').click(changepassword);
});