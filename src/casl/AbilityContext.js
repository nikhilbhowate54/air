// casl/AbilityContext.js
import { createContext } from 'react';
import { createMongoAbility } from '@casl/ability';

export const AbilityContext = createContext(createMongoAbility([]));
