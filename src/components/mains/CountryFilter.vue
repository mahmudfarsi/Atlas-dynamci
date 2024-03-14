<template>
    <Card :is-simple="true" class="filterCard">
        <span class="filter">
            filter
        </span>
        <Button :is-icon-only="false" icon="right-flesh" @click="toggleDropdown" class="btn-select">
            {{title}}
        </Button>
        <Card v-show="dropDown" class="dropdown">
            <li v-for="region in filterOption" @click="select(region)"
             :class="['select',`${region.value === props.region ? 'selected': ''}`]">
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
        font-family: Arial, Helvetica, sans-serif;
        padding: 10px 15px;
        color: #000;
    }


    .select:hover{
        border-color: #2670E9;
    }

    .select.selected {
        background: linear-gradient(90deg, rgba(38, 112, 233, 0.30) 0%, rgba(38, 112, 233, 0) 100%);
        border-left:2px solid #2670E9;
    }
    .filter {
        font-family: Arial, Helvetica, sans-serif;
        text-transform: capitalize;
        color: #000;
    }

    .filterCard{
        flex-wrap: nowrap;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        position: relative;
        padding: 0px 5px 0px 10px;
    }

    .dropdown{
        width: inherit;
        position: absolute;
        top: 55px;
        right: -1px;
        z-index: 1000;
        border-radius: 10px;
    }

    .btn-select {
        justify-content: space-between;
        width: 130px;
        gap: 20px;
        border-radius: 50px;
        color: #000;
    }
</style>