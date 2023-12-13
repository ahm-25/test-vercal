<template>
  <div class="vuejs-countdown d-flex justify-center">
    <p class="digit">{{ timeLeft }}</p>
  </div>
</template>

<script>
// let interval = null;
export default {
  name: "CountDown",
  props: {
    timer: {
      type: Number,
      default: 10,
    },
    end: {
      type: String,
    },
    stop: {
      type: Boolean,
    },
  },
  data() {
    return {
      selectedTime: 0,
      timeLeft: "00:00",
      endTime: "0",
      intervalTimer: null,
    };
  },
  mounted() {
    this.setTime(this.timer);
  },
  methods: {
    hourConvert(hour) {
      // 15 --> 3
      return hour % 12 || 12;
    },

    zeroPadded(num) {
      // 4 --> 04
      return num < 10 ? `0${num}` : num;
    },

    setTime(seconds) {
      clearInterval(this.intervalTimer);
      this.setTimer(seconds);
    },
    setTimer(seconds) {
      const now = Date.now();
      const end = now + seconds * 1000;
      this.displayTimeLeft(seconds);

      this.selectedTime = seconds;
      // this.initialTime = seconds;
      this.displayEndTime(end);
      this.countdown(end);
    },
    countdown(end) {
      // this.initialTime = this.selectedTime;
      this.intervalTimer = setInterval(() => {
        const secondsLeft = Math.round((end - Date.now()) / 1000);

        if (secondsLeft === 0) {
          this.endTime = 0;
        }

        if (secondsLeft < 0) {
          clearInterval(this.intervalTimer);
          return;
        }
        this.displayTimeLeft(secondsLeft);
      }, 1000);
    },
    displayTimeLeft(secondsLeft) {
      const minutes = Math.floor((secondsLeft % 3600) / 60);
      const seconds = secondsLeft % 60;

      this.timeLeft = `${this.zeroPadded(minutes)}:${this.zeroPadded(seconds)}`;
    },
    displayEndTime(timestamp) {
      const end = new Date(timestamp);
      const hour = end.getHours();
      const minutes = end.getMinutes();

      this.endTime = `${this.hourConvert(hour)}:${this.zeroPadded(minutes)}`;
    },
  },
  computed: {
    seconds() {
      return Math.trunc(this.date) % 60;
    },
    minutes() {
      return Math.trunc(this.date * 60) / 60;
    },
  },
  watch: {
    endTime: {
      handler(value) {
        if (value === 0) {
          this.$emit("on-timer-end");
        }
      },
      immediate: true,
    },
  },
  filters: {
    twoDigits(value) {
      if (value.toString().length <= 1) {
        return "0" + value.toString();
      }
      return value.toString();
    },
  },
};
</script>
<style>
.vuejs-countdown {
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  font-weight: normal !important;
}
.vuejs-countdown li {
  display: inline-block;
  margin: 0 8px;
  text-align: center;
  position: relative;
}
.vuejs-countdown li p {
  margin: 0;
}
.vuejs-countdown li:after {
  content: ":";
  position: absolute;
  top: 0;
  right: -13px;
  font-size: 32px;
}
.vuejs-countdown li:first-of-type {
  margin-left: 0;
}
.vuejs-countdown li:last-of-type {
  margin-right: 0;
}
.vuejs-countdown li:last-of-type:after {
  content: "";
}
.vuejs-countdown .digit {
  font-size: 18px;
  font-weight: normal;
  line-height: 1.4;
  margin-bottom: 0;
}
.vuejs-countdown .text {
  text-transform: uppercase;
  margin-bottom: 0;
  font-size: 10px;
}
</style>
