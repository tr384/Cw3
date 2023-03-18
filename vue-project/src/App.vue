<template>
  <div id="app">
    <div>
      <button class="fa fa-shopping-basket"  v-if="enableCheckout" @click="showCheckout">{{totalItems}} Checkout!</button>
      <button class="fa fa-shopping-basket"  disabled v-else>Checkout</button>
  </div>
    <main>
      <component :is="currentView" :lessons="lessons" :cart="cart" @add-item-to-cart="addToCart" @manage-remove-item="manageRemoveItem"></component>
    </main>
  
    </div>
</template>


<script>
  
  import ProductList from "./components/ProductList.vue";
  import Checkout from "./components/Checkout.vue";

  
  //import lessons from "./assets/lessons.json";
  

  export default {
    name: "App",
    data() { 
      return { 
        currentView: ProductList ,
        //lessons:lessons,
        i:0,
        lessons: [],
        sitename: "Vue.js Pet Depot",
        url: "https://newcw2-env.eba-sw23cwmq.eu-west-2.elasticbeanstalk.com/collections/lessons",
        cart: [],
        
      } 
    },
    components: { 
      ProductList, 
      Checkout 
    },

    created: function (){
      let lroject = this;

      fetch(this.url).then( 
        function (response) {
          response.json().then(
            function(json) {
              lroject.lessons = json;
            }
          )
      })
    },

    methods: { 
      
      showCheckout() {
        if (this.currentView === ProductList){
          this.currentView = Checkout
        }else {
          this.currentView = this.currentView = ProductList;
        }
      },
   
    addToCart(lesson) {            
       let cartItem = this.GetCartItem(lesson);

       if(cartItem != null){                            //if the cart item is null then add 1 to quantity else add the lesson to the cart
        cartItem.quantity++;
        } else {
            this.cart.push({
                lesson: lesson,
                quantity:1
            })
        }
        lesson.space--;
      },

      GetCartItem(lesson){          //Gets the item in cart By id
    
      for (let i= 0; i < this.cart.length; i++) {
        if(this.cart[i].lesson.id === lesson.id) {
            return this.cart[i]
        }
    }
  },

  
    manageRemoveItem(item) {
      item.quantity = item.quantity -1;
        item.lesson.space = item.lesson.space +1;
        if (item.quantity ==0) {
            let itemIndex = this.cart.indexOf(item); //this line gets the posistion of the item in the cart array
            this.cart.splice(itemIndex, 1); // removes the item at the index position in the cart array splice removes the item at the given position, item index is by one
        }
        if (this.cart.length ===0){
            this.currentView = ProductList;
          }

},

},
      
    
    computed:{
      totalItems: function() {                           //returns the number of items in cart
            return this.cart.length;
        }, 
        enableCheckout: function(){                        //Enables the checkout when cart has more than 0 items
            return this.cart.length > 0;
        },
        cartItemCount: function () {
            if (this.cart.length > 0)
              return this.cart.reduce((total, item) => total + item.space, 0);
            return 0;
          },
        },
        watch: {
          searchText: {
            handler(val) {
              this.getLessons();
            },
          },
        

    }

  };
  
</script>