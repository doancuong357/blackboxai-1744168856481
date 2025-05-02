<template>
    <div v-if="isVisible" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
            <header class="modal-header">
                <h3>{{ title }}</h3>
                <button class="close-button" @click="closeModal">×</button>
            </header>
            <section class="modal-body">
                <slot></slot>
            </section>
            <footer class="modal-footer">
                <slot name="footer"></slot>
            </footer>
        </div>
    </div>
</template>

<script>
export default {
    name: "Modal",
    props: {
        isVisible: {
            type: Boolean,
            required: true,
        },
        title: {
            type: String,
            default: "Modal Title",
        },
    },
    methods: {
        closeModal() {
            this.$emit("close");
        },
    },
};
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background: white;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #ddd;
}

.modal-body {
    padding: 1rem;
}

.modal-footer {
    padding: 1rem;
    border-top: 1px solid #ddd;
    text-align: right;
}

.close-button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
}
</style>