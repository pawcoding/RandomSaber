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
			load(data.packs)
		},
		url: '/register.json'
	})
}

function load(packs) {
	console.log('| Loading packs')

	let index = 0
	packs.forEach(pack => {
		loadMusicPack(pack, index++)
	})
}

function loadMusicPack(pack, index) {
	$.ajax({
		cache: true,
		dataType: 'json',
		success: function(data, status) {
			console.log('| \tPulled "' + data.title + '"')
			data.index = index
			data.id = pack
			register[pack] = data

			if (Object.keys(register).length === count)
				finishLoading()
		},
		url: '/musicpacks/' + pack + '.json'
	})
}

function finishLoading() {
	console.log('| Finished Loading')
	const titles = Object.keys(register).sort((a, b) => register[a].index - register[b].index)
	for (const title of titles) {
		const pack = register[title]
		$('#' + pack.type).append(`
			<div class="pack">
				<input type="checkbox" name="${pack.id}" value="${pack.id}" id="${pack.id}" ${pack.type === 'ost' ? 'checked' : ''}>
				<label for="${pack.id}">
					<img src="/covers/${pack.id}.jpg" class="cover" title="${pack.title}" alt="${pack.title}">
				</label>
			</div>
		`)
		levels += pack.levels.length
	}

	changePacks()
	$('.pack input').change(function(){
		changePacks()
	})

	$('#level').text('Ready to start')
}