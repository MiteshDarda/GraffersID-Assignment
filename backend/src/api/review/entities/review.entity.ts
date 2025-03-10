import { Company } from 'src/api/company/entities/company.entity';
import { User } from 'src/api/users/entities/user.entity';
import { BaseEntity } from 'src/database/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

/**
 * This Entity is for the review table.
 * - Each user can write multiple reviews.
 * - Each company can have multiple reviews.
 *
 */
@Entity('review')
export class Review extends BaseEntity {
  // Review
  @Column({ type: 'varchar', length: 900 })
  review: string;

  //  Rating out of 5
  @Column({ type: 'int', default: 0 })
  rating: number;

  // subject
  @Column({ type: 'varchar', length: 300, nullable: true })
  subject: string;

  // full name
  @Column({ type: 'varchar', length: 300, nullable: true })
  fullName: string;

  // company
  @ManyToOne(() => Company, (company) => company.reviews)
  company: Company;

  // user
  @ManyToOne(() => User, (user) => user.reviews)
  user: User;
}
