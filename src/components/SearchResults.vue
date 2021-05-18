<template>
  <div class="posts" v-if="posts.length">
    <div class="post" v-for="post in posts" :key="`postId-${post.id}`">
      <div class="left">
        {{ post.id }}
      </div>
      <div class="right">
        <h4>{{ post.title }}</h4>
        <p>{{ post.body }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["posts"],
});
</script>

<style lang="scss">
.posts {
  flex: 1;
  background-color: white;
  margin: 50px 50px 50px 0;
}

.post {
  display: flex;
  padding: 10px;
  border-radius: 3px;
  margin: 10px 0;
}
</style>
