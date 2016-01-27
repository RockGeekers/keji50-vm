var $ = require('jquery');
$('#J_signin').click(function(){
	$('#J_errorwrap').hide();
	$.post('/account/ajax/sign_in', $('#loginForm').serialize(), function(data) {
		if(data.code == 0){
			location.href = '/uc/home'
		}else{
			$('#J_errorwrap').show().find('.error-msg').text(data.message);
		}
	});
	return false;
});
$("#J_signup").click(function() {
	$('#J_errorwrap').hide();
	$.post('/account/ajax/sign_up', $('#regForm').serialize(), function(data) {
		if(data.code == 0){
			location.href = '/uc/home'
		}else{
			$('#J_errorwrap').show().find('.error-msg').text(data.message);
		}
	});
	return false;
});
$("#J_reset").click(function() {
	$('#J_errorwrap').hide();
	$.post('/account/ajax/forget_reset', $('#forgetForm').serialize(), function(data) {
		if (data.code == 0) {
			$('#J_errorwrap').show().find('.error-msg').text('密码重置成功， 请重新登录');
		} else {
			$('#J_errorwrap').show().find('.error-msg').text(data.message);
		}
	});
	return false;
});
$('#J_signout, #J_signout_uc').click(function(){
	$.post('/account/ajax/sign_out', function(data) {
		if(data.code == 0){
			location.href = '/'
		}
	});
	return false;
});
$("#J_sendsms").click(function() {
	var username = $("#username").val();
	if (username) {
		$.post('/account/ajax/send_code', {'username' : username}, function(data) {
			if (data.code == 0) {
				$("#verifyId").val(data.data);
			} else {
				$('#J_errorwrap').show().find('.error-msg').text(data.message);
			}
		});
	}
});