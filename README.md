# vue-reactive-route-query
Make Vue Router data&lt;->query binding easier

## Installation
`npm i vue-reactive-route-query`

## Usage


`Foo.vue:`

```javascript
<template>
  <div>
    {{ foo }}
    <button @click="foo--">Decrement foo</button>
    <button @click="foo++">Increment foo</button>
  </div>
</template>

<script>
import createWatchQuery from 'vue-reactive-route-query'

export default {
  mixins: [
    createWatchQuery('foo'),
  ],
  data () {
    return {
      foo: 1,
    }
  }
}
</script>


```

### Example with Vuex data

`Foo.vue:`

```javascript
<template>
  <div>
    {{ foo }}
    <button @click="setFoo(foo - 1)">Decrement foo</button>
    <button @click="setFoo(foo + 1)">Increment foo</button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import createWatchQuery from 'vue-reactive-route-query'

export default {
  mixins: [
    createWatchQuery('foo'),
  ],
  computed: {
    ...mapState({
      foo: state => state.foo,
    }),
  },
  methods: {
    ...mapMutations({
      setFoo: 'setFoo',
    })
  }
}
</script>


```

It will search a setter method. You can define a custom setter name in second argument:

```javascript
createWatchQuery('foo', 'customFooSetter'),
```
