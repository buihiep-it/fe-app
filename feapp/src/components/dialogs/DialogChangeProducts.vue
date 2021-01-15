<template>
  <div class="dialog-product-container container-change-products">
    <h1 class="headding">
      <span v-if="props.action === 'add'">Add Products</span>
      <span v-if="props.action === 'edit'">Edit Products</span>
      <span v-if="props.action === 'del'">Delete Products</span>
    </h1>
    <ValidationObserver ref="observer" v-slot="{ invalid }" tag="form">
      <div class="wrapper-list">
        <div class="scrollBar">
          <table>
            <tbody v-if="props.action !== 'del'">
              <template v-for="(product, i) in newListProducts">
                <tr :key="i">
                  <td>
                    <ValidationProvider
                      slim
                      name="titleProduct"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        v-model="product.title"
                        :error-messages="errors"
                        placeholder="Title product"
                        class="product-title v-text-field-small"
                      ></v-text-field>
                    </ValidationProvider>
                  </td>
                  <td>
                    <ValidationProvider
                      slim
                      name="titleProduct"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        v-model="product.type"
                        :error-messages="errors"
                        placeholder="Title product"
                        class="product-title v-text-field-small"
                      ></v-text-field>
                    </ValidationProvider>
                  </td>
                  <td>
                    <ValidationProvider
                      slim
                      name="descriptionProduct"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        v-model="product.description"
                        :error-messages="errors"
                        placeholder="Description product"
                        class="product-description v-text-field-small"
                      ></v-text-field>
                    </ValidationProvider>
                  </td>
                  <td class="cell-center">
                    <ValidationProvider
                      slim
                      name="priceProduct"
                      rules="required|max:9|decimal"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        v-model="product.price"
                        :error-messages="errors"
                        placeholder="Price product"
                        class="product-price v-text-field-small"
                      ></v-text-field>
                    </ValidationProvider>
                  </td>
                  <td class="cell-center">
                    <ValidationProvider
                      slim
                      name="ratingProduct"
                      rules="required|max:1|isVote"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        v-model="product.rating"
                        :error-messages="errors"
                        placeholder="Rating product"
                        class="product-rating v-text-field-small"
                      ></v-text-field>
                    </ValidationProvider>
                  </td>
                </tr>
              </template>
            </tbody>
            <tbody v-if="props.action === 'del'">
              <template v-for="(product,i) in props.listProducts">
                <tr :key="i">
                  <td>
                    <div>{{product.title}}</div>
                  </td>
                  <td>
                    <div>{{product.description}}</div>
                  </td>
                  <td class="cell-center">
                    <div>{{product.price}}</div>
                  </td>
                  <td class="cell-center">
                    <div>{{product.rating}}</div>
                  </td>
                  <td>
                    <div><img :src="require('@/assets/images/' + product.filename)" /></div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
      <div class="wrapper-btns">
        <v-btn width="100" color="secondary" @click="close">cancel</v-btn>
        <v-btn
          width="100"
          color="primary"
          @click="submit"
          :disabled="invalid"
          >ok</v-btn>
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
import DialogService from "@/services/dialog.service"
import ProductsListService from "@/services/products.service"

export default {
  name: "DialogChangeProducts",

  props: {
    props: {
      listProducts: {
        type: Array,
        default: function () {
          return []
        }
      },
      action: {
        type: String
      }
    }
  },

  data: () => ({
    dialogService: new DialogService(),
    productsListService: new ProductsListService(),
    newListProducts: {
      type: Array,
      default: function () {
        return []
      }
    }
  }),

  computed: {
    ...mapGetters({
      data: "products/getData"
    })
  },

  methods: {
    close() {
      this.$emit("close")
    },

    submit () {
      switch (this.props.action) {
        case 'add': this.productsListService.addProducts(this.newListProducts)
        break
        case 'edit': this.productsListService.editProducts(this.newListProducts[0])
        break
        case 'del': this.productsListService.delProducts(this.props.listProducts[0].title)
        break
      }
      this.$emit('close', true)
    },

    ...mapActions("products", ["changeProductsData"])
  },

  mounted() {
    this.newListProducts = JSON.parse(JSON.stringify(this.props.listProducts))
  }
}
</script>

<style lang="scss">
  .dialog-product-container {
    position: relative;
    padding-bottom: 100px;
    .wrapper-list {
      border: 0;
      margin-bottom: 0;
    }
    .scrollBar {
      border-bottom: 1px solid #ccc;
    }
    .wrapper-btns {
      position: absolute;
      bottom: 50px;
      left: 0;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      .v-btn + .v-btn {
        margin-left: 10px;
      }
    }
  }
</style>