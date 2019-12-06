
(function($) {
/*------------------
		Background Set
	--------------------*/
	$('.set-bg').each(function() {
    var bg = $(this).data('setbg');
    console.log(bg)
		$(this).css('background-image', 'url(' + bg + ')');
	});
})(window.jQuery);