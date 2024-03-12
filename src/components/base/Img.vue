<template>
    <div class="img_box">
        <img :src="src" :alt="alt" :height="height">
    </div>
</template>


<script setup>
    import { defineProps } from 'vue';
    import {string,oneOfType,number} from 'vue-types';

    defineProps({
        src:string().isRequired,
        alt:string().isRequired,
        height: oneOfType([number(), string().validate(v => !isNaN(+v))]).isRequired
    })
</script>

<style scoped>
    .img_box{
        border-radius: 10px;
        position: relative;
        height: 150px;
        box-shadow: 0px 30px 60px 0px rgba(0, 0, 0, 0.10);
    }

    .img_box::before ,
    .img_box::after{
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        inset: 0;
        z-index: 2;
        border-radius: 10px;
    }

    .img_box::before {
        box-shadow: 0px 10px 40px -5px rgba(0, 0, 0, 0.2);
        mix-blend-mode: overlay;
    }
    .img_box:after {
        border: solid 1px var(--border-color);
    }

    .img_box img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: relative;
        border-radius: inherit;
    }
</style>