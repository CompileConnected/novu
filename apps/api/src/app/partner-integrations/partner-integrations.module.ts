import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { USE_CASES } from './usecases';
import { PartnerIntegrationsController } from './partner-integrations.controller';
import { SharedModule } from '../shared/shared.module';
import { EnvironmentsModule } from '../environments/environments.module';
import { BridgeModule } from '../bridge';
import { CommunityUserRepository, CommunityOrganizationRepository } from '@novu/dal';

@Module({
  imports: [SharedModule, HttpModule, EnvironmentsModule, BridgeModule],
  providers: [...USE_CASES, CommunityUserRepository, CommunityOrganizationRepository],
  controllers: [PartnerIntegrationsController],
})
export class PartnerIntegrationsModule {}
