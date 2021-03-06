var $ = require('jquery');
var FormValid = require('formValid');

var formValid = new FormValid({
	dom: '#regForm',
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
            	return FormValid.DEFAULT_RULES.mobile.rule.test(value);
            },
           	errorText: '请输入正确的手机号'
		}],
		password : {
			rule : function(value){
				return value != '';
			},
			errorText : '请输入密码'
		},
		confirmPassword : [{
			rule : function (value) {
				return value != '';
			},
			errorText : '请输入确认密码'
		}, {
			rule : function (value) {
				return value == $("#password").val();
			},
			errorText : '确认密码和密码不相同'
		}],
		verifyId : {
			rule : function (value) {
				return value != '';
			},
			errorText : '请获取验证码'
		},
		verifyCode : {
			rule : function (value) {
				return value != ''
			},
			errorText : '验证码不能为空'
		}
	}
});
$("#J_signup").click(function() {
	 $('#J_errorwrap').hide();
	if(!formValid.check()) return;
	$.post('/account/ajax/sign_up', $('#regForm').serialize(), function(data) {
		if(data.code == 0){
			location.href = '/uc/home'
		}else{
			$('#J_errorwrap').show().find('.error-msg').text(data.message);
		}
	});
	return false;
});