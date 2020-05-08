/**
 *
 */
var refresh= function(){
	var url = 'http://localhost:8090/javaTraining/ApList.html';
	// 画面遷移
	location.href=url;
}

var addnew = function(){

	var url = 'http://localhost:8090/javaTraining/ApAddNew.html';
	// 画面遷移
	location.href=url;
}
var toEmpList = function(){
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
var logout=function(){
	var loginrequest="logout";
	var url = 'http://localhost:8090/javaTraining/Login.html?q='+loginrequest;
	location.href=url;
}
var Change = function(){
	var inputApId = document.activeElement.value;
	var url = 'http://localhost:8090/javaTraining/EmpChange.html?q='+inputApId;
	location.href=url;
}
var getApInfo = function(){

	$.ajax({
		type:'GET',
		dataType:'json',
		url:'/javaTraining/ApGetInfoServlet',
		success : function(json) {
			console.log('返却値', json);
			var tableElemnt = '';
			if(json.length > 0){
				tableElemnt +='<tr>';
				tableElemnt +='<th>ID</th>';
				tableElemnt +='<th>部署名</th>';
				tableElemnt +='</tr>';

				if(EmpRole === "R02"){
					$('#roleSetting').html("");
					for (var i=0; i < json.length; i++) {
						var Ap = json[i];
						tableElemnt += '<tr>';
						tableElemnt += '<td class=empID>'+Ap.apId+'</td>';
						tableElemnt += '<td class=empName>'+Ap.apName+'</td>';
					}
				}else{
					for (var i=0; i < json.length; i++) {
						var Ap = json[i];
						tableElemnt += '<tr>';
						tableElemnt += '<td class=empID>'+Ap.apId+'</td>';
						tableElemnt += '<td class=empName>'+Ap.apName+'</td>';
						tableElemnt += '<td class=changebuttoncontainer style="width: 43px;" ><button class=change type="submit" name="delete" value="'+Ap.apId+'">編集</button></td>';
						tableElemnt += '<td class=changebuttoncontainer style="width: 43px;" ><button class=delete type="submit" name="delete" value="'+Ap.apId+'">削除</button></td>';
						tableElemnt += '</tr>';
					}
				}
				$('#table').html(tableElemnt);
			}else if(json.length == 0){
				$('#nullcontainer').html('登録している社員がいません。');
			}
			$('.delete').click(deleteAp);
			$('.change').click(Change);

		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert('検索に失敗しました');
			$('#nullcontainer').html('登録している社員がいません。');
			console.log(errorThrown)
		}
	});
}

var deleteAp = function(){
	var inputApId = document.activeElement.value;
	var requestQuery = {
			ApId : inputApId,
	}
	console.log('requestQuery',requestQuery);

	// サーバーにデータを送信する。
	$.ajax({
		type : 'POST',
		dataType:'json',
		url : '/javaTraining/ApGetInfoServlet',
		data : requestQuery,
		success : function(json) {
			// サーバーとの通信に成功した時の処理
			// 確認のために返却値を出力
			console.log('返却値', json);
			alert('データの削除に成功しました。');
			refresh();
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			// サーバーとの通信に失敗した時の処理
			alert('削除することができませんでした。');
			console.log(errorThrown)
		}
	});
}
var EmpidforSetting="";
var EmpRole="";
var load=function(){

	$.ajax({
		type : 'GET',
		dataType:'json',
		url : '/javaTraining/LoginCertificationServlet',
		success : function(json) {
			if(json.result === "true"){
				$('#loginChange').html('<button id=logout type="button">ログアウト</button>');
				$('#logout').click(logout);
				$('#header').append('<div class=headermenu><button id=ChangePassword  type="button">パスワード変更</button></div>');
				$('#header').append('<div class=headermenu><button id=Expense  type="button">支払申請管理</button></div>');
				$('#header').append('<p id=LoginEmpName>'+json.EmpName+'さん</p>');
				$('#Expense').click(toExpense);
				$('#ChangePassword').click(ChangePassword);
				EmpRole=json.EmpRole;
				EmpidforSetting=json.EmpId;
				if(json.EmpRole === "R01"){
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
$(document).ready(function() {
	load();
	// ログインボタンを押したときのイベント
	$('.addnew').click(addnew);
	getApInfo();
	$('#toEmpList').click(toEmpList);
	$('#toLogin').click(toLogin);
	$('#toAp').click(toAp);

});
