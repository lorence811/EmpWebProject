/**
 *
 */
var parameter  = location.search;
parameter = decodeURIComponent( parameter );
parameter = parameter.split('=')[1];

var success = function(){
	var url = 'http://localhost:8090/javaTraining/Expense.html';
	// 画面遷移
	location.href=url;
}
var cancel = function(){
	var url = 'http://localhost:8090/javaTraining/Expense.html'
	// 画面遷移
	location.href=url;
}

var getLastId = function(){
	var a=0;
	$.ajax({
		type : 'GET',
		dataType:'json',
		url : '/javaTraining/getExpenseIdServlet',
		success : function(json) {
			// サーバーとの通信に成功した時の処理
			// 確認のために返却値を出力
			a = json.length;
			document.getElementById( "ID" ).value=a+1;
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			// サーバーとの通信に失敗した時の処理
			alert('データベースへの更新に失敗しました。');
			console.log(errorThrown)
		}
	});
}



var SaveExpense = function(){
	var inputID = $('#ID').val();

	var now = new Date();
	var year = now.getFullYear();
	var mon = now.getMonth()+1; //１を足すこと
	var day = now.getDate();
	var s = year + "-" + mon + "-" + day
	var inputclaimedDate = s;

	var inputtitle = $('#title').val();

	var inputdestination = $('#destination').val();

	var inputamount = $('#amount').val();

	var requestQuery = {
		ID : inputID,
		claimedDate : inputclaimedDate,
		title : inputtitle,
		destination : inputdestination,
		amount : inputamount,
	};
	console.log('requestQuery',requestQuery);
	// サーバーにデータを送信する。
	$.ajax({
		type : 'POST',
		dataType:'json',
		url : '/javaTraining/ExpanseChangeServlet',
		data : requestQuery,
		success : function(json) {
			// サーバーとの通信に成功した時の処理
			// 確認のために返却値を出力
			console.log('返却値', json);
			alert('申請しました。');
			success();
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			// サーバーとの通信に失敗した時の処理
			alert('データベースへの更新に失敗しました。');
			console.log(errorThrown)
		}
	});
}

timerID = setInterval('clock()',500); //0.5秒毎にclock()を実行

function clock() {
	document.getElementById("claimedDate").value = getNow();
}

function getNow() {
	var now = new Date();
	var year = now.getFullYear();
	var mon = now.getMonth()+1; //１を足すこと
	var day = now.getDate();
	var hour = now.getHours();
	var min = now.getMinutes();
	var sec = now.getSeconds();

	//出力用
	var s = year + "-" + mon + "-" + day + " " + hour + "時" + min + "分" + sec + "秒";
	return s;
}

$(document).ready(function() {
	getLastId();
	// ログインボタンを押したときのイベント
	$('#cancel').click(cancel);
	$('#commit').click(SaveExpense);

});
