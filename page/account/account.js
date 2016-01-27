var $ = require('jquery');

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