import { Injectable } from '@nestjs/common';
import { JobRepository, JobStatusEnum } from '@novu/dal';
import { StepTypeEnum } from '@novu/shared';
import { ApiException } from '../../../shared/exceptions/api.exception';
import { AddJobCommand } from './add-job.command';
import { DelayService } from '../../services/calculate-delay/delay.service';

@Injectable()
export class AddDelayJob {
  constructor(private jobRepository: JobRepository, private delayService: DelayService) {}

  public async execute(command: AddJobCommand): Promise<number | undefined> {
    const data = await this.jobRepository.findById(command.jobId);
    if (!data) throw new ApiException(`Job with id ${command.jobId} not found`);

    const isDelayStep = data.type === StepTypeEnum.DELAY;

    if (!data || !isDelayStep) {
      return undefined;
    }

    await this.jobRepository.updateStatus(command.organizationId, data._id, JobStatusEnum.DELAYED);

    return this.delayService.calculateDelay(data.step, data.payload, data.overrides);
  }
}
