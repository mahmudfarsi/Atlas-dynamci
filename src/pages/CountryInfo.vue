<template>
  <div class="box-wrapper">
    <h1 class="title">
      Atlas: Everything you need to know about {{ countryInfo.name?.common }}
    </h1>
    <Button
      :is-icon-only="false"
      tag="router-link"
      icon="left-flash"
      :to="{ name: 'home' }"
      >Go back</Button
    >
    <main class="main-info">
      <div class="box-description">
        <p
          v-for="(item, index) in description"
          :key="index"
          class="descriptions"
        >
          {{ item }}
        </p>
        <!-- <iframe src="https://goo.gl/maps/77hPBRdLid8yD5Bm7" frameborder="0" width="400" height="500"></iframe> -->
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15281592.430302976!2d72.0974096819673!3d20.756567982829967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2s!4v1710588221411!5m2!1sen!2s" width="800" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
      <Cardinfo :country="countryInfo" />
    </main>
    <div class="box-borders">
      <h2 class="borders-title">
        Neighbors of {{ countryInfo.name?.common }}
      </h2>
      <Row tag="ul" class="row">
          <CountryCard v-for="i in borderCountry" :country="i" class="border-card"/>
        </Row>
    </div>
  </div>
</template>

<script setup>
import Header from "@/components/mains/Header.vue";
import { defineProps, computed, ref } from "vue";
import Cardinfo from "@/components/mains/CardInfo.vue";
import { useRoute, useRouter } from "vue-router";
import Button from "@/components/base/Button.vue";
import { map } from "lodash";
import Row from "@/components/base/Row.vue";
import CountryCard from "@/components/mains/CountryCard.vue";

const route = useRoute();
const countryInfo = ref({});
const getCountry = async () => {
  const response = await fetch(
    `https://restcountries.com/v3.1/alpha/${route.params.id}`
  );
  const resault = await response.json();
  countryInfo.value = resault[0];
  getBorderCountry();
};
console.log(countryInfo);

const borderCountry = ref([]);
const getBorderCountry = async () => {
  const response = await fetch(`https://restcountries.com/v3.1/alpha?codes=${countryInfo.value.borders.join(",")}`);
  borderCountry.value = await response.json();
};

const borders = computed(() => {
  const neighborder = borderCountry.value.name?.common;

  return neighborder;
});

const description = computed(() => {
  const name = countryInfo.value.name?.common;
  const official = countryInfo.value.name?.official;
  const subregion = countryInfo.value.subregion;
  const capital = countryInfo.value.capital;
  //   const population = countryInfo.value.population.toFixed(2);
  //   const language = Object.values(countryInfo.value.languages).map(
  //     (item) => item
  //   );


  const maps = computed(() => {
    return countryInfo.value?.maps?.googleMaps;
  })

  console.log(maps.value);


  return [
    `${name}, officially known as the ${official}, is a vibrant and diverse country situated in ${subregion}. With its capital at ${capital}, ${name} boasts a rich cultural heritage and a population of approximately population billion people. The official languages include languages, reflecting the linguistic diversity of the nation.`,
    `The flag of India is composed of three equal horizontal bands of saffron, white and green. A navy blue wheel with twenty-four spokes — the Ashoka Chakra — is centered in the white band.`,
    `The Indian rupee (INR) serves as the official currency, with its symbol represented by ₹. Geographically, India spans an expansive area of 3,287,590 square kilometers and shares borders with Bangladesh (BGD), Bhutan (BTN), Myanmar (MMR), China (CHN), Nepal (NPL), and Pakistan (PAK). Despite its vast size, India is not landlocked, enjoying access to the sea.`,
    `India holds the status of a United Nations member and operates as a republic, emphasizing its commitment to democratic governance. The country's national demonym is "Indian," both for males and females. The FIFA code representing India in international sports competitions is "IND," and the country follows left-hand driving with vehicle registration signs marked as "IND."`,
    `The time zone in India is UTC+05:30, and the official start of the week is on Monday. The geographical coordinates of the capital, New Delhi, are approximately 28.6° latitude and 77.2° longitude. The country's continent is Asia, aligning with its regional placement in Southern Asia.`,
    `India's postal codes adhere to a specific format, requiring six digits and matching the regular expression "^(\d{6})$." The country's international dialing code is +91, signifying its global connectivity. With a Gini coefficient of 35.7 in 2011, India addresses socio-economic inequality as it continues to evolve as a major player on the world stage.`,
  ];
});











const router = useRouter();
// const goBack = () => {
//   router.back(-1)
// }


const calcPopulation = (number) => {
  const numberLength = number.toString().length;

  let title = "";
  let count = number;

  if (numberLength > 3 && numberLength <= 5) {
    title = "thousand";
    count = number / 1000;
  } else if (numberLength > 5 && numberLength <= 9) {
    title = "million";
    count = number / 1000000;
  } else if (numberLength > 9) {
    title = "billion";
    count = number / 1000000000;
  }

  let roundPow = 1;
  const [countMain, countRemain] = count.toString().split(".");
  if (
    countMain === "0" ||
    (countMain.length === 1 && countRemain?.length > 1)
  ) {
    roundPow = 10;
  }
  count = Math.floor(count * roundPow) / roundPow;

  return `${count} ${title}`;
};
getBorderCountry()
getCountry();
</script>

<style scoped>
.main-info {
  width: 100%;
  height: auto;
  display: flex;
  margin-top: 20px;
}

.title {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 30px;
  margin-bottom: 30px;
}

.box-wrapper {
  padding-top: 20px;
  padding-bottom: 40px;
}

.box-description {
  width: 983px;
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.descriptions {
  width: 886px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.7);
}

.row{
  width: 100%;
  flex-wrap: nowrap;
  overflow-x: scroll;
}

.box-borders{
  margin-top: 90px;
}

.border-card{
  min-width: 290px;
}

.borders-title{
  font-family: Arial, Helvetica, sans-serif;
  font-size: 26px;
  line-height: 28px;
  margin-bottom: 30px;
}
</style>
