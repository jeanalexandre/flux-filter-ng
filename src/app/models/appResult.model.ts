import {Application} from "./application.model";

export class AppResult {
  constructor(
    public pageTotal?: number,
    public results?: Application[],
    public total?: number
  ) {
    
  }
}
