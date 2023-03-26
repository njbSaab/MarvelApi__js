import {
  API_URL,
  URL_COMICS,
  IMG_STANDARD_XLARGE,
  IMG_NOT_AVAILABLE,
  URL_CHARACTERS,
} from "../../constants/api";
import { getDataApi } from "../../utils/getDataApi";
import { ROOT_INDEX } from "../../constants/root";
import Charters from "../Charters";
import classes from "./Comics.css"


class Comics {
  async render() {
    const data = await getDataApi.getData(API_URL + URL_COMICS);

    let htmlContent = "";

    data.forEach(({ id, title, thumbnail: { extension, path } }) => {
      if (path.lastIndexOf(IMG_NOT_AVAILABLE) === -1) {
        const uri = API_URL + URL_COMICS + "/" + id + "/" + URL_CHARACTERS;
        const imgSrc = path + "/" + IMG_STANDARD_XLARGE + "." + extension;

        htmlContent += `
         <li class="comics__item" data-uri="${uri}">
             <h4 class="comics__title">${title}</h4>  
             <img class="comics__img" src="${imgSrc}" alt=""> 
         </li>         
         `;
      }
    });
    const htmlWrapper = `
         <div class="modal__wrapper">
            <ul class='comics__container'>
            ${htmlContent}
            </ul>
         </div> 
   `;

    ROOT_INDEX.innerHTML = htmlWrapper;
  }

  eventListener() {
    document.querySelectorAll(".comics__item").forEach((elem) => {
      const uri = elem.getAttribute('data-uri')

      elem.addEventListener("click", () => {
         Charters.render(uri)
      });
    });
  }
}

export default new Comics();
