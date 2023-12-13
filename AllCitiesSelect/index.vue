<template>
  <v-col cols="12" class="py-0">
    <FormGroup rules="required" errorName="all_cities" name="city">
      <template #default="{ attrs }">
        <v-autocomplete
          rounded
          autocomplete="off"
          role="presentation"
          :autofocus="false"
          ref="city_ref"
          v-bind="attrs"
          id="cities"
          @focus.prevent
          @copy.prevent
          @paste.prevent
          prepend-inner-icon="mdi-magnify"
          class="select-cities"
          label
          outlined
          v-model="form.city_list"
          :items="cities"
          item-text="name"
          item-value="id"
          :placeholder="$t('select_cities')"
          multiple
          return-object
          :no-data-text="$t('no_data')"
        >
          <template v-slot:prepend-item>
            <v-list-item
              v-if="cities.length > 0"
              ripple
              @mousedown.prevent
              @click.prevent="onSelectCity"
            >
              <v-list-item-action>
                <v-icon :color="form.city_list.length > 0 ? 'primary ' : ''">{{
                  icon
                }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ $t("select_all") }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider class="mt-2"></v-divider>
          </template>
          <template v-slot:item="{ item, attrs, on }">
            <v-list-item v-on="on" v-bind="attrs" #default="{ active }">
              <v-list-item-action>
                <v-checkbox :input-value="active"></v-checkbox>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  <v-row no-gutters align="center">
                    <span>{{ item.name }}</span>
                  </v-row>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-autocomplete>
      </template>
    </FormGroup>
  </v-col>
</template>

<script>
export default {
  name: "MultiSelect",
  props: {
    cities: {
      type: Array,
      default: () => [],
    },
    form: {
      type: Object,
      default: () => ({
        city_list: [],
      }),
    },
  },
  data() {
    return {
      loadingItems: false,
    };
  },
  computed: {
    selectAllCities() {
      return this.form.city_list.length === this.cities.length;
    },

    selectSomeCity() {
      return this.cities.length > 0 && !this.selectAllCities;
    },

    icon() {
      if (this.selectAllCities) return "mdi-checkbox-marked";
      if (this.selectSomeCity) return "mdi-minus-box";
      return "mdi-checkbox-blank-outline";
    },
  },
  methods: {
    onSelectCity() {
      this.$nextTick(() => {
        if (this.selectAllCities) {
          this.form.city_list = [];
        } else {
          this.form.city_list = this.cities.slice();
        }
      });
    },
  },
};
</script>

<style lang="scss">
.select-cities {
  .v-chip {
    border-radius: 8px !important;
    padding: 10px;
    font-weight: 500 !important;

    .mdi-close-circle::before {
      content: "\f0156" !important;
      font-size: 12px !important;
    }
  }

  .v-select__selections {
    max-height: 300px !important;
    overflow-y: auto !important;
  }
}
</style>
