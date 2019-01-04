export class Flow {
  public id? : number;
  constructor (
    public sourceApp?: string,
    public targetApp?: string,
    public technologies?: string[],
    public name?: string,
    public description?: string
  ){}
}
  

