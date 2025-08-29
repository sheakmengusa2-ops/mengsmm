import { USER_LEVELS } from '../constants';
import type { UserLevelKey } from '../types';

export const getUserLevel = (spent: number): UserLevelKey => {
    if (spent >= USER_LEVELS.PLATINUM.minSpent) return 'PLATINUM';
    if (spent >= USER_LEVELS.GOLD.minSpent) return 'GOLD';
    if (spent >= USER_LEVELS.SILVER.minSpent) return 'SILVER';
    return 'BRONZE';
};

export const getLevelDetails = (levelKey: UserLevelKey) => {
    return USER_LEVELS[levelKey];
};

export const getNextLevel = (currentLevelKey: UserLevelKey) => {
    const levels: UserLevelKey[] = ['BRONZE', 'SILVER', 'GOLD', 'PLATINUM'];
    const currentIndex = levels.indexOf(currentLevelKey);
    if (currentIndex < levels.length - 1) {
        const nextLevelKey = levels[currentIndex + 1];
        return { key: nextLevelKey, ...USER_LEVELS[nextLevelKey] };
    }
    return null; // Max level reached
};
