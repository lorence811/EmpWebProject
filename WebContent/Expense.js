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
var logout=function(){
	var loginrequest="logout";
	var url = 'http://localhost:8090/javaTraining/Login.html?q='+loginrequest;
	location.href=url;
}
var ChangePassword = function(){
	var url = 'http://localhost:8090/javaTraining/ChangePassword.html';
	// 画面遷移
	location.href=url;
}
var detail = function(){
	var inputId = document.activeElement.value;
	var url = 'http://localhost:8090/javaTraining/ExpenseChange.html?q='+inputId;
	location.href=url;
}
var toaddnew = function(){
	var url = 'http://localhost:8090/javaTraining/ExpenseAddnew.html';
	// 画面遷移
	location.href=url;
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
				$('#ChangePassword').click(ChangePassword);
				$('#Expense').click(toExpense);
				if(json.EmpRole === "R02"){
					EmpidforSetting=json.EmpId;
					getExpanseInfo();
					$('#mastercontent').html('');
				}else if(json.EmpRole === "R01"){
					EmpidforSetting=json.EmpId;
					$('#LoginEmpName').append('　管理者');
					getExpanseInfo();
					getMasterinfo();
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
var getExpanseInfo = function(){

	$.ajax({
		type:'GET',
		dataType:'json',
		url:'/javaTraining/ExpanseGetinfoServlet',
		success : function(json) {
			console.log('返却値', json);
			var tableElemnt = '';
			if(json.length > 0){
				tableElemnt +='<tr>';
				tableElemnt +='<th>申請日</th>';
				tableElemnt +='<th>タイトル</th>';
				tableElemnt +='<th>ステータス</th>';
				tableElemnt +='</tr>';

					for (var i=0; i < json.length; i++) {
						var expanse = json[i];
						tableElemnt += '<tr>';
						tableElemnt += '<td class=claimedDate>'+expanse.claimedDate.substring(0,10)+'</td>';
						tableElemnt += '<td class=title>'+expanse.title+'</td>';
						tableElemnt += '<td class=status>'+expanse.status+'</td>';
						tableElemnt += '<td class = '+expanse.id+'><button class=detail type="submit" name="delete" value="'+expanse.id+'">詳細</button></td>';
					}
					$('#table').html(tableElemnt);
					$('.detail').click(detail);

			}else if(json.length == 0){
				$('#nullcontainer').html('登録している申請がありません。');
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert('データベースの接続に失敗しました');
			$('#nullcontainer').html('登録している申請がありません。');
			console.log(errorThrown)
		}
	});
}
var getMasterinfo = function(){
	$.ajax({
		type:'GET',
		dataType:'json',
		url:'/javaTraining/GetUndoExpenseServlet',
		success : function(json) {
			console.log('返却値', json);
			var tableElemnt = '';
			if(json.length > 0){
				tableElemnt +='<tr>';
				tableElemnt +='<th>申請日</th>';
				tableElemnt +='<th>タイトル</th>';
				tableElemnt +='<th>ステータス</th>';
				tableElemnt +='</tr>';

					for (var i=0; i < json.length; i++) {
						var expanse = json[i];
						tableElemnt += '<tr>';
						tableElemnt += '<td class=claimedDate>'+expanse.claimedDate.substring(0,10)+'</td>';
						tableElemnt += '<td class=title>'+expanse.title+'</td>';
						tableElemnt += '<td class=status>'+expanse.status+'</td>';
						tableElemnt += '<td class = '+expanse.id+'><button class=detail type="submit" name="delete" value="'+expanse.id+'">詳細</button></td>';
						tableElemnt +='<td><button class=addmit type="submit" name="delete" value="'+expanse.id+'">承認</button></td>';
						tableElemnt +='<td><input type="text"id="'+expanse.id+'"  value=""></td>';
						tableElemnt +='<td><button class=reject type="submit" name="delete" value="'+expanse.id+'">却下</button></td>';

					}
					$('#masterH1').html("判断待ちの申請一覧");
					$('#mastertable').html(tableElemnt);
					$('.detail').click(detail);
					$('.addmit').click(addmit);
					$('.reject').click(reject);

			}else if(json.length == 0){
				$('#masternullcontainer').html('登録している申請がありません。');
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert('データベースの接続に失敗しました');
			$('#masternullcontainer').html('登録している申請がありません。');
			console.log(errorThrown)
		}
	});
}
var addmit = function(){
	var inputId = document.activeElement.value;
	var now = new Date();
	var year = now.getFullYear();
	var mon = now.getMonth()+1; //１を足すこと
	var day = now.getDate();
	var s = year + "-" + mon + "-" + day
	var inputclaimedDate = s;
	var requestQuery = {
			Id : inputId,
			updateDate : s,
	}
	console.log('requestQuery',requestQuery);

	// サーバーにデータを送信する。
	$.ajax({
		type : 'POST',
		dataType:'json',
		url : '/javaTraining/addmitServlet',
		data : requestQuery,
		success : function(json) {
			// サーバーとの通信に成功した時の処理
			// 確認のために返却値を出力
			console.log('返却値', json);
			alert('承認しました。');
			toExpense();
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			// サーバーとの通信に失敗した時の処理
			alert('処理することができませんでした。');
			console.log(errorThrown)
		}
	});
}
var reject = function(){
	var inputId = document.activeElement.value;
	var inputReason = document.getElementById(inputId).value;
	var now = new Date();
	var year = now.getFullYear();
	var mon = now.getMonth()+1; //１を足すこと
	var day = now.getDate();
	var s = year + "-" + mon + "-" + day
	var inputclaimedDate = s;
	var requestQuery = {
			Id : inputId,
			updateDate : s,
			reason : inputReason,
	}
	console.log('requestQuery',requestQuery);

	// サーバーにデータを送信する。
	$.ajax({
		type : 'POST',
		dataType:'json',
		url : '/javaTraining/ExpenseRejectServlet',
		data : requestQuery,
		success : function(json) {
			// サーバーとの通信に成功した時の処理
			// 確認のために返却値を出力
			console.log('返却値', json);
			alert('却下しました。');
			toExpense();
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			// サーバーとの通信に失敗した時の処理
			alert('処理することができませんでした。');
			console.log(errorThrown)
		}
	});
}

$(document).ready(function() {
	load();
	// ログインボタンを押したときのイベント
	$('#toAp').click(toAp);

	$('#toEmpList').click(toEmpList);
	$('#toLogin').click(toLogin);
	$('#addnew').click(toaddnew);
});