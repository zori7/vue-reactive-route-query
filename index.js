export default function createWatchQuery (propName, setter = null) {
    return {
        created () {
            if (this.hasOwnProperty('_computedWatchers') && propName in this._computedWatchers) {
                setter = setter || 'set' + propName.replace(/^\w/, letter => letter.toUpperCase())
                if (!this.hasOwnProperty(setter))
                    throw new Error('Please specify a valid setter')
            } else if (!(propName in this._data))
                throw new Error('Property "' + propName + '" does not exist in data or computed properties')

            if (this.$route.query[propName]) {
                if (setter)
                    this[setter](this.$route.query[propName])
                else
                    this[propName] = this.$route.query[propName]
            }

            this.$watch(propName, function (value) {
                    let route = { query: { ...this.$route.query } }

                    if (value === null) {
                        if (this.$route.query.hasOwnProperty(propName)) {
                            delete route.query[propName]
                            this.$router.replace(route)
                        }
                        return
                    }

                    Object.defineProperty(route.query, propName, { value, enumerable: true })

                    if (this.$route.query.hasOwnProperty(propName)) {
                        if (this.$route.query[propName] !== value)
                            this.$router.replace(route)
                    } else
                        this.$router.replace(route)
                },
                {
                    immediate: true
                }
            )
        }
    }
}
