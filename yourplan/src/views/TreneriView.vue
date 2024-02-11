<template>
  <div class="trainers">
    <h2 class="trainers-title">Naši treneri</h2>
    <div class="trainer" v-for="trainer in trainers" :key="trainer.id">
      <img :src="trainer.image" :alt="trainer.name" class="trainer-image" />
      <div class="trainer-info">
        <h3>{{ trainer.name }}</h3>
        <p>{{ trainer.experience }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      trainers: [
        {
          id: 1,
          name: 'Marko Marković',
          image: '@/assets/bell.png', 
          experience: '10 godina iskustva u fitnessu' 
        },
        {
          id: 2,
          name: 'Ana Anić',
          image: '@/assets/bell.png', 
          experience: 'Certificirani osobni trener'
        },
        
      ]
    };
  }
};
</script>

<style scoped>
.trainers {
  text-align: center;
}

.trainers-title {
  margin-bottom: 20px;
}

.trainer {
  margin: 20px;
  display: inline-block;
}

.trainer-image {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
}

.trainer-info {
  margin-top: 10px;
}
</style>
