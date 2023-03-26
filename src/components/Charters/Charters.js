import { IMG_STANDARD_XLARGE } from "../../constants/api"
import { ROOT_MODAL } from "../../constants/root";
import { getDataApi } from "../../utils/getDataApi"


class Charters{
  renderContent(data){
   let htmlContent = ''
   data.forEach(({ name, thumbnail: {path,extension} }) => {
      const imgSrc = path + "/" + IMG_STANDARD_XLARGE + "." + extension;
      htmlContent += `
         <li class="charter__items">
         <img class="charter__img" src="${imgSrc}"/>
         <span class=""charter__name> ${name} <span/>
         </li>
      `
   })
         const htmlWrapper = `
         <ul class="charter__item">
         ${htmlContent}
         </ul>
         `

         ROOT_MODAL.innerHTML = htmlWrapper
  }
  renderNotification(){

  }

  async render(uri){
     const data = await getDataApi.getData(uri)

     data.length ? this.renderContent(data) : this.renderNotification()
   }

}

export default new Charters()