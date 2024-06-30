/*
Basic Frontend Pluggability Workshop Example.

*/

import {
  DIRECT_PLUGIN,
  IFRAME_PLUGIN,
  PLUGIN_OPERATIONS,
} from '@openedx/frontend-plugin-framework';


const sidebarRecommender = () => (
  <p style={{backgroundColor: 'lightblue'}}>openedx con 2024</p>
);

const config = {
  pluginSlots: {
    widget_sidebar_plugin_slot: {
      keepDefault: false,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'sidebar_iframe_plugin',
            type: DIRECT_PLUGIN,
            RenderWidget: sidebarRecommender,
          },
        }
      ],
    },
  },
}

export default config;