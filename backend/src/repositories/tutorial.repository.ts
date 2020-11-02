import {DefaultCrudRepository} from '@loopback/repository';
import {Tutorial, TutorialRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TutorialRepository extends DefaultCrudRepository<
  Tutorial,
  typeof Tutorial.prototype.id,
  TutorialRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Tutorial, dataSource);
  }
}
