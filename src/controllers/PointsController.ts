import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {
    async create(request: Request, response: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body

        const point = {
            image: 'https://images.unsplash.com/photo-1556767576-5ec41e3239ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        }

        const trx = await knex.transaction();

        const inserted_ids = await trx('points').insert(point)

        const [point_id] = inserted_ids;

        const pointsItems = items.map((item_id: number) => {
            return {
                item_id,
                point_id
            }
        });

        await trx('point_items').insert(pointsItems)

        await trx.commit();

        return response.json({ id: point_id, ...point });
    }

    async show(request: Request, response: Response) {
        const point = await knex('points').where('id', request.params.id).first();

        if (!point)
            return response.status(404).json({ message: 'not found' });

        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', request.params.id)
            .select('items.title')

        return response.json({ point, items });
    }

    async index(request: Request, response: Response) {

        const { city, uf, items } = request.query;

        const parsedItems = String(items)
            .split(',')
            .map(item => +item.trim());

        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*')

        return response.json(points);
    }
}

export default PointsController;