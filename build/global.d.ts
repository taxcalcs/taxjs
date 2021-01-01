import * as BigJs from 'big.js';

declare global {
    const RoundingMode: typeof BigJs.RoundingMode;
    type Big = BigJs.Big;
}

export {};
