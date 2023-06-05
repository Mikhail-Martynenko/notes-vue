<template>
    <li>
       <slot></slot>
    </li>
</template>

<script>
export default {
    props: {
        todo: {
            type: Object,
            required: true,
        },
    },
};
</script>
