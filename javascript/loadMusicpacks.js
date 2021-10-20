let register = {}
let count = 0

$(function(){
	loadRegister();
})

function loadRegister() {
	console.log('| Check register')
	$.ajax({
		cache: true,
		dataType: 'json',
		success: function(data, status) {
			console.log('| Fetched packs: "'+ data.packs.join('", "') + '"')
			count = data.packs.length
			loadMusicPacks(data.packs)
		},
		url: '/register.json'
	})
}

function loadMusicPacks(packs) {
	console.log('| Loading packs')

	packs.forEach(pack => {
		loadMusicPack(pack)
	})
}

function loadMusicPack(pack) {
	console.log('| \tLoading "' + pack + '"')
	$.ajax({
		cache: true,
		dataType: 'json',
		success: function(data, status) {
			console.log('| \tPulled "' + data.title + '"')
			register[data.id] = data

			if (Object.keys(register).length === count)
				finishLoading()
		},
		url: '/musicpacks/' + pack + '.json'
	})
}

function finishLoading() {
	console.log('| Finished Loading')
	for (const title in register) {
		const pack = register[title]
		$('#' + pack.type).append(`
			<div class="pack">
				<input type="checkbox" name="${pack.id}" value="${pack.id}" id="${pack.id}" ${pack.type === 'ost' ? 'checked' : ''}>
				<label for="${pack.id}">
					<img src="/covers/${pack.id}" title="${pack.title}" alt="${pack.title}">
				</label>
			</div>
		`)
	}
}