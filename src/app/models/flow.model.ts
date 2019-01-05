import {Application} from "./application.model";

export class Flow {
  public id? : number;
  constructor (
    public sourceApp?: Application,
    public targetApp?: Application,
    public technologies?: string,
    public name?: string,
    public description?: string
  ){}
}
  

