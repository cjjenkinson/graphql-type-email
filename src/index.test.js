import { graphql, GraphQLObjectType, GraphQLSchema } from 'graphql';
import { Kind } from 'graphql/language';

import GraphQLEmail from '.';

describe('GraphQLEmail', () => {
  let schema;

  beforeEach(() => {
    schema = new GraphQLSchema({
      query: new GraphQLObjectType({
        name: 'Query',
        fields: {
          value: {
            type: GraphQLEmail,
            args: {
              arg: {
                type: GraphQLEmail,
              },
            },
            resolve: (parent, { arg }) => arg,
          },
        },
      }),
    });
  });

  describe('serialize', () => {
    test('supports serialization', () => {
      expect(GraphQLEmail.serialize('test@test.com')).toEqual('test@test.com');
    });

    test('rejects invalid values', () => {
      expect(() => {
        GraphQLEmail.serialize('this is not an email');
      }).toThrow(
        new TypeError(
          'Value is not a valid email address: this is not an email',
        ),
      );
    });
  });

  describe('parseValue', () => {
    test('supports parsing values', async () => {
      expect(GraphQLEmail.parseValue('test@test.com')).toBe('test@test.com');
    });

    test('rejects invalid values', async () => {
      const { errors } = await graphql(
        schema,
        'query ($arg: Email!) { value(arg: $arg) }',
        null,
        null,
        { arg: 'this is not an email address' },
      );
      expect(errors.length).toBe(1);
    });
  });

  describe('parseLiteral', () => {
    test('supports parsing literals', async () => {
      expect(
        GraphQLEmail.parseLiteral({
          value: 'test@test.com',
          kind: Kind.STRING,
        }),
      ).toBe('test@test.com');
    });

    test('rejects invalid email address', async () => {
      const { errors } = await graphql(
        schema,
        '{ value(arg: "this is not an email address") }',
      );
      expect(errors.length).toBe(1);
    });

    test('rejects invalid literals', async () => {
      const { errors } = await graphql(schema, '{ value(arg: 123) }');
      expect(errors.length).toBe(1);
    });
  });
});
