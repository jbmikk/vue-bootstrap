<template>
  <div class="modal fade" id="exampleModal"
    v-bind:class="{ show: isOpen }"
    v-bind:style="{ display: isOpen? 'block': 'none' }"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">

        <div class="modal-header">
          <slot name="modal-header">
            <h5 class="modal-title" id="modalLabel">
              <slot name="modal-title">
                Modal title
              </slot>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="hide(false)">
              <span aria-hidden="true">&times;</span>
            </button>
          </slot>
        </div>

        <div class="modal-body">
          <slot></slot>
        </div>

        <div class="modal-footer">
          <slot name="modal-footer">
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
</template>

<script>
export default {
  data: function() {
    return {
      isOpen: false,
      resolve: null,
      reject: null
    }
  },
  methods: {
    show: function() {
      this.isOpen = true;
      let _this = this;

      return new Promise(function(resolve, reject) {
        _this.resolve = resolve;
        _this.reject = reject;
      });
    },
    hide: function(value) {
      this.isOpen = false;
      if(value) {
        this.resolve(value);
      } else {
        this.reject(value);
      }
    }
  }
}
</script>

<style scoped>
</style>
