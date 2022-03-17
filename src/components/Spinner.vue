<template>
  <div class="spin">
  </div>
</template>

<script>
export default {
  name: 'Spinner',
}
</script>

<style scope>
.spin {
  display: block;
  width: 40px;
  height: 40px;
  margin: 30px auto;
  border: 3px solid transparent;
  border-radius: 50%;
  border-top-color: #43b883;
  animation: spin 1s infinite linear;
}

@keyframes spin {
  from {
    transform: rotateZ(-359deg);
  }
  to {
    transform: rotate(0deg);
  }
}
</style>
