import {createApp} from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.1.4/vue.esm-browser.min.js' 
createApp({
  data() {
    return{
      datalist:[],
      isPremium: false,
      imgSize: 'thumbnail',
      likes: [],
      count: 0
    }
  },
  mounted(){
    this.getData();
  },
  methods:{
    getData(){
      axios.get('https://randomuser.me/api/?results=5').then(res=>{
        this.datalist = res.data.results;
        this.datalist.forEach(ele=>{
          ele.showmap = false;
          ele.showcard = true;
        })
      })
    },
    openPremium(){
      this.isPremium = !this.isPremium;
      if(this.isPremium){
        this.imgSize = "large";
      }else{
        this.imgSize = "thumbnail";
      }
    },
    imgSourse(person){
      let urls = `background-image: url(${person.picture[this.imgSize]});`
      return urls;
    },
    mapswitch(person){
      person.showmap = !person.showmap;
    },
    addlike(person){
      person.showcard = false;
      this.likes.push(person);
      this.count++;
    },
    addbroken(person){
      person.showcard = false;
      this.count++;
    },
    recard(){
      this.datalist = [];
      this.likes = [];
      this.count = 0;
      this.getData();
    }
  } 
}).mount('#app');