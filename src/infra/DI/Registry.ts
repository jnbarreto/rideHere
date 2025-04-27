export default class Registry {
    private dependecies: {[name: string]: any};
    private static instance: Registry;

    private constructor() {
        this.dependecies = {};
    }

    provide(name: string, dependency: any){
        this.dependecies[name] = dependency;
    }

    inject(name:string) {
        return this.dependecies[name];
    }

    static getInstance () {
        if (!Registry.instance){
            Registry.instance = new Registry();
        }
        return Registry.instance;
    }
}

// decorator
export function inject (name:string) {
    return function (target: any, propertyKey: string) {
        target[propertyKey] = new Proxy({}, {
            get (target:any, propertyKey: string) {
                const dependency = Registry.getInstance().inject(name);
                return dependency[propertyKey];
            }
        });
    }
}
