<template>
  <div class="home">
    <h1>Home</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec fermentum nunc. Nullam nec
      fermentum nunc. Nullam nec fermentum nunc. Nullam nec fermentum nunc. Nullam nec fermentum
      nunc. Nullam nec
    </p>
  </div>
</template>

<style scoped>
/* Ensure that the root html and body elements fill the viewport */
html,
body {
  width: 100%;
  margin: 0;
  padding: 0;
}

/* Make sure all parent elements of .home fill the viewport width */
.parent-container {
  width: 100%;
}

.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  background-color: aqua;
  overflow: hidden;
}

h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

p {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  max-width: 80%;
  text-align: center;
}
</style>
