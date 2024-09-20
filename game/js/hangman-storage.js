const PARAMETERS = (function() {

  const _STORAGE_KEY = "hangman-data";
  const _STORAGE_DATA = {
    total: 0,
    found: 0,
    language: "fr"
  }

  const _getData = function() {
    try {
      const data = JSON.parse(window.localStorage.getItem(_STORAGE_KEY));
      if (data != null) {
        return data;
      }
      else {
        return _STORAGE_DATA;
      }
    }
    catch (ex) {
      return _STORAGE_DATA;
    }
  }

  const _saveData = function() {
    const data = JSON.stringify(_STORAGE_DATA);
    window.localStorage.setItem(_STORAGE_KEY, data);
  }

  const _storeScore = function(wordsFound, wordsTotal, saveNow = false) {
    _STORAGE_DATA.found = wordsFound;
    _STORAGE_DATA.total = wordsTotal;
    if (saveNow === true) {
      _saveData();
    }
  }

  const _getScore = function() {
    const data = _getData();
    return {
      found: data.found,
      total: data.total
    }
  }

  const _clearScore = function(saveNow = false) {
    _storeScore(0, 0);
    if (saveNow === true) {
      _saveData();
    }
  }

  const _storeLanguage = function(langCode, saveNow = false) {
    _STORAGE_DATA.language = langCode;
    if (saveNow === true) {
      _saveData();
    }
  }

  const _getLanguage = function() {
    const data = _getData();
    let lang = data.language;
    if (lang == null) {
      lang = "fr";
    }
    return lang;
  }

  return {
    getScore     : _getScore,
    storeScore   : _storeScore,
    getLanguage  : _getLanguage,
    storeLanguage: _storeLanguage,
    save         : _saveData,
  }

})();