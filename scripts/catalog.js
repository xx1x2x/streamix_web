function showProducts(categoryId) {
	document.querySelectorAll('.product-list').forEach(list => {
		list.style.display = 'none'
	})

	const selectedCategory = document.getElementById(categoryId)
	if (selectedCategory) {
		selectedCategory.style.display = 'block'
	}

	document.querySelectorAll('.menu button').forEach(btn => {
		btn.classList.remove('active')
	})
	event.target.classList.add('active')
}

const modal = document.getElementById('myModal')

function toggleModal(display) {
	modal.style.display = display
	document.body.style.overflow = display === 'block' ? 'hidden' : ''
}

modal.addEventListener('click', e => {
	if (e.target === modal) toggleModal('none')
})

function submitRequest() {
	const name = document.getElementById('name').value.trim()
	const surname = document.getElementById('surname').value.trim()
	const phone = document.getElementById('phone').value.trim()

	if (!name || !surname || !phone) {
		return showAlert('Пожалуйста, заполните все поля!', 'error')
	}

	if (!/^\+?[\d\s\-\(\)]{7,}$/.test(phone)) {
		return showAlert('Пожалуйста, введите корректный номер телефона', 'error')
	}

	showAlert(
		`Спасибо, ${name} ${surname}!<br>Мы свяжемся с вами по номеру ${phone}.`,
		'success'
	)

	const xmlData = `<?xml version="1.0" encoding="UTF-8"?>
<user>
	<name>${name}</name>
	<surname>${surname}</surname>
	<phone>${phone}</phone>
</user>`

	const blob = new Blob([xmlData], { type: 'application/xml' })
	const link = document.createElement('a')
	link.href = URL.createObjectURL(blob)
	link.download = 'user_data.xml'
	link.click()
	URL.revokeObjectURL(link.href)

	document.getElementById('name').value = ''
	document.getElementById('surname').value = ''
	document.getElementById('phone').value = ''

	setTimeout(() => toggleModal('none'), 1000)
}

function showAlert(message, type) {
	const alertBox = document.createElement('div')
	alertBox.className = `custom-alert ${type}`
	alertBox.innerHTML = message
	document.body.appendChild(alertBox)

	setTimeout(() => alertBox.classList.add('show'), 10)
	setTimeout(() => {
		alertBox.classList.remove('show')
		setTimeout(() => document.body.removeChild(alertBox), 300)
	}, 3000)
}

document.addEventListener('DOMContentLoaded', () => {
	document.getElementById('tshirts').style.display = 'block'
	document.querySelector('.menu button').classList.add('active')

	document.querySelectorAll('#name, #surname, #phone').forEach(input => {
		input.addEventListener('keypress', e => {
			if (e.key === 'Enter') submitRequest()
		})
	})
})
