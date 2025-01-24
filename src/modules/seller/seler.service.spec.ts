import { Test, TestingModule } from '@nestjs/testing';
import { SelerService } from './seller.service';

describe('SelerService', () => {
  let service: SelerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SelerService],
    }).compile();

    service = module.get<SelerService>(SelerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
