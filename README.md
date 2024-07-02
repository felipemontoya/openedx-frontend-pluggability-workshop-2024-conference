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


## Development environment

For this workshop you have two options: either A) connect to a pre-built one
we'll provide, or B) use your own.  The first one is recommended, as launching
a Tutor dev env from scratch can not only take a long time, but also run into
problems which the presenters won't be able to assist with.

### Option A. Connect to the pre-built development environment

Test the connection with the IP address you were provided:
```
ssh -o TCPKeepAlive=yes -o ServerAliveInterval=120 workshop@{IP_YOU_SELECTED}
```

You'll need to use SSH port forwarding before you can access the Open edX instance
using your browser.  Use a [script](./connection.sh) to nicely forward the dev ports
```bash
ip=THE_IP_YOU_SELECTED
echo "The password is: press container sandpaper pry bird terminal"
ssh -o TCPKeepAlive=yes -o ServerAliveInterval=120 $(for i in 8000 8001 1984 1993 1994 1995 1996 1997 1999 2000 2001 2002; do echo -L $i:localhost:$i ; done) workshop@${ip};
```

That's it!  Just make sure you don't already have a local Tutor dev running,
otherwise the port forwarding won't work.

Pro Tip: You can use VSCode to edit files remotely via the
[Remote-SSH extension](https://code.visualstudio.com/docs/remote/ssh).

### Option B. Launching a development environment from scratch

As an alternative to the pre-built environment, you can run the following in a
machine with at least 2 CPUs and 8GB of RAM, but ideally 4 CPUs and 16GB of
RAM.  You'll need a recent pip and Docker, as well as a good internet
connection.  Note that this will take over an hour in ideal conditions (which
may not be the case at the conference venue).

Installing the latest tutor 18
```bash
pip install "tutor>=18,<19"
pip install "tutor-mfe>=18,<19"
```

Limit the number of simultaneous Docker build processes, so that builds don't
fail when rebuilding the MFE image:
```bash
cat >buildkitd.toml <<EOF
[worker.oci]
  max-parallelism = 2
EOF
docker buildx create --use --name=dualcpu --config=./buildkitd.toml
```

Limit Tutor resource usage for dev mode
```bash
tutor config save --set OPENEDX_CMS_UWSGI_WORKERS=1 --set OPENEDX_LMS_UWSGI_WORKERS=1 --set ELASTICSEARCH_HEAP_SIZE=100m
```

Cloning an MFE
```bash
git clone git@github.com:openedx/frontend-app-learner-dashboard.git
tutor mounts add frontend-app-learner-dashboard/
```

Creating a tutor dev environment.  This command will build/rebuild all
necessary images.
```bash
tutor dev launch
```

Stop the environment once done.
```bash
tutor dev stop
```

## Starting the dev environment

Once connected to the pre-built environment (or after you're done building your
own), start it as soon as possible with the following command, as it can take
from 5 to 10 minutes for the system to settle:

```bash
tutor dev start -d
```

Wait for the system to settle by checking the load with:

```bash
sudo htop
```

At the same time, you can keep an eye on the Open edX logs with:

```
tutor dev logs -f
```

Once the system settles, import the demo course as follows.

```bash
tutor dev do importdemocourse
tutor dev run cms ./manage.py cms update_course_outline course-v1:OpenedX+DemoX+DemoCourse
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

* [Advanced Frontend Pluggability Slides](https://docs.google.com/presentation/d/1ucHFjyRzdGKEvQSQmZokatLy2NiNLvd-b_U3-rEax1k/edit)
* [Advanced Frontend Pluggability Code](https://github.com/openedx/frontend-app-learning/pull/1413)

Also, follow the conversation on OEP-65 and frontend composability and modularity.
