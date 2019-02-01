<template>
  <div>
    <div class="modal fade" ref="modal"
      v-bind:class="{ show: shouldBeShown }"
      v-bind:style="{ display: isOpen? 'block': 'none' }"
      @transitionend.self="onTransitionEnd()"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">

          <div class="modal-header">
            <slot name="modal-header" v-bind:modal="this">
              <h5 class="modal-title" id="modalLabel">
                <slot name="modal-title" v-bind:modal="this">
                  Modal title
                </slot>
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="hide(false)">
                <span aria-hidden="true">&times;</span>
              </button>
            </slot>
          </div>

          <div class="modal-body">
            <slot v-bind:modal="this">
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="modal-footer" v-bind:modal="this">
              <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="hide(false)">
                Close
              </button>
              <button type="button" class="btn btn-primary" @click="hide(true)">
                Save
              </button>
            </slot>
          </div>

        </div>
      </div>
    </div>
    <div class="modal-backdrop fade"
      v-bind:class="{ show: shouldBeShown }"
      v-bind:style="{ display: isOpen? 'block': 'none' }"
    ></div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      isOpen: false,
      shouldBeShown: false,
      resolve: null,
      reject: null
    }
  },
  mounted: function() {
  },
  methods: {
    show: function() {
      let _this = this;

      this.isOpen = true;

      this.$nextTick(() => {
        setTimeout(() => {
          this.shouldBeShown = true;
        }, 0);
      });

      this.$emit("show-bs-modal");

      this.$el.ownerDocument.body.classList.add('modal-open');

      return new Promise(function(resolve, reject) {
        _this.resolve = resolve;
        _this.reject = reject;
      });
    },
    hide: function(value) {

      this.shouldBeShown = false;

      this.$emit("hide-bs-modal");

      if(value) {
        this.resolve(value);
      } else {
        this.reject(value);
      }
    },
    onTransitionEnd: function() {
      if(this.shouldBeShown) {
        this.$emit("shown-bs-modal");
      } else {
        this.isOpen = false;
        this.$emit("hidden-bs-modal");
        this.$el.ownerDocument.body.classList.remove('modal-open');
      }
    }
  }
}
</script>

<style scoped>
</style>
