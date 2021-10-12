let register = {}
let count = 0

$(function(){
	loadRegister();
})

function loadRegister() {
	console.log('\tCheck register')
	$.ajax({
		cache: true,
		dataType: 'json',
		success: function(data, status) {
			console.log('\tFetched packs: "'+ data.packs.join('", "') + '"')
			count = data.packs.length
			loadMusicPacks(data.packs)
		},
		url: '/register.json'
	})
}

function loadMusicPacks(packs) {
	console.log('\tLoading packs')

	packs.forEach(pack => {
		loadMusicPack(pack)
	})
}

function loadMusicPack(pack) {
	console.log('\t\tLoading "' + pack + '"')
	$.ajax({
		cache: true,
		dataType: 'json',
		success: function(data, status) {
			console.log('\t\tPulled "' + data.title + '"')
			register[data.id] = data

			if (Object.keys(register).length === count)
				finishLoading()
		},
		url: '/musicpacks/' + pack
	})
}

function finishLoading() {
	console.log('\tFinished Loading')
	console.log(register)
}