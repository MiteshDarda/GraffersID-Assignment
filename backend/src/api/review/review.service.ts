import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Pool } from 'pg';

@Injectable()
export class ReviewService {
  constructor(@Inject('DATABASE_POOL') private pool: Pool) {}

  async create(companyId: number, createReviewDto: CreateReviewDto) {
    try {
      const getCompanyQuery = 'SELECT * FROM company WHERE id = $1';
      const getCompanyValues = [companyId];
      const companyResult = await this.pool.query(
        getCompanyQuery,
        getCompanyValues,
      );

      if (companyResult.rowCount === 0) {
        throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
      }

      const postReviewQuery =
        'INSERT INTO review (rating, review, "companyId", subject, "fullName") VALUES ($1, $2, $3, $4, $5)';
      const postReviewValues = [
        createReviewDto.rating,
        createReviewDto.review,
        companyId,
        createReviewDto.subject,
        createReviewDto.fullName,
      ];
      await this.pool.query(postReviewQuery, postReviewValues);

      // Calculate the average rating
      const getAverageRatingQuery =
        'SELECT AVG(rating) as avg FROM review WHERE "companyId" = $1';
      const getAverageRatingValues = [companyId];
      const averageRatingResult = await this.pool.query(
        getAverageRatingQuery,
        getAverageRatingValues,
      );

      const avgRating = parseFloat(averageRatingResult.rows[0].avg);

      // review count
      const totalReviewQuery =
        'SELECT COUNT(*) FROM review WHERE "companyId" = $1';
      const totalReviewValues = [companyId];
      const totalReviewResult = await this.pool.query(
        totalReviewQuery,
        totalReviewValues,
      );

      // Update avgRating in company table
      const updateCompanyQuery =
        'UPDATE company SET "avgRating" = $1 WHERE id = $2';
      const updateCompanyValues = [avgRating, companyId];
      await this.pool.query(updateCompanyQuery, updateCompanyValues);
      console.log('avgRating updated');

      // Update review count in company table
      const updateReviewCountCompanyQuery =
        'UPDATE company SET "reviewCount" = $1 WHERE id = $2';
      const updateReviewCountCompanyValues = [
        totalReviewResult.rows[0].count,
        companyId,
      ];
      await this.pool.query(
        updateReviewCountCompanyQuery,
        updateReviewCountCompanyValues,
      );

      return {
        message: 'Review created successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: 'error',
          error: 'An error occurred while creating the review',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(companyId: number) {
    try {
      const getReviewsQuery = 'SELECT * FROM review WHERE "companyId" = $1';
      const getReviewsValues = [companyId];
      const reviewsResult = await this.pool.query(
        getReviewsQuery,
        getReviewsValues,
      );

      // company
      const getOneCompanyQuery = 'SELECT * FROM company WHERE id = $1';
      const getOneCompanyValues = [companyId];
      const companyResult = await this.pool.query(
        getOneCompanyQuery,
        getOneCompanyValues,
      );

      // review count
      const totalReviewQuery =
        'SELECT COUNT(*) FROM review WHERE "companyId" = $1';
      const totalReviewValues = [companyId];
      const totalReviewResult = await this.pool.query(
        totalReviewQuery,
        totalReviewValues,
      );

      // Get avgRating from company table
      const getAvgCompanyQuery =
        'SELECT "avgRating" FROM company WHERE id = $1';
      const getAvgCompanyValues = [companyId];
      const avgCompanyResult = await this.pool.query(
        getAvgCompanyQuery,
        getAvgCompanyValues,
      );

      if (companyResult.rowCount === 0) {
        throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
      }

      return {
        reviews: reviewsResult.rows,
        averageRating: avgCompanyResult.rows[0].avgRating,
        totalReview: totalReviewResult.rows[0].count,
        company: companyResult.rows[0],
      };
    } catch (error) {
      throw new HttpException(
        {
          status: 'error',
          error: 'An error occurred while fetching reviews',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
