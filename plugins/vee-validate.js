import vue from "vue";
import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import * as rules from "vee-validate/dist/rules";

vue.component("ValidationProvider", ValidationProvider);
vue.component("ValidationObserver", ValidationObserver);
export default ({ app: { i18n } }) => {
  //messages for all rules
  const customMessages = {
    getMessage(_, values) {
      let mimesRule;
      if (typeof values == "object") {
        const spreadData = (({ _field_, _value_, _rule_, ...values }) =>
          values)(values);
        mimesRule = Object.values(spreadData).join(",");
      }
      return i18n.t(`validation.${values._rule_}`, {
        field: i18n.t(`fields.${values._field_}`),
        max: values.length,
        min: values.length,
        max_value: values.max,
        mimes: mimesRule,
      });
    },
  };

  //Normal rules
  const customRules = {
    hasNumbers: /\d/,
    hasCapitalLetters: /[A-Z]/,
    hasLowerLetters: /[a-z]/,
    hasSpecialCharacters: /[@#$%^&+=]/,
    validPhoneNumber:
      /^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/,
    validLocationInSaudia: "Saudi Arabia",
    startWithSA: /^SA/,
  };
  Object.entries(customRules).forEach(([ruleKey, ruleValue]) => {
    extend(ruleKey, {
      validate: (value) => {
        return value.match(ruleValue);
      },
      message: customMessages.getMessage,
    });
  });

  extend("biggerThan", {
    params: ["otherValue", "comparedField"],
    validate: (value, { otherValue }) => {
      return value && value > Number(otherValue);
    },
    message: customMessages.getMessage,
  });
  extend("smallerThan", {
    params: ["otherValue", "comparedField"],
    validate: (value, { otherValue }) => {
      return value && value < Number(otherValue);
    },
    message: customMessages.getMessage,
  });

  extend("afterDate", {
    params: ["otherValue", "comparedField"],
    validate: (value, { otherValue }) => {
      return value && value > otherValue;
    },
    message: customMessages.getMessage,
  });
  extend("beforeDate", {
    params: ["otherValue", "comparedField"],
    validate: (value, { otherValue }) => {
      return value && value < otherValue;
    },
    message: customMessages.getMessage,
  });

  //All rules
  Object.keys(rules).forEach((rule) => {
    //Location In Saudia
    // extend("validLocationInSaudia", {
    //   validate: (value) => {
    //     return value.includes("Saudi Arabia");
    //   },
    //   message: customMessages.getMessage
    // });

    extend(rule, {
      ...rules[rule],
      message: customMessages.getMessage,
    });
  });
};

// export const biggerThan = (param, fieldName) =>
//   helpers.withParams({ type: 'biggerThan', biggerThan: fieldName }, (value) =>
//     value && param ? Number(value) > Number(param) : true
//   )
// export const smallerThan = (param, fieldName) =>
//   helpers.withParams({ type: 'smallerThan', smallerThan: fieldName }, (value) =>
//     value && param ? Number(value) < Number(param) : true
//   )
