<template>
  <div id="search-bar">
    <input
      @input="debounceSearch"
      v-model="searchInput"
      placeholder="Search post title"
      class="search-field"
    />
    <span v-if="typing">You are typing</span>
    <div class="posts" v-if="posts">
      <div class="post" v-for="post in posts" :key="`postId-${post.id}`">
        {{ post.title }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";

export default Vue.extend({
  name: "SearchBar",
  data() {
    return {
      searchInput: "",
      typing: "",
      posts: [],
      debounce: 0,
    };
  },
  methods: {
    debounceSearch(event: any) {
      if (!event.target.value) {
        this.posts = [];
        return;
      }

      this.typing = "You are typing";
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.typing = "";
        axios
          .get("https://jsonplaceholder.typicode.com/posts")
          .then((response) => {
            this.posts = response.data.filter((post: Post) => {
              return post.title.includes(event.target.value);
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }, 1000);
    },
  },
});

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
</script>

<style lang="scss" scoped>
.search-field {
  width: 100%;
  border-radius: 3px;
  border: 0;
  padding: 10px;
  background: white;

  &:focus-visible {
    outline: none;
  }
}
.post {
  border-bottom: 1px solid;
}
</style>
