<template>
    <Card tag="li" :is-simple="false">
        <template #header>
            <Img :src="country.flags.png" :alt="country.name.common" height="150"/>
        </template>
        <div class="body">
            <div class="box_title">
                <h1 class="title">
                    {{ country.name.common }}
                </h1>
                <label>
                    <Button :is-icon-only="true" :icon="isFav ? 'filled-heart' : 'empty-heart' " @click="toggleStore(props.country)"/>
                    <input type="checkbox"  :value="country.cca3">
                </label>
            </div>
            <div class="description">
                {{ description }}
            </div>
        </div>
        <template #footer>
            <Button tag="RouterLink" :to="{name:'country-id',params:{id:country.cca3}}" :is-icon-only="false" icon="right-flesh" class="btn">
                learn more
            </Button>
        </template>
    </Card>
</template>


<script setup>
    import { defineProps, ref,computed } from 'vue';
    import { array, bool, number, object, shape, string } from 'vue-types';
    import Card from '@/components/base/Card.vue';
    import Img from '@/components/base/Img.vue';
    import Button from '@/components/base/Button.vue';
    import { useStore } from '@/stores/countries.js';

    const props = defineProps({
        country:shape({
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
            status:string().isRequired,
            region:string().isRequired,
            subregion:string().isRequired,
            population:number().isRequired
        }),
    })

    const {toggleStore,isInFav} = useStore();
    
    const favList = computed(() => useStore().favList)
    const isFav = computed(() => isInFav(props.country))
    // const persist = computed(() => persistToLocalStorage())

    
 
    

    


    const calcPopulation = (number) => {
    const numberLength = number.toString().length

    let title = ''
    let count = number

    if (numberLength > 3 && numberLength <= 5) {
        title = 'thousand'
        count = number / 1000
    }
    else if (numberLength > 5 && numberLength <= 9) {
        title = 'million'
        count = number / 1000000
    } else if (numberLength > 9) {
        title = 'billion'
        count = number / 1000000000
    }

    let roundPow = 1
    const [countMain, countRemain] = count.toString().split('.')
    if (countMain === '0' || (countMain.length === 1 && countRemain?.length > 1)) {
        roundPow = 10
    }
    count = Math.floor(count * roundPow) / roundPow

    return `${count} ${title}`

}

const description = computed(() => {
    if (props.country) {
        const name = props.country.name?.official
        const type = props.country.independent ? 'an independent country' : 'a dependent territory'
        const subregion = props.country.subregion
        const population = calcPopulation(props.country.population || 0)

        return `${name} is ${type} in ${subregion} with an estimated population of over ${population} people.`
    }
    return 'No Data!'
})
</script>


<style scoped>
.title{
    font-family: Arial, Helvetica, sans-serif;
}
    .description {
    overflow: hidden;
    font-family: Arial, Helvetica, sans-serif;
    color: rgba(0, 0, 0, 0.70);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    margin-bottom: 10px;
    height: 100px;
    margin-top: 20px;
}

.box_title{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
}

input{
    display: none;
}


</style>