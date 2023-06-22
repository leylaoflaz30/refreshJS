/* eslint-disable import/no-cycle */

import controls from '../../constants/controls';
import { updateHealthIndicators } from './arena';

export function getHitPower(fighter) {
    // return hit power
    const { attack } = fighter;
    const criticalHitChance = Math.random() + 1;
    return attack * criticalHitChance;
}

export function getBlockPower(fighter) {
    // return block power
    const { defense } = fighter;
    const dodgeChance = Math.random() + 1;
    return defense * dodgeChance;
}

export function getDamage(attacker, defender) {
    // return damage
    const hitPower = getHitPower(attacker);
    const blockPower = getBlockPower(defender);
    const damage = Math.max(0, hitPower - blockPower);
    return damage;
}

export async function fight(firstFighter, secondFighter) {
    return new Promise(resolve => {
        // resolve the promise with the winner when fight is over
        const { PlayerOneAttack, PlayerTwoAttack, PlayerOneBlock, PlayerTwoBlock } = controls;

        function isBlocked(fighter) {
            return fighter.isBlocking;
        }

        function handleKeyDown(event) {
            const key = event.code;
            if (key === PlayerOneAttack || key === PlayerTwoAttack) {
                const attacker = key === PlayerOneAttack ? firstFighter : secondFighter;
                const defender = key === PlayerOneAttack ? secondFighter : firstFighter;

                if (!isBlocked(defender) && !isBlocked(attacker)) {
                    const damage = getDamage(attacker, defender);
                    defender.health -= damage;
                }

                if (defender.health <= 0) {
                    document.removeEventListener('keydown', handleKeyDown);
                    resolve(attacker);
                }

                updateHealthIndicators(firstFighter, secondFighter);
            }

            if (key === PlayerOneBlock || key === PlayerTwoBlock) {
                const blocker = key === PlayerOneBlock ? firstFighter : secondFighter;
                blocker.isBlocking = true;
            }
        }

        function handleKeyUp(event) {
            const key = event.code;

            if (key === PlayerOneBlock || key === PlayerTwoBlock) {
                const blocker = key === PlayerOneBlock ? firstFighter : secondFighter;
                blocker.isBlocking = false;
            }
        }
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
    });
}
