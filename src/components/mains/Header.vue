<template>
    <header class="header">
        <Nav class="nav">
            <Row tag="ul" class="ul">
                <li>
                    <Btn tag="RouterLink" :to="'/'" :is-icon-only="false" v-for="item in dataLink" class="links">
                        {{ item }}
                    </Btn>
                </li>
            </Row>
        </Nav>
    </header>
</template>

<script setup>
    import Nav from '@/components/base/Nav.vue'
    import Row from '@/components/base/Row.vue'
    import Btn from '@/components/base/Button.vue'

    const dataLink = ['home','content','countries','about']

</script>

<style scoped>
    .header {
        padding: 20px 0px;
        display: flex;
        justify-content: center;
    }

    .nav {
        display: flex;
        justify-content: center;
    }

    .ul {
        display: flex;
        justify-content: center;
        width: 50%;
        gap: 20px;
    
    }

    li{
        display: flex;
        gap: 30px;
        
    }

    .links{
        padding: 10px 10px;
        text-transform: capitalize;
    }
</style>