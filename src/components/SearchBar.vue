<template>
  <div id="search-bar">
    <input
      @input="searchPost"
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
          v-for="(item, index) in searchHistory"
          :key="`item-${index}`"
        >
          {{ item.input }}
          {{ item.date }}
          <div class="remove-history" @click="removeHistory(item)">Remove</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import _ from "lodash"; // type is added though..
import { HistoryItem } from "@/store";

export default Vue.extend({
  name: "SearchBar",
  data() {
    return {
      typing: "",
      posts: [],
      debounce: 0,
    };
  },
  methods: {
    /**
     * Search for the post
     */
    searchPost(event: any) {
      const searchInput = event.target.value;
      if (!searchInput) {
        this.posts = [];
        return;
      }

      const date = this.formatDate;
      this.typing = "Searching post";
      clearTimeout(this.debounce);

      // debounce for 1 second to reduce the amount of api calls.
      this.debounce = setTimeout(() => {
        this.typing = "";
        this.$store.commit("addSearchHistory", {
          input: searchInput,
          date,
        });

        // search for the post title that match the input value
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
    /**
     * Remove history item in store
     */
    removeHistory(item: HistoryItem) {
      this.$store.commit("removeSearchHistory", item.input);
    },
  },
  computed: {
    /**
     * Get the history in store
     */
    searchHistory() {
      return this.$store.state.searchHistory;
    },
    /**
     * Format the date when a new search is done
     */
    formatDate() {
      return new Date(_.now()).toTimeString().substr(0, 8);
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
