import { defineComponent as p, openBlock as n, createElementBlock as l, normalizeClass as d, createElementVNode as i, withDirectives as y, vShow as C, pushScopeId as R, popScopeId as S, resolveComponent as b, renderSlot as w, toDisplayString as h, Fragment as B, renderList as A, normalizeStyle as I, createVNode as M, createCommentVNode as k } from "vue";
class g {
  constructor(e) {
    this.color = e;
  }
  parseAlphaColor() {
    return /^rgba\((\d{1,3}%?\s*,\s*){3}(\d*(?:\.\d+)?)\)$/.test(this.color) ? this.parseRgba() : /^hsla\(\d+\s*,\s*([\d.]+%\s*,\s*){2}(\d*(?:\.\d+)?)\)$/.test(this.color) ? this.parseHsla() : /^#([0-9A-Fa-f]{4}|[0-9A-Fa-f]{8})$/.test(this.color) ? this.parseAlphaHex() : /^transparent$/.test(this.color) ? this.parseTransparent() : {
      color: this.color,
      opacity: "1"
    };
  }
  parseRgba() {
    return {
      color: this.color.replace(/,(?!.*,).*(?=\))|a/g, ""),
      opacity: this.color.match(/\.\d+|[01](?=\))/)[0]
    };
  }
  parseHsla() {
    return {
      color: this.color.replace(/,(?!.*,).*(?=\))|a/g, ""),
      opacity: this.color.match(/\.\d+|[01](?=\))/)[0]
    };
  }
  parseAlphaHex() {
    return {
      color: this.color.length === 5 ? this.color.substring(0, 4) : this.color.substring(0, 7),
      opacity: this.color.length === 5 ? (parseInt(this.color.substring(4, 5) + this.color.substring(4, 5), 16) / 255).toFixed(2) : (parseInt(this.color.substring(7, 9), 16) / 255).toFixed(2)
    };
  }
  parseTransparent() {
    return {
      color: "#fff",
      opacity: 0
    };
  }
}
const f = (t, e) => {
  const r = t.__vccOpts || t;
  for (const [s, u] of e)
    r[s] = u;
  return r;
}, P = p({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Star",
  props: {
    fill: {
      type: Number,
      default: 0
    },
    points: {
      type: Array,
      default() {
        return [];
      }
    },
    size: {
      type: Number,
      default: 50
    },
    starId: {
      type: Number,
      required: !0
    },
    activeColor: {
      type: String,
      required: !0
    },
    inactiveColor: {
      type: String,
      required: !0
    },
    borderColor: {
      type: String,
      default: "#000"
    },
    activeBorderColor: {
      type: String,
      default: "#000"
    },
    borderWidth: {
      type: Number,
      default: 0
    },
    roundedCorners: {
      type: Boolean,
      default: !1
    },
    rtl: {
      type: Boolean,
      default: !1
    },
    glow: {
      type: Number,
      default: 0
    },
    glowColor: {
      type: String,
      default: null,
      required: !1
    },
    animate: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["star-mouse-move", "star-selected"],
  data() {
    return {
      starPoints: [19.8, 2.2, 6.6, 43.56, 39.6, 17.16, 0, 17.16, 33, 43.56],
      grad: "",
      glowId: "",
      isStarActive: !0
    };
  },
  computed: {
    starPointsToString() {
      return this.starPoints.join(",");
    },
    gradId() {
      return "url(#" + this.grad + ")";
    },
    starSize() {
      const t = this.roundedCorners && this.borderWidth <= 0 ? parseInt(this.size) - parseInt(this.border) : this.size;
      return parseInt(t) + parseInt(this.border);
    },
    starFill() {
      return this.rtl ? 100 - this.fill + "%" : this.fill + "%";
    },
    border() {
      return this.roundedCorners && this.borderWidth <= 0 ? 6 : this.borderWidth;
    },
    getBorderColor() {
      return this.roundedCorners && this.borderWidth <= 0 ? this.fill <= 0 ? this.inactiveColor : this.activeColor : this.fill <= 0 ? this.borderColor : this.activeBorderColor;
    },
    maxSize() {
      return this.starPoints.reduce(function(t, e) {
        return Math.max(t, e);
      });
    },
    viewBox() {
      return "0 0 " + this.maxSize + " " + this.maxSize;
    },
    shouldAnimate() {
      return this.animate && this.isStarActive;
    },
    strokeLinejoin() {
      return this.roundedCorners ? "round" : "miter";
    }
  },
  created() {
    this.starPoints = this.points.length ? this.points : this.starPoints, this.calculatePoints(), this.grad = this.getRandomId(), this.glowId = this.getRandomId();
  },
  methods: {
    mouseMoving(t) {
      t.touchAction !== "undefined" && this.$emit("star-mouse-move", {
        event: t,
        position: this.getPosition(t),
        id: this.starId
      });
    },
    touchStart() {
      this.$nextTick(() => {
        this.isStarActive = !0;
      });
    },
    touchEnd() {
      this.$nextTick(() => {
        this.isStarActive = !1;
      });
    },
    getPosition(t) {
      let e = 0.92 * this.size;
      const r = this.rtl ? Math.min(t.offsetX, 45) : Math.max(t.offsetX, 1);
      let s = Math.round(100 / e * r);
      return Math.min(s, 100);
    },
    selected(t) {
      this.$emit("star-selected", {
        id: this.starId,
        position: this.getPosition(t)
      });
    },
    getRandomId() {
      return Math.random().toString(36).substring(7);
    },
    calculatePoints() {
      this.starPoints = this.starPoints.map((t, e) => {
        const r = e % 2 === 0 ? this.border * 1.5 : 0;
        return this.size / this.maxSize * t + r;
      });
    },
    getColor(t) {
      return new g(t).parseAlphaColor().color;
    },
    getOpacity(t) {
      return new g(t).parseAlphaColor().opacity;
    }
  }
}), z = (t) => (R("data-v-c0f9103d"), t = t(), S(), t), N = ["height", "width", "viewBox"], $ = ["id"], O = ["offset", "stop-color", "stop-opacity"], F = ["offset", "stop-color", "stop-opacity"], T = ["id"], W = ["stdDeviation"], j = /* @__PURE__ */ z(() => /* @__PURE__ */ i("feMerge", null, [
  /* @__PURE__ */ i("feMergeNode", { in: "coloredBlur" }),
  /* @__PURE__ */ i("feMergeNode", { in: "SourceGraphic" })
], -1)), L = ["points", "fill", "stroke", "filter", "stroke-width"], E = ["points", "fill", "stroke", "stroke-width", "stroke-linejoin"], q = ["points", "fill"];
function D(t, e, r, s, u, m) {
  return n(), l("svg", {
    class: d(["vue-star-rating-star", { "vue-star-rating-star-rotate": t.shouldAnimate }]),
    height: t.starSize,
    width: t.starSize,
    viewBox: t.viewBox,
    onMousemove: e[0] || (e[0] = (...o) => t.mouseMoving && t.mouseMoving(...o)),
    onClick: e[1] || (e[1] = (...o) => t.selected && t.selected(...o)),
    onTouchstart: e[2] || (e[2] = (...o) => t.touchStart && t.touchStart(...o)),
    onTouchend: e[3] || (e[3] = (...o) => t.touchEnd && t.touchEnd(...o))
  }, [
    i("linearGradient", {
      id: t.grad,
      x1: "0",
      x2: "100%",
      y1: "0",
      y2: "0"
    }, [
      i("stop", {
        offset: t.starFill,
        "stop-color": t.rtl ? t.getColor(t.inactiveColor) : t.getColor(t.activeColor),
        "stop-opacity": t.rtl ? t.getOpacity(t.inactiveColor) : t.getOpacity(t.activeColor)
      }, null, 8, O),
      i("stop", {
        offset: t.starFill,
        "stop-color": t.rtl ? t.getColor(t.activeColor) : t.getColor(t.inactiveColor),
        "stop-opacity": t.rtl ? t.getOpacity(t.activeColor) : t.getOpacity(t.inactiveColor)
      }, null, 8, F)
    ], 8, $),
    i("filter", {
      id: t.glowId,
      height: "130%",
      width: "130%",
      filterUnits: "userSpaceOnUse"
    }, [
      i("feGaussianBlur", {
        stdDeviation: t.glow,
        result: "coloredBlur"
      }, null, 8, W),
      j
    ], 8, T),
    y(i("polygon", {
      points: t.starPointsToString,
      fill: t.gradId,
      stroke: t.glowColor,
      filter: "url(#" + t.glowId + ")",
      "stroke-width": t.border
    }, null, 8, L), [
      [C, t.glowColor && t.glow > 0 && t.fill > 0]
    ]),
    i("polygon", {
      points: t.starPointsToString,
      fill: t.gradId,
      stroke: t.getBorderColor,
      "stroke-width": t.border,
      "stroke-linejoin": t.strokeLinejoin
    }, null, 8, E),
    i("polygon", {
      points: t.starPointsToString,
      fill: t.gradId
    }, null, 8, q)
  ], 42, N);
}
const H = /* @__PURE__ */ f(P, [["render", D], ["__scopeId", "data-v-c0f9103d"]]);
const V = p({
  name: "VueStarRating",
  components: {
    Star: H
  },
  props: {
    increment: {
      type: Number,
      default: 1
    },
    rating: {
      type: Number,
      default: 0
    },
    roundStartRating: {
      type: Boolean,
      default: !0
    },
    activeColor: {
      type: [String, Array],
      default: "#ffd055"
    },
    inactiveColor: {
      type: String,
      default: "#d8d8d8"
    },
    maxRating: {
      type: Number,
      default: 5
    },
    starPoints: {
      type: Array,
      default() {
        return [];
      }
    },
    starSize: {
      type: Number,
      default: 50
    },
    showRating: {
      type: Boolean,
      default: !0
    },
    readOnly: {
      type: Boolean,
      default: !1
    },
    textClass: {
      type: String,
      default: ""
    },
    inline: {
      type: Boolean,
      default: !1
    },
    borderColor: {
      type: String,
      default: "#999"
    },
    activeBorderColor: {
      type: [String, Array],
      default: null
    },
    borderWidth: {
      type: Number,
      default: 0
    },
    roundedCorners: {
      type: Boolean,
      default: !1
    },
    padding: {
      type: Number,
      default: 0
    },
    rtl: {
      type: Boolean,
      default: !1
    },
    fixedPoints: {
      type: Number,
      default: null
    },
    glow: {
      type: Number,
      default: 0
    },
    glowColor: {
      type: String,
      default: "#fff"
    },
    clearable: {
      type: Boolean,
      default: !1
    },
    activeOnClick: {
      type: Boolean,
      default: !1
    },
    animate: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["update:rating", "hover:rating"],
  data() {
    return {
      step: 0,
      fillLevel: [],
      currentRating: 0,
      selectedRating: 0,
      ratingSelected: !1
    };
  },
  computed: {
    formattedRating() {
      return this.fixedPoints === null ? this.currentRating : this.currentRating.toFixed(this.fixedPoints);
    },
    shouldRound() {
      return this.ratingSelected || this.roundStartRating;
    },
    margin() {
      return this.padding + this.borderWidth;
    },
    activeColors() {
      return Array.isArray(this.activeColor) ? this.padColors(this.activeColor, this.maxRating, this.activeColor.slice(-1)[0]) : new Array(this.maxRating).fill(this.activeColor);
    },
    currentActiveColor() {
      return this.activeOnClick ? this.selectedRating > 0 ? this.activeColors[Math.ceil(this.selectedRating) - 1] : this.inactiveColor : this.currentRating > 0 ? this.activeColors[Math.ceil(this.currentRating) - 1] : this.inactiveColor;
    },
    activeBorderColors() {
      if (Array.isArray(this.activeBorderColor))
        return this.padColors(this.activeBorderColor, this.maxRating, this.activeBorderColor.slice(-1)[0]);
      let t = this.activeBorderColor ? this.activeBorderColor : this.borderColor;
      return new Array(this.maxRating).fill(t);
    },
    currentActiveBorderColor() {
      return this.activeOnClick ? this.selectedRating > 0 ? this.activeBorderColors[Math.ceil(this.selectedRating) - 1] : this.borderColor : this.currentRating > 0 ? this.activeBorderColors[Math.ceil(this.currentRating) - 1] : this.borderColor;
    },
    roundedRating() {
      let t = 1 / this.increment;
      return Math.min(this.maxRating, Math.ceil(this.currentRating * t) / t);
    }
  },
  watch: {
    rating(t) {
      this.currentRating = t, this.selectedRating = t, this.createStars(this.shouldRound);
    }
  },
  created() {
    this.step = this.increment * 100, this.currentRating = this.rating, this.selectedRating = this.currentRating, this.createStars(this.roundStartRating);
  },
  methods: {
    setRating(t, e) {
      if (!this.readOnly) {
        const r = this.rtl ? (100 - t.position) / 100 : t.position / 100;
        this.currentRating = (t.id + r - 1).toFixed(2), this.currentRating = this.currentRating > this.maxRating ? this.maxRating : this.currentRating, e ? (this.createStars(!0, !0), this.selectedRating = this.clearable && this.currentRating === this.selectedRating ? 0 : this.currentRating, this.$emit("update:rating", this.selectedRating), this.ratingSelected = !0) : (this.createStars(!0, !this.activeOnClick), this.$emit("hover:rating", this.currentRating));
      }
    },
    resetRating() {
      this.readOnly || (this.currentRating = this.selectedRating, this.createStars(this.shouldRound));
    },
    createStars(t = !0, e = !0) {
      this.currentRating = t ? this.roundedRating : this.currentRating;
      for (let r = 0; r < this.maxRating; r++) {
        let s = 0;
        r < this.currentRating && (s = this.currentRating - r > 1 ? 100 : (this.currentRating - r) * 100), e && (this.fillLevel[r] = Math.round(s));
      }
    },
    padColors(t, e, r) {
      return Object.assign(new Array(e).fill(r), t);
    }
  }
}), G = { class: "sr-only" };
function U(t, e, r, s, u, m) {
  const o = b("star");
  return n(), l("div", {
    class: d(["vue-star-rating", { "vue-star-rating-rtl": t.rtl }, { "vue-star-rating-inline": t.inline }])
  }, [
    i("div", G, [
      w(t.$slots, "screen-reader", {
        rating: t.selectedRating,
        stars: t.maxRating
      }, () => [
        i("span", null, "Rated " + h(t.selectedRating) + " stars out of " + h(t.maxRating), 1)
      ], !0)
    ]),
    i("div", {
      class: "vue-star-rating",
      onMouseleave: e[1] || (e[1] = (...a) => t.resetRating && t.resetRating(...a))
    }, [
      (n(!0), l(B, null, A(t.maxRating, (a) => (n(), l("span", {
        key: a,
        class: d([{ "vue-star-rating-pointer": !t.readOnly }, "vue-star-rating-star"]),
        style: I({ "margin-right": t.margin + "px" })
      }, [
        M(o, {
          fill: t.fillLevel[a - 1],
          size: t.starSize,
          points: t.starPoints,
          "star-id": a,
          step: t.step,
          "active-color": t.currentActiveColor,
          "inactive-color": t.inactiveColor,
          "border-color": t.borderColor,
          "active-border-color": t.currentActiveBorderColor,
          "border-width": t.borderWidth,
          "rounded-corners": t.roundedCorners,
          rtl: t.rtl,
          glow: t.glow,
          "glow-color": t.glowColor,
          animate: t.animate,
          onStarSelected: e[0] || (e[0] = (v) => t.setRating(v, !0)),
          onStarMouseMove: t.setRating
        }, null, 8, ["fill", "size", "points", "star-id", "step", "active-color", "inactive-color", "border-color", "active-border-color", "border-width", "rounded-corners", "rtl", "glow", "glow-color", "animate", "onStarMouseMove"])
      ], 6))), 128)),
      t.showRating ? (n(), l("span", {
        key: 0,
        class: d(["vue-star-rating-rating-text", t.textClass])
      }, h(t.formattedRating), 3)) : k("", !0)
    ], 32)
  ], 2);
}
const c = /* @__PURE__ */ f(V, [["render", U], ["__scopeId", "data-v-3d12d48e"]]), J = {
  install(t) {
    t.component(c.name, c);
  }
};
export {
  J as default
};
