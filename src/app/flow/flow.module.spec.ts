import { FlowModule } from './flow.module';

describe('FlowModule', () => {
  let flowModule: FlowModule;

  beforeEach(() => {
    flowModule = new FlowModule();
  });

  it('should create an instance', () => {
    expect(flowModule).toBeTruthy();
  });
});
