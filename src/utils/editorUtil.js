export const htmlRemove = data =>
  String(data)
    .replaceAll(/(&lt;([^>]+)>)/gi, '')
    .replaceAll(/&nbsp;/gi, ' ');

export const decodeEntities = (() => {
  const element = document.createElement('div');

  function decodeHTMLEntities(str) {
    let newStr = str;
    if (newStr && typeof newStr === 'string') {
      newStr = newStr.replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, '');
      newStr = newStr.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, '');
      element.innerHTML = newStr;
      newStr = element.textContent;
      element.textContent = '';
    }
    return newStr;
  }

  return decodeHTMLEntities;
})();
