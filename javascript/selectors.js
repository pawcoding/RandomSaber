let difficulty = 'expert'
let mode = 'two'

function changePacks() {
	const packs = $('.pack')
	packs.each(function(){
		if ($(this).find('input[type=checkbox]').prop('checked'))
			$(this).find('.cover').addClass('checked')
		else
			$(this).find('.cover').removeClass('checked')
	})

	applySettingsAndPacks()
}

function changeSettings() {
	const settings = $('.setting')
	settings.each(function(){
		if ($(this).find('input[type=radio]').prop('checked'))
			$(this).find('label').addClass('checked')
		else
			$(this).find('label').removeClass('checked')
	})

	difficulty = $('input[name=difficulty]:checked').val()
	mode = $('input[name=mode]:checked').val()

	applySettingsAndPacks()
}

function applySettingsAndPacks() {
	levels = []
	for (const id in register) {
		if ($('#' + id).prop('checked')) {
			for (const level of register[id].levels) {
				if (level.modes[mode].includes(difficulty))
					levels.push(register[id].title.replace(/ /g, '\xa0') + ': ' + level.song.replace(/ /g, '\xa0'))
			}
		}
	}
}

$(function(){
	$('.setting input').change(function(){
		changeSettings()
	})
	changeSettings()
})
