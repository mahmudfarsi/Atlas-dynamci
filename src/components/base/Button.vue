<template>
    <component :is="tag" :class="['btn',`btn--${isIconOnly ? 'simple' : 'noSimple'}`]">
        <slot v-if="!isIconOnly"/>
        <Icon v-if="icon" :name="icon"/>
    </component>
</template>


<script setup>
    import { defineProps } from 'vue';
    import {string,oneOf,bool} from 'vue-types'
    import Icon from './Icon.vue'
    defineProps({
        isIconOnly:bool().def(false),
        icon:string(),
        tag:oneOf(['button','a','RouterLink','span']).def('button')
    })
</script>


<style scoped>
    .btn {
        display: inline-block;
        text-decoration: none;
        user-select: none;
        font-family: Inter;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        color: var(--black);
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
        border: 1px solid rgba(255, 255, 255, 0);
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 100%),
            linear-gradient(180deg,
                rgba(255, 255, 255, 0.05) 0%,
                rgba(255, 255, 255, 0.25) 57.29%,
                rgba(255, 255, 255, 0.5) 100%);

        background-blend-mode: overlay, normal;
        box-shadow:
            0px 1px 0px 0px rgba(0, 0, 0, 0.05),
            0px 4px 4px 0px rgba(0, 0, 0, 0.05),
            0px 10px 10px 0px rgba(0, 0, 0, 0.1);
        
    }

    .btn--simple {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        border: none;
        box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);
    }

    .btn--noSimple{
        display: inline-flex;
        padding: 8px 16px;
        gap: 8px;
        border-radius: 8px;
        text-transform: capitalize;
        font-family: Arial, Helvetica, sans-serif;
    }
</style>