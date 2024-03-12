<template>
    <Card class="filterCard">
        <span class="filter">
            filter
        </span>
        <Button :is-icon-only="false" icon="right-flesh" @click="toggleDropdown">
            {{title}}
        </Button>
        <Card v-show="dropDown">
            <li v-for="region in filterOption" @click="select(region)" class="select">
                {{ region.label }}
            </li>
        </Card>
    </Card>
</template>


<script setup>
    import { defineProps, ref,defineEmits, computed } from 'vue';
    import {string} from 'vue-types';
    import Card from '@/components/base/Card.vue'
    import Button from '@/components/base/Button.vue'

    const props = defineProps({
        region:string()
    })


    const dropDown = ref(false)
    const toggleDropdown = () => {
        dropDown.value = !dropDown.value
    }
    const REGIONS = ['Europe','Asia','Americas','Oceania','Africa','Antartica'];
    const filterOption = [
        {
            label:'All Regions',
            value:undefined
        },

        ...REGIONS.map(region => ({
            label:region,
            value:region
        }))
    ];

    const emits = defineEmits(['select-region']);

    const select = (option) => {
        toggleDropdown();
        emits('select-region',option.value);
    }
    const title = computed(() => {
        if(!props.region){
            return 'region'
        }
        return filterOption.find(option => option.value === props.region)?.label;
    })
    
</script>


<style scoped>
    .select{
        cursor: pointer;
        list-style-type: none;
    }
    .filter {
        font-family: Arial, Helvetica, sans-serif;
    }

    .filterCard{
        flex-wrap: nowrap;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
</style>