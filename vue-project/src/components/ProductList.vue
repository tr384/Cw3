<template>
<div> 
    <h1 >Welcome to products page</h1>
    <div>
    
                 <div  v-for="lesson in lessons" class="result"  >
                    <img class="result" >
                        <div class="card h-100">
                            <div class="card-body p-4" >
                                <img img v-bind:src="lesson.img" width = "150">
                                <div class="text-center">
                                    <div class="container2">                        
                                    <div>Subject: {{lesson.subject}}</div>
                                    <div>Location: {{lesson.location}}</div>  <!-- Displaying Lesson Array Details-->
                                    <div>Spaces: {{lesson.space}}</div>
                                    <div>Price: £{{lesson.price}}</div>
                                </div>
                            </div>
                        </div>     
                        <div>               <!-- Add To Cart Button-->
                        <button  class="btn btn-outline-dark mt-auto" v-if="canAddToCart(lesson)" @click="addToCart(lesson)">add to cart</button>
                        <button  class="btn btn-outline-dark mt-auto" v-else disabled>add to cart</button>
                    </div>  
                </div>
                 </div>
                
        </div>
    </div>

</template>

<script>
export default {
    name: "ProductList",
    props: ["lessons","result", "cart"],
    data(){
        return{}
    },
    methods:{
    

        cartCount(lesson) {               //counts how many items are added to the cart, and adds to the cart 
        let count = 0;
        for(let i = 0; i < this.cart.length; i++) {
            if(this.cart[i] === lesson) {
                count++;
            }
        }
        return count;
    },
    canAddToCart(lesson) {        //allows the product to be added to cart if there are lessons availble
        return lesson.space > this.cartCount(lesson.id);
        

    },

    addToCart: function(lesson) {
      this.$emit("add-item-to-cart", lesson)
    },

    }
    
}

</script>