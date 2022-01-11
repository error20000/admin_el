import {mapState} from 'vuex'
import { Menu, Submenu, MenuItem, MenuItemGroup} from 'element-ui'

export default {
  name: 'menuTree',
  props: {
    menuData: {
      type: Array,
      required: false
    },
    mode: {
      type: String,
      required: false,
      default: 'vertical'
    },
  },
  computed:{
    ...mapState({
      nameKey: state => state.menu.nameKey,
      iconKey: state => state.menu.iconKey,
      indexKey: state => state.menu.indexKey,
      pathKey: state => state.menu.pathKey,
      childrenKey: state => state.menu.childrenKey,
    })
  },
  methods: {
    renderIcon(h, icon) {
      if (!icon) {
        return null;
      }
      return h('i', { class: icon });
    },
    renderMenuItem(h, menu) {
      let temp = [];
      if(menu[this.pathKey].startsWith("http")){
        temp=[
          h(
            'a', 
            {
              attrs: {
                href: menu[this.pathKey], 
                target: '_blank',
              }
            }, 
            [
              this.renderIcon(h, menu[this.iconKey]),
              h('span', [menu[this.nameKey]]),
            ]
          ),
        ];
      }else{
        temp = [
          this.renderIcon(h, menu[this.iconKey]),
          h('span', [menu[this.nameKey]])
        ];
      }
      return h(
        MenuItem, 
        { 
          props: {
            index: menu[this.indexKey] + "",
          },
        },
        temp
      );
    },
    renderSubMenu(h, menu) {
      let temp = [];
      menu[this.childrenKey].forEach((item, i) => {
        temp.push(this.renderItem(h, item))
      });
      let title = h('template', {slot: 'title'}, [
        this.renderIcon(h, menu[this.iconKey]),
        h('span', [menu[this.nameKey]]),
      ]);
      temp.push(title);
      return h(
        Submenu, 
        { 
          props: {
            index: menu[this.indexKey] + "",
          },
        },
        temp
      );
    },
    renderItem(h, menu) {
      return menu.children && menu.children.length > 0
        ? this.renderSubMenu(h, menu)
        : this.renderMenuItem(h, menu);
    },
    renderMenu(h){
      let temp = [];
      this.menuData.forEach((item, i) => {
        temp.push(this.renderItem(h, item))
      });
      return temp;
    },
  },
  render (h) {
    return h(
      Menu,
      {
        props: {
          mode: this.$props.mode,
        },
        on: {
          select: (index, path) => {
            this.$emit('select', index, path);
          }
        }
      },
      this.renderMenu(h)
    )
  }
}

