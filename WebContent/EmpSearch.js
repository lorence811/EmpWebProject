/**
 *
 */
var Search = function(){

var inputEmpId = $('#EmpId').val();

var inputEmpName = $('#EmpName').val();

var num = EmpApId.selectedIndex;
var inputEmpApId = EmpApId.options[num].value;

console.log(inputEmpId+inputEmpName+inputEmpApId);
localStorage.setItem('inputEmpId',inputEmpId);
localStorage.setItem('inputEmpName',inputEmpName);
localStorage.setItem('inputEmpApId',inputEmpApId);

location.href = 'http://localhost:8090/javaTraining/EmployeeList.html'

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
	$('#search').click(Search);
	getApInfo();
});