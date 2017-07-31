import Vue from 'vue';
import axios from 'axios'

Vue.prototype.$http = axios;

Vue.component('data-table', {
  template: `
  <table>       
  <thead>
      <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Author</th>
          <th><i class="fa fa-calendar" aria-hidden="true"></i>Publish at</th>
      </tr>
  </thead>            
  <tbody>
    <template v-for="post in posts">
        <tr>{{post.name}}</tr>
        <tr>{{post.title}}</tr>
        <tr>{{post.author.full_name}}</tr>
        <tr>{{post.publish_at}}</tr>
    </template>
  </tbody>
  </table>
  `,
  props: ['posts'],
  data() {
    return {
      headers: [
        { title: 'ID' },
        { title: 'Title', class: 'some-special-class' },
        { title: 'Author' },
        { title: '<i class="fa fa-calendar" aria-hidden="true"></i>Publish at' },
      ],
      rows: [] ,
      dtHandle: null
    }
  },
  watch: {
    posts(val, oldVal) {
      let vm = this;
      vm.rows = [];
      // // You should _probably_ check that this is changed data... but we'll skip that for this example.
      // val.forEach(function (item) {
      //   // Fish out the specific column data for each item in your data set and push it to the appropriate place.
      //   // Basically we're just building a multi-dimensional array here. If the data is _already_ in the right format you could
      //   // skip this loop...
      //   let row = [];
      //
      //   row.push(item.id);
      //   row.push(item.title);
      //   row.push(item.author.full_name);
      //   row.push(item.published_at);
      //
      //   vm.rows.push(row);
      // });

      // Here's the magic to keeping the DataTable in sync.
      // It must be cleared, new rows added, then redrawn!
      vm.dtHandle.clear();
      //vm.dtHandle.rows.add(vm.rows);
      vm.dtHandle.draw();
    }
  },
  mounted() {
    let vm = this;
    // Instantiate the datatable and store the reference to the instance in our dtHandle element.
    vm.dtHandle = $(this.$el).DataTable({
      // Specify whatever options you want, at a minimum these:
      columns: vm.headers,
      data: vm.rows,
      searching: false,
      paging: false,
      info: false
    });
  }
});

new Vue({
  delimiters: ['${', '}'],
  el: '#bulk',
  data: {
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
      });
  },
  updated() {
    let vm = this;

    $('table', vm.$el).DataTable({
      searching: true,
      paging: false,
      info: false
    });
  },
  methods: {
    ajouter() {
      let vm = this;

      vm.posts.push({
          id: '',
          title: 'new',
          author: {
            full_name: 'me',
          },
          published_at: '',
      });
    }
  }
});
