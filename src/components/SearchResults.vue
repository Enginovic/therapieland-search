<template>
  <ul class="posts" v-if="posts.length">
    <h5>Results</h5>
    <li class="post" v-for="post in posts" :key="`postId-${post.id}`">
      <div class="post-left">#{{ post.id }}</div>
      <div class="post-right">
        <h4>{{ post.title }}</h4>
        <p>{{ post.body }}</p>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["posts"],
});
</script>

<style lang="scss">
.post {
  display: flex;
  padding: 10px 0 20px;
  margin: 10px 0;
  border-bottom: 1px solid #e1e1e1;
  list-style-type: none;
  &:last-child {
    border-bottom: 0;
  }
}

.post-left {
  min-width: 50px;
}
</style>
