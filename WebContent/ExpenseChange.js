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
var SaveExpense = function(){
	var inputID = $('#ID').val();

	var inputclaimerName = $('#claimerName').val();

	var inputclaimedDate = $('#claimedDate').val();

	var inputtitle = $('#title').val();

	var inputdestination = $('#destination').val();

	var inputamount = $('#amount').val();

	var requestQuery = {
		ID : inputID,
		claimerName : inputclaimerName,
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
		url : '/javaTraining/ExpenseChangeServlet',
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

var getExpense = function(){
	var requestQuery = { Id  : parameter };

	console.log( requestQuery);

	$.ajax({
		type:'GET',
		dataType:'json',
		url:'/javaTraining/ExpanseChangeServlet',
		data : requestQuery,
		success : function(json) {
			console.log('返却値', json);

			document.getElementById( "ID" ).value=json.id ;
			document.getElementById( "claimerName" ).value=json.claimerName ;
			var claimeDate = json.claimedDate;
			document.getElementById( "claimedDate" ).value=claimeDate.substring(0,10);
			document.getElementById( "title" ).value=json.title;
			document.getElementById( "destination" ).value=json.destination;
			document.getElementById( "amount" ).value=json.amount;
			document.getElementById( "status" ).value=json.status;
			document.getElementById( "reason" ).value=json.reason;
			document.getElementById( "updateName" ).value=json.updateName;
			document.getElementById( "updateDate" ).value=json.updateDate.substring(0,10);

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
//	$('#commit').click(registEmp);
	getExpense();

});
