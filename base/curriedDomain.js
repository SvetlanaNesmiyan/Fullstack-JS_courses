function curriedDomain(protocol) {
  return function(domainName) {
    return function(tld) {
      return `${protocol}://${domainName}.${tld}`;
    };
  };
}

const protocolSetter = curriedDomain('https')
const domainNameSetter = protocolSetter('example')
const fullDomain = domainNameSetter('com') 
console.log('Full Domain:', fullDomain)

export { curriedDomain }