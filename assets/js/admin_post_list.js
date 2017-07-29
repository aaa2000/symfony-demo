import Vue from 'vue';

var apptest = new Vue({
  delimiters: ['${', '}'],
  el: '#apptest',
  data: {
    message: 'Hello Vue!'
  }
});
