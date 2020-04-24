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

				for (var i=0; i < json.length; i++) {
					var Ap = json[i];
					tableElemnt += '<tr>';
					tableElemnt += '<td class=empID>'+Ap.apId+'</td>';
					tableElemnt += '<td class=empName>'+Ap.apName+'</td>';
					tableElemnt += '<td class=changebuttoncontainer><a class=changebutton href="http://localhost:8090/javaTraining/ApChange.html?q='+Ap.apId+'">編集</a></td>';
					tableElemnt += '<td class=changebuttoncontainer><button class=delete type="submit" name="delete" value="'+Ap.apId+'">削除</button></td>';
					tableElemnt += '</tr>';
					}
				$('#table').html(tableElemnt);
			}else if(json.length == 0){
				$('#nullcontainer').html('登録している社員がいません。');
			}
			$('.delete').click(deleteAp);

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
$(document).ready(function() {
	// ログインボタンを押したときのイベント
	$('.addnew').click(addnew);
	getApInfo();
	$('.toEmpList').click(toEmpList);
});
