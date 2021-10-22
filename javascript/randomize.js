let levels = []

$(function(){
	$('#randomize').click(function(){
		randomize()
	})
})

function randomize() {
	if (Object.keys(register).length === 0) {
		alert('Bitte warte, bis alle Packs geladen sind.')
	} else {
		$('#level').text(
			(levels.length === 0) ?
				'No level with this settings available' :
				levels[Math.floor(Math.random()*levels.length)])
	}
}