/**
 *
 */
var refresh= function(){
	var url = 'http://localhost:8090/javaTraining/EmployeeList.html';
	// 画面遷移
	location.href=url;
}

var addnew = function(){

	var url = 'http://localhost:8090/javaTraining/EmpChange.html';
	// 画面遷移
	location.href=url;
}


var getEmpInfo = function(){
	$.ajax({
		type:'GET',
		dataType:'json',
		url:'/javaTraining/EmpGetInfoServlet',
		success : function(json) {
			console.log('返却値', json);
			var tableElemnt = '';
			if(json.length > 0){
				tableElemnt +='<tr>';
				tableElemnt +='<th>社員ID</th>';
				tableElemnt +='<th>名前</th>';
				tableElemnt +='</tr>';

				for (var i=0; i < json.length; i++) {
					var Emp = json[i];
					tableElemnt += '<tr>';
					tableElemnt += '<td class=empID>'+Emp.empId+'</td>';
					tableElemnt += '<td class=empName>'+Emp.empName+'</td>';
					tableElemnt += '<td><a id=changebutton href="http://localhost:8090/javaTraining/EmpChange.html?q='+Emp.empId+'">編集</a></td>';
					tableElemnt += '<td><button class=delete type="submit" name="delete" value="'+Emp.empId+'">削除</button></td>';
					tableElemnt += '</tr>';
					}
				$('#table').html(tableElemnt);
			}else if(json.length == 0){
				$('#nullcontainer').html('登録している社員がいません。');
			}
			$('.delete').click(deleteEmp);

		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert('データは通信に失敗しました');
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

	getEmpInfo();
});
