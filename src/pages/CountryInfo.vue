<template>
  <div>
    <h1>
      Atlas: Everything you need to know about {{ countryInfo.name?.common }}
    </h1>
    <Button :is-icon-only="false" tag="router-link" icon="left-flash" :to="{name:'home'}">Go back</Button>
    <main class="main-info">
      
      <div>
        <p v-for="(item, index) in description" :key="index">
        {{ item }}
      </p>
      <p>
        {{ borders }}
      </p>
      </div>
      <Cardinfo :country="countryInfo" />
    </main>
  </div>
</template>

<script setup>
import Header from "@/components/mains/Header.vue";
import { defineProps, computed, ref } from "vue";
import Cardinfo from "@/components/mains/CardInfo.vue";
import { useRoute ,useRouter} from "vue-router";
import Button from '@/components/base/Button.vue'


const route = useRoute();
const countryInfo = ref({});
const getCountry = async () => {
  const response = await fetch(
    `https://restcountries.com/v3.1/alpha/${route.params.id}`
  );
  const resault = await response.json();
  countryInfo.value = resault[0];
  getBorderCountry()
};

const borderCountry = ref([]);
const getBorderCountry = async () => {
  const response = await fetch(`https://restcountries.com/v3.1/alpha?codes=${countryInfo.value.borders.join(',')}`);
  borderCountry.value  = await response.json();
};
const borders = computed(() => {
    const neighborder = borderCountry.value.name?.common;

    return neighborder
})

const description = computed(() => {
  const name = countryInfo.value.name?.common;
  const official = countryInfo.value.name?.official;
  const subregion = countryInfo.value.subregion;
  const capital = countryInfo.value.capital;
//   const population = countryInfo.value.population.toFixed(2);
//   const language = Object.values(countryInfo.value.languages).map(
//     (item) => item
//   );

  return [
    `${name}, officially known as the ${official}, is a vibrant and diverse country situated in ${subregion}. With its capital at ${capital}, ${name} boasts a rich cultural heritage and a population of approximately population billion people. The official languages include languages, reflecting the linguistic diversity of the nation.`,
    `The flag of India is composed of three equal horizontal bands of saffron, white and green. A navy blue wheel with twenty-four spokes — the Ashoka Chakra — is centered in the white band.`,
  ];
});
const router = useRouter();
const goBack = () => {
  router.back(-1)
}
getCountry();
</script>



<style  scoped>
  .main-info {
    width: 100%;
    height: auto;
    display: flex;
  }
</style>
