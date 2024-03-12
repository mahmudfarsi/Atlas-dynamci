<template>
    <Card>
        <template #header>
            <Img :src="country.flags.png" :alt="country.cca2" height="150"/>
        </template>
        <div class="body">
            <UL v-for="item in countryInfoLabel" :key="item.value">
                <span>
                    {{ item.label }}
                </span>
                <span v-for="value in item.value">
                    {{ value }}
                </span>
            </UL>
        </div>
    </Card>
</template>


<script setup>
    import { defineProps,computed } from 'vue';
    import Card from '@/components/base/Card.vue';
    import Img from '@/components/base/Img.vue';
    import UL from '@/components/base/Row.vue';
    import { number, shape, string ,bool, object} from 'vue-types';
    import {uniq} from 'lodash'


    const props = defineProps({
        country :shape({
             name:shape({
                common:string().isRequired,
                official:string().isRequired,
                nativeName:object().isRequired
            }),
            flags:shape({
                png:string().isRequired,
                svg:string().isRequired,
                alt:string().isRequired
            }),
            cca2:string().isRequired,
            cca3:string().isRequired,
            independent:bool().isRequired,
            status:string().isRequired,
            region:string().isRequired,
            capital:string().isRequired,
            population:number().isRequired,
            languages:string().isRequired,
            subregion:string().isRequired,
            landlocked:bool().isRequired,
            maps:object().isRequired,
            demonyms: shape({
            eng: object().isRequired,
            }),
            // tld:string().isRequired
        })
    })

    const countryInfoLabel = computed(() => {
        const capital = props.country.capital;
        const languages = props.country.languages;
        const demonyms = uniq(Object.values(props.country.demonyms).map(item => item.m));

        return [
            {
                label:'Capital',
                value:capital
            },
            {
                label:'Official Languages',
                value:languages
            },
            {
                label:'Demonym',
                value:demonyms
            }
        ]
    })
</script>