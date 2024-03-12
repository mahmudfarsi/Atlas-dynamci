<template>
    <component :is="tag" class="row">
        <slot/>
    </component>
</template>

<script setup>
    import { defineProps } from 'vue';
    import { string } from 'vue-types';


    defineProps({
        tag:string().def('div')
    })
</script>


<style scoped>
    .row{
        display: flex;
        flex-flow: row wrap;
        margin: 0 calc(var(--row-gap) /-29);
        gap: 18px;
        justify-content: space-between;
    }

    .row>* {
    flex-grow: 1;
    flex-shrink: 1;
    padding: 0 calc(var(--row-gap) / 2);
}
</style>