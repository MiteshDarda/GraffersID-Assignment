import { BaseEntity } from 'src/database/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity('company')
export class Company extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ type: 'varchar', length: 300 })
  @Index({ fulltext: true })
  state: string;

  @Column({ type: 'varchar', length: 600 })
  location: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  foundedOn: Date;
}
