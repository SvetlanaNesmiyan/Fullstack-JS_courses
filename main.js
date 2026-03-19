console.log('#53. JavaScript homework file');

/*
 * #1
 */

const isDebugMode = () => {
  const nodeEnv = process.env.NODE_ENV;
  const isDebug = nodeEnv === 'development';
  console.log('NODE_ENV:', nodeEnv);
  console.log('Is Debug Mode:', isDebug);
  return isDebug;
};

/*
 * #2
 */

const encodeToBase64 = (...args) => {
  try {
    const joinedString = args.join(':');
    const encoded = Buffer.from(joinedString).toString('base64');
    console.log('Encoding to Base64:', args, '->', encoded);
    return encoded;
  } catch (error) {
    console.error('Error encoding to Base64:', error.message);
    throw error;
  }
};

const encodeToHex = (...args) => {
  try {
    const joinedString = args.join(':');
    const encoded = Buffer.from(joinedString).toString('hex');
    console.log('Encoding to Hex:', args, '->', encoded);
    return encoded;
  } catch (error) {
    console.error('Error encoding to Hex:', error.message);
    throw error;
  }
};

const decodeFromBase64 = (base64String) => {
  try {
    const decoded = Buffer.from(base64String, 'base64').toString('utf8');
    console.log('Decoding from Base64:', base64String, '->', decoded);
    return decoded;
  } catch (error) {
    console.error('Error decoding from Base64:', error.message);
    throw error;
  }
};

const decodeFromHex = (hexString) => {
  try {
    const decoded = Buffer.from(hexString, 'hex').toString('utf8');
    console.log('Decoding from Hex:', hexString, '->', decoded);
    return decoded;
  } catch (error) {
    console.error('Error decoding from Hex:', error.message);
    throw error;
  }
};


/*
 * #3
 */

const safeDecodeFromBase64 = (base64String) => {
  try {
    const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
    if (!base64String || !base64Regex.test(base64String)) {
      throw new Error('Invalid base64 string');
    }
    
    const decoded = Buffer.from(base64String, 'base64').toString('utf8');
    console.log('Safe Base64 Decoded:', decoded);
    return decoded;
  } catch (error) {
    console.error('Error in safeDecodeFromBase64:', error.message);
    throw new Error('Invalid base64 string');
  }
};

const safeDecodeFromHex = (hexString) => {
  try {
    const hexRegex = /^[0-9A-Fa-f]+$/;
    if (!hexString || !hexRegex.test(hexString)) {
      throw new Error('Invalid hex string');
    }
    
    const decoded = Buffer.from(hexString, 'hex').toString('utf8');
    console.log('Safe Hex Decoded:', decoded);
    return decoded;
  } catch (error) {
    console.error('Error in safeDecodeFromHex:', error.message);
    throw new Error('Invalid hex string');
  }
};

export {
  isDebugMode,
  encodeToBase64,
  encodeToHex,
  decodeFromBase64,
  decodeFromHex,
  safeDecodeFromBase64,
  safeDecodeFromHex,
};
