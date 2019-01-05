import {Application} from "./application.model";

export class newFlow {
  public id?: number;

  constructor(
    public sourceAppId?: number,
    public targetAppId?: number,
    public technologies?: string,
    public name?: string,
    public description?: string
  ) {
  }
}
  

