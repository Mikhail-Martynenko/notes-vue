<template>
    <div class="modal">
        <div class="modal-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
</script>

<style>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-content {
    display: flex;
    flex-direction: column;
    border: 1px salmon solid;
    gap: 10px;
    background-color: hsla(160, 100%, 47%, 0.1);
    padding: 20px;
    color: hsla(160, 100%, 37%, 1);
}
</style>
