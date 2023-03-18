<template>
    <div>
      <h1>Welcome to the Checkout</h1>
      <h2>You currently have {{totalItems}} items in your cart.</h2>
  
      <table style="width:100%">
        <thead>
          <tr >
            <th style="text-align: left;">Lesson</th>
            <th style="text-align: left;">Location</th>
            <th style="text-align: left;">Space</th>
            <th style="text-align: left;">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cart">
            <td style="text-align: left;">{{item.lesson.subject}}</td>
            <td style="text-align: left;">{{item.lesson.location}}</td>
            <td style="text-align: left;">{{item.quantity}}</td>
            <td style="text-align: left;">£{{item.lesson.price}}</td>
            <td>
                              <button v-on:click="removeItem(item)">Remove from </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>

<script>
export default {
    name: "checkout",
    props: ["lessons", "lesson", "cart"],
    methods: {
        cartCount(id) {               //counts how many items are added to the cart, and adds to the cart 
        let count = 0;
        for(let i = 0; i < this.cart.length; i++) {
            if(this.cart[i].lesson.id === id) {
                count++;
            }
        }
        return count;
    },
 

    
    removeItem: function(item){
        this.$emit("manage-remove-item", item);

    },

    

       

    },
    computed:{
      totalItems: function() {                           //returns the number of items in cart
            return this.cart.length;
        }, 
    },

}
</script>