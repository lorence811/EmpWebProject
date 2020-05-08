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
var addnew = function(){

	var url = 'http://localhost:8090/javaTraining/EmpAddNew.html';
	// 画面遷移
	location.href=url;
}

var Search = function(){
	var url = 'http://localhost:8090/javaTraining/EmpSearch.html';
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
var Change = function(){
	var inputEmpId = document.activeElement.value;
	var url = 'http://localhost:8090/javaTraining/EmpChange.html?q='+inputEmpId;
	location.href=url;
}
var LastEmpId="";
var getEmpInfo = function(){
	var inputEmpId = localStorage.getItem('inputEmpId');
	var inputEmpName = localStorage.getItem('inputEmpName');
	var inputEmpApId = localStorage.getItem('inputEmpApId');
	localStorage.removeItem('inputEmpId');
	localStorage.removeItem('inputEmpName');
	localStorage.removeItem('inputEmpApId');
	var requestQuery = {
			EmpId : inputEmpId,
			EmpName : inputEmpName,
			EmpApId : inputEmpApId,
	}
	console.log('requestQuery',requestQuery);

	$.ajax({
		type:'GET',
		dataType:'json',
		url:'/javaTraining/EmpGetInfoServlet',
		data : requestQuery,
		success : function(json) {
			console.log('返却値', json);
			var tableElemnt = '';
			if(json.length > 0){
				tableElemnt +='<tr>';
				tableElemnt +='<th>社員ID</th>';
				tableElemnt +='<th>名前</th>';
				tableElemnt +='</tr>';

				//最後の社員のIdを取り出し、ローカルストレージに保存
				var EmpLast = json[json.length - 1];
				LastEmpId = EmpLast.empId;
				localStorage.setItem('LastEmpId',LastEmpId);
				if(EmpRole === "R02"){
					for (var i=0; i < json.length; i++) {
						var Emp = json[i];
						tableElemnt += '<tr>';
						tableElemnt += '<td class=empID>'+Emp.empId+'</td>';
						tableElemnt += '<td class=empName>'+Emp.empName+'</td>';
						if(Emp.empId === EmpidforSetting){
							tableElemnt += '<td class = '+Emp.empId+'><button class=change type="submit" name="delete" value="'+Emp.empId+'">編集</button></td>';
							tableElemnt += '<td class = '+Emp.empId+'><button class=delete type="submit" name="delete" value="'+Emp.empId+'">削除</button></td>';
						}
					}

				}else{

					for (var i=0; i < json.length; i++) {
						var Emp = json[i];
						tableElemnt += '<tr>';
						tableElemnt += '<td class=empID>'+Emp.empId+'</td>';
						tableElemnt += '<td class=empName>'+Emp.empName+'</td>';
						tableElemnt += '<td class = '+Emp.empId+'><button class=change type="submit" name="delete" value="'+Emp.empId+'">編集</button></td>';
						tableElemnt += '<td class = '+Emp.empId+'><button class=delete type="submit" name="delete" value="'+Emp.empId+'">削除</button></td>';
						tableElemnt += '</tr>';
				}

					}
				$('#table').html(tableElemnt);
			}else if(json.length == 0){
				$('#nullcontainer').html('登録している社員がいません。');
			}
			$('.delete').click(deleteEmp);
			$('.change').click(Change);


		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert('検索に失敗しました');
			$('#nullcontainer').html('登録している社員がいません。');
			console.log(errorThrown)
		}
	});
}

var deleteEmp = function(){
	var inputEmpId = document.activeElement.value;
	var requestQuery = {
			EmpId : inputEmpId,
	}
	console.log('requestQuery',requestQuery);

	// サーバーにデータを送信する。
	$.ajax({
		type : 'POST',
		dataType:'json',
		url : '/javaTraining/EmpGetInfoServlet',
		data : requestQuery,
		success : function(json) {
			// サーバーとの通信に成功した時の処理
			// 確認のために返却値を出力
			console.log('返却値', json);
			alert('データの削除に成功しました。');
			toEmpList();
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
var logout=function(){
	var loginrequest="logout";
	var url = 'http://localhost:8090/javaTraining/Login.html?q='+loginrequest;
	location.href=url;
}
$(document).ready(function() {
	load();
	// ログインボタンを押したときのイベント
	$('.addnew').click(addnew);
	$('#search').click(Search);
	$('#toAp').click(toAp);
	getEmpInfo();
	$('#toEmpList').click(toEmpList);
	$('#toLogin').click(toLogin);
});
