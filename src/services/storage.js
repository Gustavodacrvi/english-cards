const createStorage = typeStorage => {
    if(typeStorage == 'extension') {
        const get = (key) => {
            let value
            $browser.storage.sync.get([String(key), (result) => {
                try {
                    value = JSON.parse(result[String(key)])
                }
                catch(err) {
                    value = result[String(key)]
                }
                return value
            }])
            return value
        }
        const set = (key, value) => {
            const parseValue = typeof value === "object" ? JSON.stringify(value) : String(value)
            $browser.storage.sync.set({[String(key)]: parseValue})
        }
        const remove = (key) => {
            $browser.storage.sync.remove([String(key)], () => {
                close()
            })
        }
        return {
            get,
            set,
            remove
        }
    }
    else if(typeStorage == 'browser') {
        let parseValue
        const get = key => {
            const value = localStorage.getItem(String(key))
            try {
                parseValue = JSON.parse(value)
            }
            catch (err) {
                parseValue = value
            }
        }
        const set = (key, value) => {
            const parseValue = typeof value === "object" ? JSON.stringify(value) : String(value)
            localStorage.setItem(String(key), parseValue)
        }
        const remove = (key) => {
            localStorage.removeItem(String(key))
        }
        return {
            get,
            set,
            remove
        }
    }
    else {
        throw 'Implementation error'
    }

}
export const storage = createStorage('browser')
export default createStorage