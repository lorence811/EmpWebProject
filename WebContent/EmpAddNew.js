/**
 *
 */
var setNewEmpId = function(){
	var LastEmpId = localStorage.getItem('LastEmpId');
	localStorage.removeItem('LastEmpId');
	var Id = LastEmpId.substring(3);
	var Id_int = Number(Id);
	var Id_new = Id_int +1;
	var ret = ( '0000' + Id_new ).slice( -4 );
	var NewEmpId = 'EMP'+ret;
	console.log(NewEmpId);
	document.getElementById('EmpId').value = NewEmpId;
}


var success = function(){
	var url = 'http://localhost:8090/javaTraining/RegistSuccess.html';
	// 画面遷移
	location.href=url;
}
var cancel = function(){
	var url = 'http://localhost:8090/javaTraining/EmployeeList.html'
	// 画面遷移
	location.href=url;
}
var registEmp = function(){
	var inputEmpId = $('#EmpId').val();

	var inputEmpName = $('#EmpName').val();

	var inputEmpAge = $('#EmpAge').val();

	var element = document.getElementById( "EmpGender" ) ;
	var radioNodeList = element.EmpGender;
	var inputEmpGender = radioNodeList.value

	var inputEmpAddressID_full = $('#EmpAddressID').val()
	var inputEmpAddress = '〒' + inputEmpAddressID_full.substring(0,3) +'-'+inputEmpAddressID_full.substring(3,7) +' '+ $('#EmpAddress').val()

	var num = EmpApId.selectedIndex;
	var inputEmpApId = EmpApId.options[num].value;

	var inputPassword = $('#password').val();
	var inputrePassword = $('#rePassword').val();

	if (inputPassword === inputrePassword){
		var requestQuery = {
				EmpId : inputEmpId,
				EmpName : inputEmpName,
				EmpAge : inputEmpAge,
				EmpGender : inputEmpGender,
				EmpAddress : inputEmpAddress,
				EmpApId : inputEmpApId,
				Password : inputPassword,
			};
			console.log('requestQuery',requestQuery);
			// サーバーにデータを送信する。
			$.ajax({
				type : 'POST',
				dataType:'json',
				url : '/javaTraining/EmpAddNewServlet',
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
	}else{
		alert('再入力したパスワードが一致しませんでした。再度入力してください。')
	}

}
var getApInfo = function(){

	$.ajax({
		type:'GET',
		dataType:'json',
		url:'/javaTraining/ApGetInfoServlet',
		success : function(json) {
			console.log('AP返却値', json);
			var tableElemnt = '';
			for (var i=0; i < json.length; i++) {
				var Ap = json[i];
				tableElemnt += '<option value="'+Ap.apId+'">'+Ap.apName+'</option>';
			}
			$('#EmpApId').append(tableElemnt);
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
	$('#commit').click(registEmp);
	getApInfo();
	setNewEmpId();
});
