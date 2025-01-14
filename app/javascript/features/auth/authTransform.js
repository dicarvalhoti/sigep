import { createTransform } from 'redux-persist';

const authTransform = createTransform(
  (inboundState, key) => {
    const { error, ...rest } = inboundState;
    return rest; 
  },
  (outboundState, key) => outboundState, // Retorna o estado persistido ao reidratar
  { whitelist: ['auth'] } // Aplica o transform apenas ao slice `auth`
);

export default authTransform;