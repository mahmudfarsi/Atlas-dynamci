<template>
    <div class="container">
        <slot/>
    </div>
</template>


<style scoped>
    .container{
        --max-width:100%;
        width: var(--max-width);
        min-height: 100vh;
    }
    @media screen and (max-width:480px) {
        .container{
            padding: 80px 20px;
    
        }
    }

    @media screen and (min-width:480px) and (max-width:767px) {
        .container{
            --max-width:480px;
          
        }
    }

    @media screen and (min-width:767px) and (max-width:1024px) {
        .container{
            --max-width:767px;
         
        }
    }

    @media screen and (min-width:1024px) and (max-width:1280px) {
        .container{
            --max-width:1024px;
          
        }
    }

    @media screen and (min-width:1280px){
        .container{
            --max-width:1280px;
           
        }
    }
</style>