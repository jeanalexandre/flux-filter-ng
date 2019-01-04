import {Flow} from "./flow.model";

export class FlowResult {
  constructor(
    public pageTotal?: number,
    public results?: Flow[],
    public total?: number
  ) {
    
  }
}
