<template>
  <!-- <Header/> -->
  <div class="header">
    <div class="header-box">
      <h1 class="header-title">Atlas: The Ultimate Guide to the World</h1>
      <p class="header-subtitle">
        Atlas is a website that lists every country with their flags and facts.
        You can explore the world map, search by name or region, and filter by
        criteria. Learn about the world and its diversity with Atlas!
      </p>
    </div>
    <CountryFilter :region="filterCard" @select-region="applyRegion" />
  </div>
  <main>
    <Row tag="ul">
      <CountryCard
        v-for="country in visibleCountry"
        :country="country"
        :key="country.cca3"
      />
    </Row>
  </main>
</template>

<script setup>
// import Container from '@/components/base/Container.vue'
import { computed, ref } from "vue";
import { useCountries } from "@/composables/getData.js";
// import Header from '@/components/mains/Header.vue';
import CountryFilter from "@/components/mains/CountryFilter.vue";
import Row from "@/components/base/Row.vue";
import CountryCard from "@/components/mains/CountryCard.vue";
import { useStore } from "@/stores/countries.js";

const fields = [
  "name",
  "status",
  "population",
  "flags",
  "subregion",
  "region",
  "cca3",
  "cca2",
];
const { getData, countries, isLoading } = useCountries({ fields });
const filterCard = ref(undefined);
const visibleCountry = computed(() => {
  if (filterCard.value) {
    return countries.value.filter(
      (country) => country.region === filterCard.value
    );
  }
  return countries.value;
});

const applyRegion = (region) => {
  filterCard.value = region;
};

getData();
</script>

<style scoped>
main {
  margin-top: 50px;
}

.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-top: 50px;
}

.header-box {
  width: 800px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.header-title {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 30px;
}

.header-subtitle {
  font-family: Arial, Helvetica, sans-serif;
  color: rgba(0, 0, 0, 0.7);
  font-size: 16px;
}
</style>
