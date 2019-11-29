import { empty, el, readLocalStorageBoolean, fetchData, } from './helpers';
import { PATH_LIST_LECTURES, } from './config';
import HTMLBuilder from './htmlBuilder';

export default class List {
  constructor() {
    this.container = document.querySelector('.list');
    this.enHTML = readLocalStorageBoolean('enHTML', true);
    this.enCSS = readLocalStorageBoolean('enCSS', true);
    this.enJS = readLocalStorageBoolean('enJS', true);

    this.HTML = new HTMLBuilder();
  }

  // hvaða tegund lecture er
  filterLectures(data) {
    const filtered = [];
    for (let m = 0; m<data.length; m =+ 1) {
      const item = data[m];
      if (item.category === 'html' && this.enHTML) {
        filtered.push(item);
      } else if (item.category === 'css' && this.enCSS) {
        filtered.push(item);
      } else if (item.category === 'javascript' && this.enJS) {
        filtered.push(item);
      } else if (!this.enCSS && !this.enHTML && !this.enJS) {
        filtered.push(item);
      }
    }
    return filtered;
  }

  
  showLectures(filtered) {
    const cards = el('div', 'cards');
    const cardsRow = el('div', 'cards__row');

    for (let m = 0; m<filtered.length; m += 1) {
      const item = this.HTML.createCard(filtered[m]);
      cardsRow.appendChild(item);
    }

    cards.appendChild(cardsRow);
    this.container.appendChild(cards);
  }

  // hlaðar inn json með fetchData
  load() {
    empty(this.container);
    fetchData(PATH_LIST_LECTURES)
    .then((data) => {
      const filtered = this.filterLectures(data.lectures);
      this.showLectures(filtered);
    }).catch(error => console.error(error));
  }

  //fyrir takka á html
  toggleHTML() {
    this.enHTML = !this.enHTML;
    localStorage.setItem('enHTML', this.enHTML);
    return this.enHTML;
  }

  //fyrir takka á html
  returnHTML() {
    return this.enHTML;
  }

  //fyrir takka á css
  toggleCSS() {
    this.enCSS = !this.enCSS;
    localStorage.setItem('enCSS', this.enCSS);
    return this.enCSS;
  }

  //fyrir takka á css
  returnCSS() {
    return this.enCSS;
  }

  //fyrir takka á js
  toggleJS() {
    this.enJS = !this.enJS;
    localStorage.setItem('enJS', this.enJS);
    return this.enJS;
  }

  //fyrir takka á js
  returnJS() {
    return this.enJS;
  }

  //þegar ýtt er á takka, sendir í föll fyrir ofan, ákveður hvað er sýnt
  toggleList(button, list) {
    const buttonID = button.id;
    button.classList.remove('button_enabled');
    let enabled = false;
    if (buttonID === 'buttonID_html') {
      enabled = list.toggleHTML();
    } else if (buttonID === 'buttonID_css') {
      enabled = list.toggleCSS();
    } else if (buttonID === 'buttonID_js') {
      enabled = list.toggleJS();
    }
    if (enabled) {
      button.classList.add('button_enabled');
    }

    list.load();
  }
}
