export function notify({ 
    msg = 'Notification alert', 
    className = 'alert-primary', 
    timeout = 1000 
} = {}) {
    if (!getContainer()) {
        createContainer();
    }

    const index = getIndex();
    const template = createAlertTemplate(msg, className, index);
    const container = getContainer();

    container.insertAdjacentHTML('beforeend', template);

    setTimeout(() => closeAlert(index), timeout);
}

function createContainer() {
    const container = document.createElement('div');
    container.classList.add('notifications-container');
    container.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        z-index: 99;
    `;
    document.body.append(container);
}


function getContainer() {
    return document.querySelector('.notifications-container');
}

function getIndex() {
    return document.querySelectorAll('.notifications-container .alert').length;
}

function createAlertTemplate(msg, className, index) {
    return `<div class="alert ${className}" data-index="${index}">${msg}</div>`;
}

export function closeAlert(index) {
    let alert;
    if (index === undefined) {
        alert = document.querySelector('.notifications-container .alert');
    } else {
        alert = document.querySelector(`.notifications-container .alert[data-index="${index}"]`);
    }

    if (!alert) {
        return;
    };
    alert.remove();
}