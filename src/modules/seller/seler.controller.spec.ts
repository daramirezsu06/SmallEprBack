import { Test, TestingModule } from '@nestjs/testing';
import { SelerController } from './seller.controller';

describe('SelerController', () => {
  let controller: SelerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SelerController],
    }).compile();

    controller = module.get<SelerController>(SelerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
