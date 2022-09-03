import { AuditMetadata } from 'src/entities/auditMetadata.entity';

export class Account extends AuditMetadata {
  id: string;
  username: string;
}
