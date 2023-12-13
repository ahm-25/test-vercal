import colors from "@/assets/scss/_variables.scss";
export default ({ store }) => {
  return {
    breakpoint: {},
    icons: {},
    lang: {},
    rtl: true,
    theme: {
      global: {
        ripples: false,
      },
      dark: false,
      themes: {
        light: colors,
        // dark: { ...store.getters['themes/getTheme'] },
      },
    },
  };
};
