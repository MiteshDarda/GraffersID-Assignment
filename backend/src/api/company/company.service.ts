import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Pool } from 'pg';

@Injectable()
export class CompanyService {
  constructor(@Inject('DATABASE_POOL') private pool: Pool) {}

  async create(createCompanyDto: CreateCompanyDto) {
    try {
      console.log('HELLO');
      console.log(createCompanyDto);
      const query =
        'INSERT INTO company (name, state, location, "foundedOn") VALUES ($1, $2, $3, $4) RETURNING *';
      const values = [
        createCompanyDto.name,
        createCompanyDto.state,
        createCompanyDto.location,
        createCompanyDto.foundedOn,
      ];

      await this.pool.query(query, values);

      return {
        message: 'Company created successfully',
      };
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(state: string, page: number, limit: number) {
    try {
      // Ensure page and limit are numbers
      const pageNum = parseInt(page as unknown as string, 10) || 1;
      const limitNum = parseInt(limit as unknown as string, 10) || 10;

      let query = 'SELECT * FROM company';
      let countQuery = 'SELECT COUNT(*) FROM company';
      let values = [];

      if (state && state.trim() !== '') {
        // Use ILIKE for case-insensitive pattern matching
        query = 'SELECT * FROM company WHERE state ILIKE $1';
        countQuery = 'SELECT COUNT(*) FROM company WHERE state ILIKE $1';

        // Add % wildcards before and after the search term
        values = [`%${state}%`];
      }

      // Add pagination
      query +=
        ' ORDER BY "foundedOn" DESC OFFSET $' +
        (values.length + 1) +
        ' LIMIT $' +
        (values.length + 2);
      values.push((pageNum - 1) * limitNum);
      values.push(limitNum);

      // Get total count for pagination
      const totalCompanies = await this.pool.query(
        countQuery,
        state && state.trim() !== '' ? [`%${state}%`] : [],
      );

      // Execute the main query
      const result = await this.pool.query(query, values);

      return {
        data: result.rows,
        totalCompanies: parseInt(totalCompanies.rows[0].count, 10),
      };
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
