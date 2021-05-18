<template>
  <div id="search-bar">
    <input
      @input="debounceSearch"
      placeholder="Search post title"
      class="search-field"
    />
    <span v-if="typing">You are typing</span>
    <div class="container">
      <div class="posts" v-if="posts">
        <div class="post" v-for="post in posts" :key="`postId-${post.id}`">
          {{ post.title }}
        </div>
      </div>
      <div class="search-history">
        <div
          class="search-input"
          v-for="item in searchHistory"
          :key="`item-${item}`"
        >
          {{ item }}
          <div class="remove-history" @click="removeHistory(item)">Remove</div>
        </div>
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
      const searchInput = event.target.value;
      if (!searchInput) {
        this.posts = [];
        return;
      }

      this.typing = "You are typing";
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.typing = "";
        this.$store.commit("addSearchHistory", searchInput);
        axios
          .get("https://jsonplaceholder.typicode.com/posts")
          .then((response) => {
            this.posts = response.data.filter((post: Post) => {
              return post.title.includes(searchInput);
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }, 1000);
    },
    removeHistory(item: string) {
      this.$store.commit("removeSearchHistory", item);
    },
  },
  computed: {
    searchHistory() {
      return this.$store.state.searchHistory;
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

.container {
  display: flex;
}
</style>
