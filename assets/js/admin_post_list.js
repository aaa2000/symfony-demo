import Vue from 'vue';
import axios from 'axios'


Vue.prototype.$http = axios;

new Vue({
  delimiters: ['${', '}'],
  el: '#bulk',
  data: {
    datatable: null,
    posts: [],
    search: ''
  },
  computed: {
    filteredPosts: function () {
      let self = this
      let search = self.search.toLowerCase()
      return self.posts.filter(function (post) {
        return 	post.title.toLowerCase().indexOf(search) !== -1 ||
          post.author.full_name.toLowerCase().indexOf(search) !== -1
      })
    }
  },
  mounted() {
    let vm = this;

    this.$http.get('/en/admin/post/list')
      .then(response => {
        vm.posts = response.data;
        this.$nextTick(function() {
          vm.datatable = $('table', vm.$el).DataTable({
            searching: true,
            paging: false,
            info: false,
            order: [],
            autoFill: true,
          });
        })
      });
  },
  methods: {
    ajouter() {
      let vm = this;

      let newPost = {
        id: '',
        title: 'new',
        author: {
          full_name: 'me',
        },
        published_at: '',
      };
      vm.posts.splice(0, 0, newPost);
    }
  }
});
