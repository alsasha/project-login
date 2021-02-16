export function showInputError(elem) {
    const invalidMsg = elem.dataset.invalidMessage || 'Invalid input';
    const parent = elem.parentElement;
    const template = inputErrorTemplate(invalidMsg);
    elem.classList.add('is-invalid');
    parent.insertAdjacentHTML('beforeend', template);
}

function inputErrorTemplate(msg) {
    return `
        <div class="invalid-feedback">${msg}</div>
    `;
}

export function removeInputError(elem) {
    const parent = elem.parentElement;
    const err = parent.querySelector('.invalid-feedback');
    if (!err) return;

    elem.classList.remove('is-invalid');
    err.remove();
}

