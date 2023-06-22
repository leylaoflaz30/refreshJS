import createElement from '../helpers/domHelper';

export function createFighterImage(fighter) {
    const { source, name } = fighter || { source: '', name: 'Waiting for my hero' };
    const attributes = {
        src: source,
        title: name,
        alt: name
    };
    const imgElement = createElement({
        tagName: 'img',
        className: 'fighter-preview___img',
        attributes
    });

    return imgElement;
}

export function createFighterName(fighter) {
    const { name } = fighter || { name: '*******' };
    const nameElement = createElement({
        tagName: 'div',
        className: 'fighter-preview fighter-preview___name'
    });

    nameElement.innerText = name;

    return nameElement;
}

export function createFighterAttack(fighter) {
    const { attack } = fighter || { attack: '*' };
    const attackElement = createElement({
        tagName: 'div',
        className: 'fighter-preview fighter-preview___attack'
    });

    attackElement.innerText = `Damage: ${attack}`;

    return attackElement;
}

export function createFighterDefense(fighter) {
    const { defense } = fighter || { defense: '*' };
    const defenseElement = createElement({
        tagName: 'div',
        className: 'fighter-preview fighter-preview___defense'
    });

    defenseElement.innerText = `Defense: ${defense}`;

    return defenseElement;
}

export function createFighterHealth(fighter) {
    const { health } = fighter || { health: '**' };
    const healthElement = createElement({
        tagName: 'div',
        className: 'fighter-preview fighter-preview___health'
    });

    healthElement.innerText = `Health: ${health}`;

    return healthElement;
}

export function createFighterPreview(fighter, position) {
    const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
    const fighterElement = createElement({
        tagName: 'div',
        className: `fighter-preview___root ${positionClassName}`
    });

    // todo: show fighter info (image, name, health, etc.)

    const fighterImage = createFighterImage(fighter);
    const fighterName = createFighterName(fighter);
    const fighterAttack = createFighterAttack(fighter);
    const fighterDefense = createFighterDefense(fighter);
    const fighterHealth = createFighterHealth(fighter);

    fighterElement.append(fighterImage, fighterName, fighterAttack, fighterDefense, fighterHealth);

    return fighterElement;
}
