import { environment } from "../../environments/environment.development"


export abstract class BaseServices {
    
    private address: string
    private port: number
    protected resource: string

    protected get ApiUrl():string{
        return `http://${this.address}:${this.port}/${this.resource}`
    }

    constructor(resource: string){
        this.address = environment.apiAddress
        this.port = environment.apiPort
        this.resource = resource
    }
}
