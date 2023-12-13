<template>
  <main>
    <v-text-field
      @click="$refs.file.click()"
      type="text"
      readonly
      outlined
      rounded
      v-bind="$attrs"
      v-model="fileName"
      ref="file_ref"
    >
      <template v-slot:prepend-inner>
        <v-icon color="light-secondary"> mdi-file-outline </v-icon>
      </template>
      <template v-slot:append>
        <v-btn small icon @click="$refs.file.click()" class="ma-0">
          <v-icon color="light-secondary"> mdi-folder-upload-outline </v-icon>
        </v-btn>
      </template>
    </v-text-field>
    <input
      hidden
      type="file"
      ref="file"
      @change="onFileChange"
      :accept="$attrs.accept"
    />
  </main>
</template>

<script>
export default {
  name: "FileUpload",
  inheritAttrs: false,
  props: {
    form: {
      type: Object,
      default: () => {},
    },
    fieldName: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      fileName: "",
    };
  },
  methods: {
    resetFile() {
      this.fileName = null;
      this.form[this.fieldName] = null;
      if (this.$refs.file_ref) {
        this.$refs.file_ref.value = null;
      }
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.fileName = file.name;
      this.form[this.fieldName] = file;
    },
  },
};
</script>
