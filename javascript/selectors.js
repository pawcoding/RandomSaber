function refreshSelectors() {
	const packs = $('.pack')
	packs.each(function(){
		if ($(this).find('input[type=checkbox]').prop('checked'))
			$(this).find('.cover').addClass('checked')
		else
			$(this).find('.cover').removeClass('checked')
	})

	const settings = $('.setting')
	settings.each(function(){
		if ($(this).find('input[type=radio]').prop('checked'))
			$(this).find('label').addClass('checked')
		else
			$(this).find('label').removeClass('checked')
	})
}

$(function(){
	$('.setting input').change(function(){
		refreshSelectors()
	})
})