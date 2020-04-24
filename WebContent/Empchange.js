/**
 *
 */
var parameter  = location.search;
parameter = decodeURIComponent( parameter );
parameter = parameter.split('=')[1];

var success = function(){
	var url = 'http://localhost:8090/javaTraining/RegistSuccess.html';
	// 画面遷移
	location.href=url;
}
var cancel = function(){
	var url = 'http://localhost:8090/javaTraining/EmpChange.html?q='+parameter;
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

	var requestQuery = {
		EmpId : inputEmpId,
		EmpName : inputEmpName,
		EmpAge : inputEmpAge,
		EmpGender : inputEmpGender,
		EmpAddress : inputEmpAddress,
		EmpApId : inputEmpApId,
	};
	console.log('requestQuery',requestQuery);
	// サーバーにデータを送信する。
	$.ajax({
		type : 'POST',
		dataType:'json',
		url : '/javaTraining/EmpchangeServlet',
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

var getEmp = function(){
	var requestQuery = { EmpId  : parameter };
	console.dir(requestQuery);

	console.log( requestQuery);

	$.ajax({
		type:'GET',
		dataType:'json',
		url:'/javaTraining/EmpchangeServlet',
		data : requestQuery,
		success : function(json) {
			console.log('返却値', json);
			document.getElementById( "EmpId" ).value=json.empId ;
			document.getElementById( "EmpName" ).value=json.empName ;
			document.getElementById( "EmpAge" ).value=json.empAge ;

			var elements = document.getElementsByName( "EmpGender" ) ;
			if(json.empGender == '男'){
				elements[0].checked = true ;
			}else {
				elements[1].checked = true ;
			}
			var e = json.empAddress;
			var addId =e.substring(1,4)+e.substring(5,9);
			var add = e.substring(10);
			document.getElementById( "EmpAddressID" ).value=addId;
			document.getElementById( "EmpAddress" ).value=add;
			document.getElementById( "EmpApId" ).value=json.empApId;
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert('データは通信に失敗しました');
			console.log(errorThrown)
		}
	});
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
	getEmp();

});
