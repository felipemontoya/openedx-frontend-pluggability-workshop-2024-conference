# Basic Frontend Pluggability

Workshop at the 2024 Open edX Conference - Stellenbosch


## Goals of the Workshop


- Meet the frontend extensibility framework - FPF
- Understand the core concepts - Slot / Plugin
- Familiarize with the configuration
- Connect to a development environment
- Create a plugin for an existing slot
- Write a footer using react to match your initiative's brand



## The theory

### Introduction to the frontend plugin framework

> The Frontend Plugin Framework is designed to be an extension point to customize an Open edX MFE. This framework supports two types of plugins: iFrame-based and "Direct" plugins.

> The primary way this is made possible is through JS-based configurations, where the changes to a plugin slot are defined.

### Concepts
- Plugin-slots or Slots: similar to hooks in the backend. The places in-code where an extension can be "hooked".
- Plugins or Widgets: the extensions that are custom for you and your use case.
- Direct, Iframe and Modular plugins: classification of widgets by their packaging.


### Operations
- Insert
- Modify, wrap, hide

### Widget variables
- Default management
- Priority
- Plugin context


### Configuration

env.config.js

```js
const config = {
  pluginSlots: {
    a_slot_id: { /* plugin configuration */},
    footer_slot: { /* plugin configuration */},
    ...
  },
}

export default config;
```

plugin configuration:

```js
...
footer_slot: {
  keepDefault: true,
  plugins: [
    {
      op: PLUGIN_OPERATIONS.Insert,
      widget: {
        id: 'custom_footer',
        type: DIRECT_PLUGIN,
        RenderWidget: MyOrgFooter,
      },
    }
  ]
}
...
```


### Relevant links:

- https://github.com/openedx/frontend-plugin-framework/
- https://www.canva.com/design/DAGJKCJJSlM/zA8ricea7olCES3r0LXkeg/view
- https://github.com/openedx/wg-frontend/issues/178


## Connect to the pre-built development environment

Test the connection:
```
ssh -o TCPKeepAlive=yes -o ServerAliveInterval=120 workshop@{IP_YOU_SELECTED}
```

Use a [script](./connection.sh) to nicely forward the dev ports
```bash
ip=THE_IP_YOU_SELECTED
echo "The password is: press container sandpaper pry bird terminal"
ssh -o TCPKeepAlive=yes -o ServerAliveInterval=120 $(for i in 8000 8001 1984 1993 1994 1995 1996 1997 1999 2000 2001 2002; do echo -L $i:localhost:$i ; done) workshop@${ip};
```


## Starting a development environment

Installing tutor
```bash
pip install "tutor[full]==18.1.0"
tutor plugins update
tutor plugins install mfe
```

Creating a tutor dev environment
```bash
tutor dev launch
tutor images build openedx-dev
```

Cloning MFE
```bash
git clone git@github.com:openedx/frontend-app-learner-dashboard.git
tutor mounts add frontend-app-learner-dashboard/
tutor images build learner-dashboard-dev
```

Starting the environment
```bash
tutor dev start -d
tutor dev logs -f
```

Bonus: running the FPF standalone
```bash
git clone git@github.com:openedx/frontend-plugin-framework.git
make requirements
# console 1
npm run start
# console 2
npm run start:example
```


## Plugin development

### [Basic example](./basic-example.env.config.jsx):

Adding a hello world `<p>` in an existing slot
```jsx
<p style={{backgroundColor: 'lightblue'}}>openedx con 2024</p>
```

### Create a [plugin for an existing slot](./sidebar-plugin-example.env.config.jsx):

Adding a paragon card to the sidebar.
```jsx
<div className="product-card-container d-flex">
    <Card className="mb-4" orientation="horizontal">
        <Card.ImageCap
          src="https://picsum.photos/360/200/"
          srcAlt="Card image"
          logoSrc="https://picsum.photos/150/150"
          logoAlt="Card logo"
        />
    ...
```

### Write a brand heavy [footer](./branded-footer-example.env.config.jsx):
```jsx
import Footer from './src/my-brand/Footer'
```


## Next steps

You are specially invited to the **Advanced Frontend Pluggability** workshop in the afternoon.

Follow the conversation on OEP-65 and frontend composability and modularity.
