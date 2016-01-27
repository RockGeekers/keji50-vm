var $ = require('jquery');
var FormValid = require('formValid');

var formValid = new FormValid({
	dom: '#loginForm',
	errorStop: true,
	errorDom : '#J_errorwrap',
	rules: {
		username : [{
			rule : function(value){
				return value != '';
			},
			errorText : '请输入用户名'
		},{
			rule: function(value) {
            	return FormValid.DEFAULT_RULES.email.rule.test(value) || FormValid.DEFAULT_RULES.mobile.rule.test(value);
            },
           	errorText: '请输入正确的邮箱地址或手机号'
		}],
		password : {
			rule : function(value){
				return value != '';
			},
			errorText : '请输入密码'
		}
	}
});
$('#J_signin').click(function(){
	$('#J_errorwrap').hide();
	if(!formValid.check()) return;
	$.post('/account/ajax/sign_in', $('#loginForm').serialize(), function(data) {
		if(data.code == 0){
			location.href = '/uc/home'
		}else{
			$('#J_errorwrap').show().find('.error-msg').text(data.message);
		}
	});
	return false;
});