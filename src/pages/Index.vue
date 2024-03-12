<template>
        <Header/>
        <CountryFilter :region="filterCard" @select-region="applyRegion"/>
        <main>
            <Row tag="ul">
                <CountryCard v-for="country in visibleCountry" 
                  :country="country" 
                  :key="country.cca3"
                />
            </Row>
            <button @click="add">click</button>
            {{ count }}
        </main>
</template>
  
  
  
  <script setup>
    // import Container from '@/components/base/Container.vue'
    import {computed,ref} from 'vue';
    import {useCountries} from '@/composables/getData.js';
    import Header from '@/components/mains/Header.vue';
    import CountryFilter from '@/components/mains/CountryFilter.vue';
    import Row from '@/components/base/Row.vue';
    import CountryCard from '@/components/mains/CountryCard.vue';
    import { useStore } from '@/stores/countries.js';




    const fields = ['name','status','population','flags','subregion','region','cca3','cca2'];
    const {getData,countries,isLoading} = useCountries({fields});
    const filterCard = ref(undefined);
    const visibleCountry = computed(() => {
        if(filterCard.value){
            return countries.value.filter(country => country.region === filterCard.value)
        }
        return countries.value
    })

    const applyRegion = (region) => {
        filterCard.value = region
    }


    getData()
  </script>
  
  
  <style scoped>
  main{
    margin-top:50px;
  }
  </style>