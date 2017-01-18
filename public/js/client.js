$(document).ready(function(){
	// WebSocket
	const socket = io.connect();
	// neue Nachricht
	socket.on('chat', function (data) {
		let zeit = new Date(data.zeit);
		let name = new String(data.name);
		
		if (data.text == ""){
			
		} else{
			if (data.name == $('#name').val()){
			$('#content').append(
			$('<li class="message_self"></li>').append(
				// Name
				$('<b>').text(typeof(data.name) != 'undefined' ? data.name + ' ' : ''),
				// Uhrzeit
				$('<span class="timestamp">').text('[' +
					(zeit.getHours() < 10 ? '0' + zeit.getHours() : zeit.getHours())
					+ ':' +
					(zeit.getMinutes() < 10 ? '0' + zeit.getMinutes() : zeit.getMinutes())
					+ '] '
				),
				// Zeilenumbruch
				$('<br>').text('<br>'),
				// Text
				$('<span>').text(data.text))
			);
			}else{
				$('#content').append(
				$('<li class="message_other"></li>').append(
					// Name
					$('<b>').text(typeof(data.name) != 'undefined' ? data.name + ' ' : ''),
					// Uhrzeit
					$('<span class="timestamp">').text('[' +
						(zeit.getHours() < 10 ? '0' + zeit.getHours() : zeit.getHours())
						+ ':' +
						(zeit.getMinutes() < 10 ? '0' + zeit.getMinutes() : zeit.getMinutes())
						+ '] '
					),
					// Zeilenumbruch
					$('<br>').text('<br>'),
					// Text
					$('<span>').text(data.text))
				);
			}
		}
		
		// nach unten scrollen
		$('#content').scrollTop($('#content')[0].scrollHeight);
	});
	// Nachricht senden
	function senden(){
		// Eingabefelder auslesen
		let name = $('#name').val();
		let text = $('#text').val();
		// Socket senden
		socket.emit('chat', { name: name, text: text });
		// Text-Eingabe leeren
		$('#text').val('');
	}
	// bei einem Klick
	$('#senden').click(senden);
	// oder mit der Enter-Taste
	$('#text').keypress(function (e) {
		if (e.which == 13) {
			senden();
		}
	});
});