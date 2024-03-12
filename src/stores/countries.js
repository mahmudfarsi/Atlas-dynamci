
import { defineStore } from "pinia";


export const useStore = defineStore('countries',{
    state: () => ({
        count:0,
        favList:JSON.parse(localStorage.getItem("jj")) || [],
    }),
    actions: {
        persistToLocalStorage(){
            localStorage.setItem('jj',JSON.stringify(this.favList)) || []
        },

        add(){
            this.count = this.count + 1
        },

        toggleStore(country){
            const indexList = this.favList.indexOf(country.cca3)
            if(indexList > -1){
               /* remove */  
                            this.favList.splice(indexList,1)
                            this.persistToLocalStorage()
            } else{
              /* add */ 
                            this.favList.push(country.cca3)
                            this.persistToLocalStorage()
            }
        },

        isInFav(country){
            return this.favList.indexOf(country.cca3) > -1 
        },
    },
    getters:{
        double:(state) => state.count * 1,
    },
    persist: true
})