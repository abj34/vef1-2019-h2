import { el, readLocalStorageBoolean, } from './helpers';
import { PATH_PAGE_LECTURE, } from './config';

// Býr til umsetningu á öllu html, byggt á hvernig prufaIndex.html og prufaFyrirlestur.html er sett upp
export default class HTMLBuilder {
  cardImage(lecture) {
    const cardImage = el('div', 'card__image');
    let cardImg;
    if (lecture.thumbnail === undefined) {
      cardImg = el('div', 'card__img');
      cardImg.classList.add('img__missing');
    } else {
      cardImg = el('img', 'card__img');
      cardImg.src = lecture.thumbnail;
      cardImg.alt = lecture.title;
    }

    cardImage.appendChild(cardImg);
    return cardImage;
  }

  createCard(lecture) {
    const title = el('div', 'card__title_container', el('h2', 'card__title', lecture.title));
    if (readLocalStorageBoolean(lecture.slug)) {
      title.appendChild(el('div', 'card__title_finished', '✔'));
    }
    const cardsCol = el('div', 'cards__col', 
      el('class', 'card', this.cardImage(lecture),
        el('div', 'card__content',
          el('div', 'card__category', lecture.category.toUpperCase()),
        ),
      ),
    );
    cardsCol.firstChild.onclick = () => {
      window.location.href = `${PATH_PAGE_LECTURE}?slug=${lecture.slug}`;
    };

    return cardsCol;
  }

  initIndexButtons(page, list) {
    const buttonHTML = page.querySelector('#buttonID_html');
    buttonHTML.onclick = (_event) => {
      list.toggleList(_event.srcElement, list);
    };
    if (list.enHTML) {
      buttonHTML.classList.add('button_enabled');
    }

    const buttonCSS = page.querySelector('#buttonID_css');
    buttonCSS.onclick = (_event) => {
      list.toggleList(_event.srcElement, list);
    };
    if (list.enCSS) {
      buttonCSS.classList.add('button_enabled');
    }
    
    const buttonJS = page.querySelector('#buttonID_js');
    buttonJS.onclick = (_event) => {
      list.toggleList(_event.srcElement, list);
    };
    if (list.enJS) {
      buttonJS.classList.add('button_enabled');
    }
  }

  lectVideo(lecture) {
    const lectVid = el('div', 'lect__video');
    const vid = el('iframe', 'video_frame');
    vid.src = lecture.data;
    vid.frameborder = '0';
    vid.allowfullscreen = '0';
    lectVid.appendChild(vid);
    return lectVid;
  }

  lectText(lecture) {
    const lectText = el('div', lect__text);
    const text = lecture.data;
    const splitText = text.split('\n');
    for (let m = 0; m<splitText.length; m += 1) {
      const txt = el('p', 'txt', splitText[m]);
      lectText.appendChild(txt);
    }
    return lectText;
  }

  lectImage(lecture) {
    const lectContImg = el('div', 'lect__image');
    const img = el('img', 'img');
    img.src = lecture.data;
    img.alt = lecture.data;
    lectContImg.appendChild(img);
    if (lecture.caption !== undefined) {
      const cap = el('div', 'caption', el('p', 'txt', lecture.caption));
      lectContImg.appendChild(cap);
    }
    return lectContImg;
  }

  lectQuote(lecture) {
    const quote = el('div', 'lect__quote');
    const blockquote = el('blockquote', 'blockquote', lecture.data);
    quote.appendChild(blockquote);
    if (lecture.attribute !== undefined) {
      const cite = el('cite', 'cite', lecture.attribute);
      blockquote.classList.add('cite_following');
      quote.appendChild(cite);
    }
    return quote;
  }

  lectCode(lecture) {
    const div = el('pre', 'lect__code', lecture.data);
    return div;
  }

  lectList(lecture) {
    const list = lecture.data;
    const ul = el('ul', 'lect__list');
    for (let m = 0; m<list.length; m += 1) {
      const li = el('li', 'item', list[m]);
      ul.appendChild(li);
    }
    return ul;
  }

  lectHeading(lecture) {
    const div = el('h1', 'lect__heading', lecture.data);
    return div;
  }

  showLectureSelect(lecture) {
    switch (lecture.type) {
      case 'youtube':
        return this.lectVideo(lecture);
      case 'text':
        return this.lectText(lecture);
      case 'image':
        return this.lectImage(lecture);
      case 'quote':
        return this.lectQuote(lecture);
      case 'code':
        return this.lectCode(lecture);
      case 'list':
        return this.lectList(lecture);
      case 'heading':
        return this.lectHeading(lecture);
      default:
        break;
    }
    return el('div', 'ERROR', lecture.type);
  }

  showTitle(data) {
    const className = document.querySelector('.content__class');
    className.innerHTML = data.category.toUpperCase();
    const titleName = document.querySelector('.content__title');
    titleName.innerHTML = data.title;
  }

}