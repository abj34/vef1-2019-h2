
// fjarlægi öll child element frá element
export function empty(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

// býr til element og setur inn class og börn ef til
export function el(name, className, ...children) {
  const element = document.createElement(name);
  if (className !== undefined) {
    element.classList.add(className);
  }
  if (Array.isArray(children)) {
    children.forEach((child) => {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else if (child) {
        element.appendChild(child);
      }
    });
  }
  return element;
}

// býr til lista úr json með sama lykil(key)
export function createListFromKey(jSon, key) {
  const list = [];
  for (let m = 0; m< jSon.length; m += 1) {
    const element = jSon[m][key];
    list.push(element);
  }
  return list;
}

// les storage
export function readLocalStorage(key, initial) {
  const val = localStorage.getItem(key);
  if (val === null) {
    if (initial !== undefined) {
      localStorage.setItem(key, initial);
      return initial;
    }
    return undefined
  }
  return val;
}

// les storage, sendir boolean ef hægt
export function readLocalStorageBoolean(key, initial) {
  let val;
  if (initial === undefined) {
    val = readLocalStorage(key, false);
  } else {
    val = readLocalStorage(key, initial);
  }

  if (val === 'true') {
    return true;
  }
  if (val === 'false') {
    return false;
  }

  return val;
}

// Sækir upplýsingar úr path/json
// TODO FINNA ÚT HVAÐ BRAUT ÞETTA FALL
export function fetchData(path) {
  return fetch(path).then((result) => {
    if (!result.ok) {
      throw new Error('Non 200 status');
    }
    return result.json();
  }).catch(error => console.error(error));
}

// fær value frá url parameter
export function getUrlParameter(paramName) {
  const searchString = window.location.search.substring(1);
  const params = searchString.split('&');

  for (let m = 0; m<params.length; m += 1) {
    const val = params[m].split('=');
    if (val[0] === paramName) {
      return val[1];
    }
  }
  return undefined;
}