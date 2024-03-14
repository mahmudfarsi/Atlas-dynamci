<template>
    <component :is="tag" :class="['card',`card--${isSimple ? 'simple' : 'noSimple'}`]">
        <div v-if="$slots.header">
            <slot name="header"/>
        </div>
        <slot/>
        <div v-if="$slots.footer">
            <slot name="footer"/>
        </div>
    </component>
</template>


<script setup>
    import { defineProps } from 'vue';
    import { bool, string } from 'vue-types';
   

    defineProps({
        tag:string().def('div'),
        isSimple:bool().def(false)
    })
</script>


<style scoped>
.card {
    display: flex;
    color: rgba(0, 0, 0, 0.70);
    border: 1px solid var(--border-color);
    background: rgba(255, 255, 255, 0.60);
    box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.05), 0px 4px 4px 0px rgba(0, 0, 0, 0.05), 0px 10px 10px 0px rgba(0, 0, 0, 0.10);
}
    .card--simple {
        width: 193px;
        height: 55px;
        padding: 0px 10px;
        display: flex;
        gap: 10px;
        flex-flow: row nowrap;
        border-radius: 50px;
        
    }

    .card--noSimple {
        display: flex;
        padding: 10px 10px;
        flex-flow: column nowrap;
        gap: 10px;
        background: rgba(255, 255, 255, 0.6);
        max-width: 307px;
        border-radius: 5px;
    }

    @media screen and (max-width:766px) {
        .card--noSimple {
            max-width: 100%;
        }
    }
</style>