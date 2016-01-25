var $ = require('jquery');
$('#J_submit').click(function(){
	$('#J_errorwrap').hide();
	$.post('/account/ajax/sign_in', $('#loginForm').serialize(), function(data) {
		if(data.code == 0){
			location.href = '/'
		}else{
			$('#J_errorwrap').show().find('.error-msg').text(data.message);
		}
	});
	return false;
});
$("#J_regsub").click(function() {
	$.post('/account/ajax/sign_up', $('#regForm').serialize(), function(data) {
		if(data.code == 0){
			location.href = '#'
		}else{
			$('#J_errorwrap').show().find('.error-msg').text(data.message);
		}
	});
	return false;
});