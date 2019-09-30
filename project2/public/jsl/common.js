//打开字滑入效果
window.onload = function(){
	$(".connect p").eq(0).animate({"left":"0%"}, 600);
	$(".connect p").eq(1).animate({"left":"0%"}, 400);
};
//jquery.validate表单验证
$(document).ready(function(){
	//登陆表单验证
	$("#loginForm").validate({
		rules:{
			username:{
				required:true,//必填
				minlength:3, //最少6个字符
				maxlength:32,//最多20个字符
			},
			password:{
				required:true,
				minlength:3, 
				maxlength:32,
			},
		},
		//错误信息提示
		messages:{
			username:{
				required:"必須填寫名稱",
				minlength:"名稱至少為3個字",
				maxlength:"名稱至多為32個字",
				remote: "名稱已存在",
			},
			password:{
				required:"必須填寫密码",
				minlength:"密碼至少為3個字",
				maxlength:"密碼至多為32個字",
			},
		},

	});
	//注册表单验证
	$("#registerForm").validate({
		rules:{
			username:{
				required:true,//必填
				minlength:3, //最少6个字符
				maxlength:32,//最多20个字符
				remote:{
					url:"http://kouss.com/demo/Sharelink/remote.json",//用户名重复检查，别跨域调用
					type:"post",
				},
			},
			password:{
				required:true,
				minlength:3, 
				maxlength:32,
			},
			email:{
				required:true,
				email:true,
			},
			confirm_password:{
				required:true,
				minlength:3,
				equalTo:'.password'
			},
			phone_number:{
				required:true,
				phone_number:true,//自定义的规则
				digits:true,//整数
			}
		},
		//错误信息提示
		messages:{
			username:{
				required:"必須填寫名稱",
				minlength:"名稱至少為3個字",
				maxlength:"名稱至多為32個字",
				remote: "名稱已存在",
			},
			password:{
				required:"必須填寫密码",
				minlength:"密碼至少為3個字",
				maxlength:"密碼至多為32個字",
			},
			email:{
				required:"請输入信箱地址",
				email: "請输入正確的email地址"
			},
			confirm_password:{
				required: "請再次输入密码",
				minlength: "確認密碼不能少於3個字",
				equalTo: "兩次输入密碼不一致",//与另一个元素相同
			},
			phone_number:{
				required:"請输入手機號碼",
				digits:"請输入正確的手機號碼",
			},
		
		},
	});
	//添加自定义验证规则
	jQuery.validator.addMethod("phone_number", function(value, element) { 
		var length = value.length; 
		var phone_number = /^(((09[0-9]{2}))+\d{6})$/ 
		return this.optional(element) || (length == 10 && phone_number.test(value)); 
	}, "手機號碼格式錯誤"); 
});
