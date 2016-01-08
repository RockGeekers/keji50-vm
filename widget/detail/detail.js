var $ = require('jquery');
var Template = require('template');
var app = module.exports = function(opt){
	var detail = {
		init : function(){
			this.commentTemplate = __inline('./detail.tpl');
			this.addEvent();
		},
		addEvent : function(){
			var _this = this,
				i = 0
			var getlogin = setInterval(function(){
				i++;
				if(loginInfo || i > 100){
					if(loginInfo && loginInfo.isUserLogin){
						$('#J_userInfo').show().find('.avatar').css('backgroundImage','url(' + loginInfo.image + ')');
						$('#J_loginname').html(loginInfo.nickName);
						$('.require-login').show();
						$('.J_requirelogin').hide();
					}else{
						$('.require-login').hide();
						$('.J_requirelogin').show();
					}
					_this.getList(opt.commentUrl,{
						author_id : loginInfo ? loginInfo.id : 0
					},'get',function(data){
						if(data.code == 0){
							if(data.data.length){
								$('#commentTotalCount,#commentFormCount').html(data.data.length);
								var result = Template.parse(_this.commentTemplate,{data:data});
								$('#J_comments').html(result);
							}
						}
					});
					clearInterval(getlogin);
				}
			},200);
			
			$('#J_comments').delegate('.pull-right','click',function(){
				var dataAuthor = $(this).attr('data-author')
				$('#post').attr('data-author',dataAuthor);
				$('.J_toAuthor').text(dataAuthor);
				$('.reply_message').show();
			});
			$('#J_userInfo .ladda-button').click(function(){
				var content = $('#post').val();
				if(content){
					_this.postComment(opt.postUrl ,{
						author_id : loginInfo.id,
						to_author : $('#post').attr('data-author'),
						content : content
					},function(data){
						if(data.code == 0){
							$('#post').val('');
							$('.J_delAuthor').click();
							var result = Template.parse(_this.commentTemplate,{data:data});
							$('#J_comments').prepend(result);
						}
					});
				}
			});
			$('.J_delAuthor').click(function(){
				$('.J_toAuthor').text('');
				$('.reply_message').hide();
				$('#post').attr('data-author','');
			});
		},
		getList : function(url,opt,type,callback){
			var _this = this;
			$.ajax({
			   	type: type,
			   	url: url,
			   	data: opt,
			   	success: callback
			}).complete(function(){
			});
		},
		postComment : function(url,opt,callback){
			$.ajax({
			   	type: 'post',
			   	url: url,
			   	data: opt,
			   	success: callback
			}).complete(function(){
			});
		} 
	};
	detail.init();
}

