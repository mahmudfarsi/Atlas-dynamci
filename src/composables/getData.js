import {ref} from 'vue'

export const useCountries = ({fields}) => {
    const isLoading = ref(false);
    const countries = ref([]);
    const getData = async () =>{
        isLoading.value = true
        const query = fields ? `fields=${fields.join(',')}` : '';
        const response = await fetch(`https://restcountries.com/v3.1/all?${query}`);
        const res = await response.json();
        countries.value = res
        isLoading.value = false
    }



    return {
        countries,
        getData,
        isLoading
    }
}