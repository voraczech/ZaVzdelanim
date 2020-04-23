<template>
  <img
    :src="url"
    class="rounded"
  />
</template>

<script>
/*
  from https://github.com/aws-amplify/amplify-js/blob/a37bb41112771827be51753c2e2e07a9b0dd35c6/packages/aws-amplify-vue/src/components/storage/S3Image.vue
  but I don't need styling
*/

export default {
  props: {
    path: null
  },
  data() {
    return {
      url: null
    };
  },
  mounted() {
    this.getImage();
  },
  methods: {
    getImage() {
      if (this.path) {
        this.$Amplify.Storage.get(this.path)
          .then(url => {
            this.url = url;
          })
          .catch(e => this.setError(e));
      }
    }
  }
};
</script>
