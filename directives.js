
export default {
  bsDropdown: {
    inserted: function(el) {
      const button = el.children[0];
      const menu = el.children[1];

      function toggle() {
        el.classList.toggle('show');
        menu.classList.toggle('show');
      }

      function close() {
        el.classList.remove('show');
        menu.classList.remove('show');
      }

      button.addEventListener('click', toggle);
      el.ownerDocument.body.addEventListener('click', (event) => {
        if(!el.contains(event.target)) {
          close();
        }
      });
    }
  }
};
