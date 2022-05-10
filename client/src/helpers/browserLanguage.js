function browserLanguage() {
  const defaultLanguage = "en";
  const userLang = navigator.language || navigator.userLanguage;
  if (userLang) {
    return userLang.split(/[-_]/)[0];
  }
  return defaultLanguage;
}

export default browserLanguage;
