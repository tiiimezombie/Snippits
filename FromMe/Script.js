//* TITLE FromMe **//
//* VERSION 1.0.4 **//
//* DESCRIPTION	Adds special indicator for when someone reblogs from you**//
//* DEVELOPER devtimezombie **//
//* FRAME false **//
//* BETA false **//

XKit.extensions.FromMe = new Object({

	running: false,

	preferences: {
		"main_blog": {
			text: "Blog to check for follow-backs on:",
			default: "",
			value: "",
			type: "blog"
		}
	},

	init: function(blogs) {
		if ($.inArray(this.preferences.main_blog.value, blogs) === -1) {
			this.preferences.main_blog.value = blogs[0];
		}
	},

	run: function() {
		this.running = true;
		XKit.post_listener.add("FromMe", XKit.extensions.FromMe.annotate_reblog);
		XKit.extensions.FromMe.annotate_reblog();
	},

	annotate_reblog: function() {
		var _mainBlogValue = XKit.extensions.FromMe.preferences.main_blog.value
                var _text = '<div class="checked" style="margin: 10px 0 10px 12px; display: inline-block; height: 24px; width: 24px;"><p style="font-size:20px; line-height: 22px;">✅</p></div>';

                $.each($('article'), function() {
                        var header = $(this).find('header');
                        if (!$(header).hasClass("fromMeScanned")) {
                                $(header).addClass( "fromMeScanned" );
                                if($(header).attr("aria-label").includes(_mainBlogValue)){
                                        $(this).find('footer').find("[aria-label='Reblog']").parent().parent().prepend(_text);
                                }
                        }
                });
	},

	destroy: function() {
		this.running = false;
		XKit.post_listener.remove("FromMe");
	}

});