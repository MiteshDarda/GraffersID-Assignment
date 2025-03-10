import { Review } from 'src/api/review/entities/review.entity';
import { BaseEntity } from 'src/database/base.entity';
import { Column, Entity, Index, OneToMany } from 'typeorm';

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

  //  Rating out of 5
  @Column({ type: 'float', default: 0 })
  avgRating: number;

  // review count
  @Column({ type: 'int', default: 0 })
  reviewCount: number;

  @OneToMany(() => Review, (review) => review.company)
  reviews: Review[];
}
