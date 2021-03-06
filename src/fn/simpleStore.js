class simpleStoreClass {
    _upsertLocal(key, storeValue, valueType) {
        switch (valueType) {
            case 'object':
                let stored = localStorage.getItem(key)
                if (stored) {
                    stored     = JSON.parse(stored)
                    storeValue = {...stored, ...storeValue}
                }
                localStorage.setItem(key, JSON.stringify(storeValue))
                return storeValue
            case 'string':
                localStorage.setItem(key, storeValue)
                return storeValue
            default:
        }
    }

    _upsertSession(key, storeValue, valueType) {
        switch (valueType) {
            case 'object':
                const stored         = localStorage.getItem(key)
                const combinedValues = {...stored, ...storeValue}
                sessionStorage.setItem(key, JSON.stringify(combinedValues))
                return combinedValues
            case 'string':
                sessionStorage.setItem(key, storeValue)
                break;
            default:
        }
    }

    // _upsertSimple(key, storeValue, valueType) {
    // }

    upsert(key, storeValue, type = 'session') {
        const valueType = typeof storeValue

        if (valueType !== 'object' && valueType !== 'string') {
            console.error(
                new Error('simpleStore only support object or string storage'),
                key
            )
        }

        switch (type) {
            case 'session':
                return this._upsertSession(key, storeValue, valueType)
            case 'local':
                return this._upsertLocal(key, storeValue, valueType)
            case 'simple':
                return this._upsertLocal(key, storeValue, valueType)
            default:
                console.error(new Error('simpleStore type in invalid'))
        }
    }

    lookup(key, type = 'session') {
        let value = null

        switch (type) {
            case 'session':
                value = sessionStorage.getItem(key)
                break
            case 'local':
                value = localStorage.getItem(key)
                break
            case 'simple':
                value = localStorage.getItem(key)
                break
            default:
                return new Error('simpleStore type in invalid')
        }

        try {
            return JSON.parse(value)
        }
        catch (e) {
            return value
        }
    }

    remove(key, type = 'session') {
        switch (type) {
            case 'session':
                return sessionStorage.removeItem(key)
            case 'local':
                return localStorage.removeItem(key)
            case 'simple':
                return localStorage.removeItem(key)
            default:
                return new Error('simpleStore type in invalid')
        }
    }
}

export let simpleStore = new simpleStoreClass()
