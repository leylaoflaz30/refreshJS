import createElement from '../../helpers/domHelper';

function getModalContainer() {
    return document.getElementById('root');
}
function hideModal() {
    const modal = document.getElementsByClassName('modal-layer')[0];
    modal?.remove();
}

function createHeader(title, onClose) {
    const headerElement = createElement({ tagName: 'div', className: 'modal-header' });
    const titleElement = createElement({ tagName: 'span' });
    const closeButton = createElement({ tagName: 'div', className: 'close-btn' });

    titleElement.innerText = title;
    closeButton.innerText = '×';

    const close = () => {
        hideModal();
        onClose();
    };
    closeButton.addEventListener('click', close);
    headerElement.append(titleElement, closeButton);

    return headerElement;
}

function createModal({ title, bodyElement, onClose, imageWinner }) {
    const layer = createElement({ tagName: 'div', className: 'modal-layer' });
    const modalContainer = createElement({ tagName: 'div', className: 'modal-root' });
    const imageWinnerElement = createElement({ tagName: 'img', className: 'modal-image' });

    imageWinnerElement.src = imageWinner;
    const header = createHeader(title, onClose);

    modalContainer.append(header, bodyElement, imageWinnerElement);
    layer.append(modalContainer);

    return layer;
}

export default function showModal({ title, bodyElement, onClose = () => {}, imageWinner }) {
    const root = getModalContainer();
    const modal = createModal({ title, bodyElement, onClose, imageWinner });

    root.append(modal);
}
