<template>
  <Card  v-if="country" class="card">
    <template #header>
      <Img :src="country.flags.png" :alt="country.cca2" height="150" />
    </template>
    <div class="body">
      <h2 class="card-title">
        {{ country.name.official }}
      </h2>
      <div class="lists">
        <UL
          v-for="item in countryInfoLabel"
          :key="item.value"
          class="lits-items"
        >
          <span class="label">
            {{ item.label }}
          </span>
          <div class="list-value">
            <span v-for="value in item.value" class="value">
              {{ value }}
              <span v-html="item.appendValue"></span>
            </span>
          </div>
        </UL>
      </div>
    </div>
  </Card>
</template>

<script setup>
import { defineProps, computed } from "vue";
import Card from "@/components/base/Card.vue";
import Img from "@/components/base/Img.vue";
import UL from "@/components/base/Row.vue";
import { number, shape, string, bool, object, array } from "vue-types";
import { nanoid } from "nanoid";
import { uniq } from "lodash";

const props = defineProps({
  country: shape({
    name: shape({
      common: string().isRequired,
      official: string().isRequired,
      nativeName: object().isRequired,
    }),
    flags: shape({
      png: string().isRequired,
      svg: string().isRequired,
      alt: string().isRequired,
    }),
    cca2: string().isRequired,
    cca3: string().isRequired,
    independent: bool().isRequired,
    status: string().isRequired,
    region: string().isRequired,
    capital: string().isRequired,
    population: number().isRequired,
    languages: string().isRequired,
    subregion: string().isRequired,
    landlocked: bool().isRequired,
    maps: object().isRequired,
    demonyms: shape({
      eng: object().isRequired,
    }),
    area: string().isRequired,
    currencies:shape({
      name:string().isRequired,
      symbol:string().isRequired
    }),
    timezones:string().isRequired,
    car:shape({
      side:string().isRequired,
      signs:array().isRequired
    }),
    startOfWeek:string().isRequired,
    idd:shape({
      root:string().isRequired,
      suffixes:array().isRequired
    })
    // tld:string().isRequired
  }),
});


// const calcPopulation = (number) => {
//     const numberLength = number.toString().length

//     let title = ''
//     let count = number

//     if (numberLength > 3 && numberLength <= 5) {
//         title = 'thousand'
//         count = number / 1000
//     }
//     else if (numberLength > 5 && numberLength <= 9) {
//         title = 'million'
//         count = number / 1000000
//     } else if (numberLength > 9) {
//         title = 'billion'
//         count = number / 1000000000
//     }

//     let roundPow = 1
//     const [countMain, countRemain] = count.toString().split('.')
//     if (countMain === '0' || (countMain.length === 1 && countRemain?.length > 1)) {
//         roundPow = 10
//     }
//     count = Math.floor(count * roundPow) / roundPow

//     return `${count} ${title}`

// }


const countryInfoLabel = computed(() => {
  const capital = props.country?.capital;
  const languages = props.country?.languages;
  const demonyms = uniq(
    Object.values(props.country.demonyms).map((item) => item.m)
  );
  const area = props.country?.area;
  const formatArea = [area.toLocaleString()];
  const population = props.country?.population;
  const formatPopulation = [population.toLocaleString()];
  const currency = props.country?.currencies;
  const nameCurrncy = Object.entries(currency).map(name => name[1].name).join('')
  const symbol = Object.entries(currency).map(symbol => symbol[1].symbol).join('');
  const joinCurrency = [nameCurrncy,symbol].join(' ');
  const formatCurrency = [joinCurrency];
  const timeZones = props.country?.timezones;
  const driverSide = [props.country.car?.side];
  const startWeek = [props.country?.startOfWeek];
  console.log(props.country?.idd?.root);
  const root = [props.country?.idd?.root]


  return [
    {
      label: "Capital",
      value: capital,
      id:nanoid(3)
    },
    {
      label: "Official Languages",
      value: languages,
      id:nanoid(3)
    },
    {
      label: "Demonym",
      value: demonyms,
      id:nanoid(3)
    },
    {
      label: "Total Area",
      value: formatArea,
      appendValue:`km<sup class="sup">2</sup>`,
      id:nanoid(3)
    },
    {
      label:'Popolation',
      value:formatPopulation,
      id:nanoid(3)
    },
    {
      label:'Density',
      value:''
    },
    {
      label:'Gini (2011)',
      value:''
    },
    {
      label:'Currency',
      value:formatCurrency
    },
    {
      label:'Time zone',
      value:timeZones
    },
    {
      label:'Driving side',
      value:driverSide
    },
    {
      label:'Start of week',
      value:startWeek
    },
    {
      label:'Calling root',
      value:root
    }
  ];

  return []
});
</script>

<style scoped>
.card {
  width: 307px;
  padding: 15px;
  height: 784px;
}
.card-title {
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  line-height: 24px;
  margin-top: 20px;
}

.lists {
  margin-top: 30px;
}

.lits-items {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 9.3px 0px;
  white-space: nowrap;
}

.lits-items:last-child{
  border: none;
}

.label {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.5);
  line-height: 20px;
}

.list-value {
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  align-items: end;
}

.value {
  font-family: Arial, Helvetica, sans-serif;
  color: #000;
  font-size: 14px;
  line-height: 20px;
  white-space: nowrap;
}




</style>

<style>
 sup {
    font-size: xx-small;
    vertical-align: super;
}
</style>
