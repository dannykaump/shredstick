const deleteButtons = document.querySelectorAll('.delete')

Array.from(deleteButtons).forEach((button) => {button.addEventListener('click', deleteBoard)})

async function deleteBoard() {
    const boardBrand = this.parentNode.childNodes[1].innerText.trim()
    try {
        const response = await fetch('deleteBoard', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                brand: boardBrand,
            })
        })
        const data = await response.json()
        window.location.reload(true)
    } catch (err) {
        console.log(err)
    }
}
