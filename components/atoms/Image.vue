<template>
  <img
    sizes="
    (min-width: 60em) calc((100vw + 1rem - 8rem) / 4 - 2rem),
    (min-width: 50em) calc((100vw - 8rem) / 1 - 0rem),
    calc(100vw - 4rem)"
    :srcset="`
        https://res.cloudinary.com/${cloudName}/image/upload/${totalTransformation}w_256/${publicId} 256w,
        https://res.cloudinary.com/${cloudName}/image/upload/${totalTransformation}w_512/${publicId} 512w,
        https://res.cloudinary.com/${cloudName}/image/upload/${totalTransformation}w_768/${publicId} 768w,
        https://res.cloudinary.com/${cloudName}/image/upload/${totalTransformation}w_1024/${publicId} 1024w,
        https://res.cloudinary.com/${cloudName}/image/upload/${totalTransformation}w_1280/${publicId} 1280w`"
    :src="`https://res.cloudinary.com/${cloudName}/image/upload/${totalTransformation}w_1024/${publicId}`"
    width="16"
    height="9"
    alt
  />
</template>

<script>
export default {
  props: {
    cloudName: {
      default: "ki"
    },
    defaultTransformation: {
      default: "q_auto:eco,c_fill,g_custom,"
    },
    transformation: {
      default: ""
    },
    publicId: {
      required: true
    },
    alt: {
      required: true
    }
  },
  computed: {
    totalTransformation() {
      return this.transformation !== ""
        ? this.transformation + "," + this.defaultTransformation
        : this.defaultTransformation;
    }
  }
};
</script>
