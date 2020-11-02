import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Tutorial} from '../models';
import {TutorialRepository} from '../repositories';

export class AmsControllerController {
  constructor(
    @repository(TutorialRepository)
    public tutorialRepository : TutorialRepository,
  ) {}

  @post('/tutorials', {
    responses: {
      '200': {
        description: 'Tutorial model instance',
        content: {'application/json': {schema: getModelSchemaRef(Tutorial)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tutorial, {
            title: 'NewTutorial',
            exclude: ['id'],
          }),
        },
      },
    })
    tutorial: Omit<Tutorial, 'id'>,
  ): Promise<Tutorial> {
    return this.tutorialRepository.create(tutorial);
  }

  @get('/tutorials/count', {
    responses: {
      '200': {
        description: 'Tutorial model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Tutorial) where?: Where<Tutorial>,
  ): Promise<Count> {
    return this.tutorialRepository.count(where);
  }

  @get('/tutorials', {
    responses: {
      '200': {
        description: 'Array of Tutorial model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Tutorial, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Tutorial) filter?: Filter<Tutorial>,
  ): Promise<Tutorial[]> {
    return this.tutorialRepository.find(filter);
  }

  @patch('/tutorials', {
    responses: {
      '200': {
        description: 'Tutorial PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tutorial, {partial: true}),
        },
      },
    })
    tutorial: Tutorial,
    @param.where(Tutorial) where?: Where<Tutorial>,
  ): Promise<Count> {
    return this.tutorialRepository.updateAll(tutorial, where);
  }

  @get('/tutorials/{id}', {
    responses: {
      '200': {
        description: 'Tutorial model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Tutorial, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Tutorial, {exclude: 'where'}) filter?: FilterExcludingWhere<Tutorial>
  ): Promise<Tutorial> {
    return this.tutorialRepository.findById(id, filter);
  }

  @patch('/tutorials/{id}', {
    responses: {
      '204': {
        description: 'Tutorial PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tutorial, {partial: true}),
        },
      },
    })
    tutorial: Tutorial,
  ): Promise<void> {
    await this.tutorialRepository.updateById(id, tutorial);
  }

  @put('/tutorials/{id}', {
    responses: {
      '204': {
        description: 'Tutorial PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tutorial: Tutorial,
  ): Promise<void> {
    await this.tutorialRepository.replaceById(id, tutorial);
  }

  @del('/tutorials/{id}', {
    responses: {
      '204': {
        description: 'Tutorial DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tutorialRepository.deleteById(id);
  }
}
