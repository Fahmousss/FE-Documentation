import { BASE_URL } from '@/core/constant/config.constant';
import { HTTPResponse } from '@/core/models/http.types';
import { delay, http, HttpResponse } from 'msw';
import { IBrand } from '../../pages/example/hooks/use-table-brand';
import { db, generateBrands } from '../db';

const brandHandlers = [
  // GET - Fetch semua brands
  http.get('/brand', async () => {
    // Simulasi network delay
    await delay(500);

    const response: HTTPResponse<IBrand[]> = {
      status: 200,
      messages: ['Successfully fetched brand data'],
      data: db.brands,
    };

    return HttpResponse.json(response, { status: 200 });
  }),

  // POST - Create new brand
  http.post('/brand', async ({ request }) => {
    const req = await request.json();
    const { name }: any = req;
    await delay(300);

    const newBrand: IBrand = {
      id: Math.max(...db.brands.map((brand) => brand.id), 0) + 1,
      brand_name: name.toString(),
    };

    db.brands.push(newBrand);

    return HttpResponse.json(
      {
        status: 'success',
        message: 'Brand created successfully',
        data: newBrand,
      },
      { status: 201 },
    );
  }),

  // PUT - Update brand
  http.put('/brand/:id', async ({ params, request }) => {
    const { id } = params;
    const req = await request.json();
    const { name }: any = req;
    await delay(600);

    const brandId = Number(id);
    const brandIndex = db.brands.findIndex((brand) => brand.id === brandId);

    if (brandIndex === -1) {
      return HttpResponse.json(
        {
          status: 'error',
          message: 'Brand not found',
          data: null,
        },
        { status: 404 },
      );
    }

    db.brands[brandIndex] = {
      ...db.brands[brandIndex],
      brand_name: name.toString(),
    };

    return HttpResponse.json(
      {
        status: 'success',
        message: 'Brand updated successfully',
        data: db.brands[brandIndex],
      },
      { status: 200 },
    );
  }),

  // DELETE - Remove brand
  http.delete('/brand/:id', async ({ params }) => {
    const { id } = params;
    await delay(800);

    const brandId = Number(id);

    const initialLength = db.brands.length;
    db.brands = db.brands.filter((brand) => brand.id !== brandId);

    if (db.brands.length === initialLength) {
      return HttpResponse.json(
        {
          status: 'error',
          message: 'Brand not found',
          data: null,
        },
        { status: 404 },
      );
    }

    return HttpResponse.json(
      {
        status: 'success',
        message: 'Brand deleted successfully',
        data: null,
      },
      { status: 200 },
    );
  }),
];

export default brandHandlers;
