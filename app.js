var vm = new Vue({
  el: "#app",
  data(){
    return {
      posts: [],
      new_post_name:'',
      new_post_contents:'',
      new_post_price:'',
      search_name:'',
      edit_id:'',
      edit_name:'',
      edit_contents:'',
      edit_price:'',
      //new_post_picture:'',
    }
  },
  methods: {
    get_posts: function(){
      axios.get("http://localhost:3000/posts")
      .then((response) => {
        this.posts = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
    },
    post_post: function(){
      console.log("test")
      axios.post("http://localhost:3000/posts",{
          name: this.new_post_name,
          contents: this.new_post_contents,
          price: this.new_post_price
      })
        .then((response) => {
          console.log(response.data);
          this.get_posts();
          this.new_post_name='';
          this.new_post_contents='';
          this.new_post_price='';
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    delete_post: function(id){
      console.log(id);
      axios.delete(`http://localhost:3000/posts/${id}`)
        .then((response) => {
          this.get_posts();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    search_post: function(){
      axios.post("http://localhost:3000/posts/search",{
        name: this.search_name
      })
        .then((response) => {
          console.log(response.data);
          this.posts = response.data;
          this.search_name='';
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    edit_post: function(){
      var id = this.edit_id;
      console.log(id);
      axios.get(`http://localhost:3000/posts/${id}/edit`)
        .then((response) => {
          this.edit_name = response.data.name;
          this.edit_contents = response.data.contents;
          this.edit_price = response.data.price;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    update_post: function(){
      var present_id = this.edit_id;
      console.log(present_id);
      axios.patch(`http://localhost:3000/posts/${present_id}`,{
        id: this.edit_id,
        name: this.edit_name,
        contents: this.edit_contents,
        price: this.edit_price
      })
        .then((response) => {
          this.get_posts();
          this.edit_id='';
          this.edit_name='';
          this.edit_contents='';
          this.edit_price='';
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  mounted: function() {
    this.get_posts();
  }
});
