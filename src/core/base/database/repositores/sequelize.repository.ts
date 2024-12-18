// /* eslint-disable @typescript-eslint/no-unsafe-assignment */
// import { FindOptions, Model, ModelStatic } from 'sequelize';
// import { FindOperator } from './constants';
// import {
//   FindOneOptions,
//   FindWhereOptions,
//   IRepository,
//   WhereOperators,
// } from './repository.interface';

// export class SequelizeRepository<Entity extends Model>
//   implements IRepository<Entity>
// {
//   public constructor(private model: ModelStatic<Entity>) {}

//   async findOne(options?: FindOneOptions<Entity>): Promise<Entity | null> {
//     const sequelizeOptions: FindOptions<Entity> = {};

//     if (options?.where) {
//       sequelizeOptions.where = this.convertWhereToSequelize(options.where);
//     }

//     if (options?.select) {
//       sequelizeOptions.attributes = this.convertSelectToSequelize(
//         options.select
//       );
//     }

//     if (options?.relations) {
//       sequelizeOptions.include = this.convertRelationsToSequelize(
//         options.relations
//       );
//     }

//     if (options?.order) {
//       sequelizeOptions.order = this.convertOrderToSequelize(options.order);
//     }

//     const result = await this.model.findOne(sequelizeOptions);
//     return result ? (result.get({ plain: true }) as Entity) : null;
//   }

//   private convertWhereToSequelize(where: FindWhereOptions<Entity>): any {
//     const sequelizeWhere: any = {};

//     for (const [key, value] of Object.entries(where)) {
//       if (value && typeof value === 'object' && 'op' in value) {
//         sequelizeWhere[key] = this.convertOperatorToSequelize(
//           value.op as WhereOperators<Entity>
//         );
//       } else if (value && typeof value === 'object') {
//         sequelizeWhere[key] = this.convertWhereToSequelize(
//           value as FindWhereOptions<Entity>
//         );
//       } else {
//         sequelizeWhere[key] = value;
//       }
//     }

//     return sequelizeWhere;
//   }

//   private convertOperatorToSequelize(operator: WhereOperators<Entity>): any {
//     const sequelizeOp: any = {};

//     for (const [op, value] of Object.entries(operator)) {
//       switch (op) {
//         case FindOperator.LT:
//           sequelizeOp[Op.lt] = value;
//           break;
//         case FindOperator.GT:
//           sequelizeOp[Op.gt] = value;
//           break;
//         case FindOperator.LTE:
//           sequelizeOp[Op.lte] = value;
//           break;
//         case FindOperator.GTE:
//           sequelizeOp[Op.gte] = value;
//           break;
//         case FindOperator.NE:
//           sequelizeOp[Op.ne] = value;
//           break;
//         case FindOperator.IN:
//           sequelizeOp[Op.in] = value;
//           break;
//         case FindOperator.NIN:
//           sequelizeOp[Op.notIn] = value;
//           break;
//         case FindOperator.LIKE:
//           sequelizeOp[Op.like] = value;
//           break;
//         case FindOperator.ILIKE:
//           sequelizeOp[Op.iLike] = value;
//           break;
//         case FindOperator.BETWEEN:
//           sequelizeOp[Op.between] = value;
//           break;
//         case FindOperator.ISNULL:
//           sequelizeOp[Op.is] = null;
//           break;
//         case FindOperator.ANY:
//           sequelizeOp[Op.any] = value;
//           break;
//         // Add more operators as needed
//       }
//     }

//     return sequelizeOp;
//   }

//   private convertSelectToSequelize(select: any): string[] {
//     return Array.isArray(select) ? select : Object.keys(select);
//   }

//   private convertRelationsToSequelize(relations: any): any[] {
//     return Object.entries(relations).map(([key, value]) => {
//       const include: any = { association: key };
//       if (typeof value === 'object' && !Array.isArray(value)) {
//         include.include = this.convertRelationsToSequelize(value);
//       }
//       return include;
//     });
//   }

//   private convertOrderToSequelize(order: any): any[] {
//     return Object.entries(order).map(([key, value]) => [
//       key,
//       value.toUpperCase(),
//     ]);
//   }
// }
