import showModal from './modal';

export default function showWinnerModal(fighter) {
    // call showModal function
    showModal({
        title: 'Winner',
        bodyElement: `The winner is ${fighter.name}!`,
        imageWinner: fighter.source
    });
}
