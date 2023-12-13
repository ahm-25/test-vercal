<template>
  <main class="card-cart">
    <v-hover v-slot="{ hover }">
      <v-card
        flat
        color="white"
        max-height="300px"
        class="pa-6"
        style="position: relative"
        :class="{ 'on-hover': hover }"
      >
        <v-row>
          <v-col sm="1" cols="1" class="d-flex align-center">
            <v-row>
              <div
                class="d-flex flex-column mx-auto text-center"
                style="visibility: hidden"
                :class="{ 'show-icons': hover }"
              >
                <v-icon class="my-2"> mdi-whatsapp </v-icon>
                <v-icon class="my-2"> mdi-whatsapp </v-icon>
              </div>
            </v-row>
          </v-col>
          <v-col sm="2" cols="10">
            <v-list-item class="">
              <v-list-item-avatar
                size="120"
                color="red"
                class="radius-8 mx-auto"
              >
              </v-list-item-avatar>
            </v-list-item>
          </v-col>

          <v-col md="9" class="d-flex align-center">
            <v-row>
              <div flat class="w-100">
                <v-app-bar
                  color="rgba(0 , 0 , 0 , 0)"
                  flat
                  dense
                  class="mb-xs-4"
                >
                  <v-toolbar-title
                    ><span class="size-32 primary--text"
                      >Item Title</span
                    ></v-toolbar-title
                  >
                  <v-spacer></v-spacer>
                  <div class="font-weight-normal">
                    <span class="size-16">قطع 3</span>
                    <span>*</span>
                    <span>1,685</span>
                    <span class="size-12">ر.س.</span>
                  </div>
                </v-app-bar>
                <v-app-bar color="rgba(0 , 0 , 0 , 0)" flat dense>
                  <v-toolbar-title class="d-flex">
                    <v-img
                      :src="require('@/assets/images/rec.svg')"
                      width="25px"
                      height="25px"
                      class="rounded-lg d-block mx-auto"
                    ></v-img>
                    <h2
                      class="size-14 size-sm-12 align-self-center secondary--text mx-2"
                    >
                      المصنع السعودي للأثاث
                    </h2>
                    <v-chip color=""></v-chip>
                  </v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-title>aaaaaa</v-toolbar-title>
                </v-app-bar>
              </div>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-hover>
  </main>
</template>

<script>
export default {
  name: "CardCart",
};
</script>

<style scoped></style>
