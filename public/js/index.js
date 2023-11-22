$(document).ready(function() {
    const form = $('#buzzmaker')
    const content = $('#content')
    const count = $('#count')
    const submit = $('#submit')
    const feed = $('#posts')

    
    form.on('submit', (ev) => {
        const length = content.val().length;
        if (length > 1000)
            ev.preventDefault();
    })

    content.on('input', () => {
        const length = content.val().length;
        count.text(1000 - length);

        if (length > 1000) 
            submit.prop('disabled', true)
        else 
            submit.prop('disabled', false)
    })

    feed.on('click', '.editbutton', () => {
        const id = $(this).data('id');
        const container = $(this).closest('.post')
        const posttext = container.find('.post-content')
        const edit = container.find('.editbox')

        edit.val(posttext.text())
        edit.show();
        posttext.hide();

        edit.keypress((ev) => {
            if (e.which === 13) {
                const edittext = edit.val();
                posttext.text(edittext)
                fetch('/edit', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json'},
                    body: JSON.stringify({ id, edittext})
                }).then((res) => {
                    if (!res.ok) console.log('Edit failed')
                })
                posttext.show()
                edit.hide()
            }
        })
    })

    feed.on('click', '.deletebutton', () => {
        const id = $(this).data('id')
        const del = $(this)
        fetch(`/${id}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json'}
        }).then((res) => {
            if (res.ok) {
                del.closest('.post').remove();
            } else throw new Error('Delete failed')
        }).catch((err) => {
            console.log(err.message)
        })
        location.reload()
    })
})