var $ = require('jquery');

$('#J_signout, #J_signout_uc').click(function(){
	$.post('/account/ajax/sign_out', function(data) {
 		if(data.code == 0){
 			location.href = '/'
 		}
 	});
 	return false;
});
