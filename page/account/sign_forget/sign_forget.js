var $ = require('jquery');
var FormValid = require('formValid');

var formValid = new FormValid({
	dom: '#forgetForm',
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
		},
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

$("#J_reset").click(function() {
	$('#J_errorwrap').hide();
	if(!formValid.check()) return;
	$.post('/account/ajax/forget_reset', $('#forgetForm').serialize(), function(data) {
		if (data.code == 0) {
			$('#J_errorwrap').show().find('.error-msg').text('密码重置成功， 请重新登录');
		} else {
			$('#J_errorwrap').show().find('.error-msg').text(data.message);
		}
	});
 	return false;
});