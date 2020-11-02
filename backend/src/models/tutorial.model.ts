import {Entity, model, property} from '@loopback/repository';

@model()
export class Tutorial extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  title?: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'boolean',
  })
  status?: boolean;


  constructor(data?: Partial<Tutorial>) {
    super(data);
  }
}

export interface TutorialRelations {
  // describe navigational properties here
}

export type TutorialWithRelations = Tutorial & TutorialRelations;
