[![Travis][build-badge]][build] [![Codecov][codecov-badge]][codecov]

# graphql-type-email [![npm][npm-badge]][npm]

RFC822 spec compliant email address scalar type for [GraphQL.js](https://github.com/graphql/graphql-js).

## Usage

This package exports a Email scalar GraphQL.js type which is useful for ensuring a field is a valid internet email address.

```js
import GraphQLEmail from 'graphql-type-email';
```

### Programmatically-constructed schemas

The type can be used in a programmatically constructed schema:

```js
import { GraphQLObjectType } from 'graphql';
import GraphQLEmail from 'graphql-type-email';

export default new GraphQLObjectType({
  name: 'MyType',
  fields: {
    myField: { type: GraphQLEmail },
  },
});
```

### SDL with [graphql-tools](https://github.com/apollographql/graphql-tools)

When using the SDL with graphql-tools, define `GraphQLEmail` as the resolver for
the corresponding scalar type in the schema:

```js
import { makeExecutableSchema } from 'graphql-tools';
import GraphQLEmail from 'graphql-type-email';

const typeDefs = `
scalar Email

type MyType {
  myField: Email
}
`;

const resolvers = {
  Email: GraphQLLEmail,
};

export default makeExecutableSchema({ typeDefs, resolvers });
```

## Related

This project was inspired by [graphql-type-json](https://github.com/taion/graphql-type-json) & [graphql-type-uuid](https://github.com/olistic/graphql-type-uuid)

[npm-badge]: https://img.shields.io/npm/v/graphql-type-email.svg
[npm]: https://www.npmjs.com/package/graphql-type-email
[build-badge]: https://img.shields.io/travis/cjjenkinson/graphql-type-email/master.svg
[build]: https://travis-ci.org/cjjenkinson/graphql-type-email
[codecov-badge]: https://img.shields.io/codecov/c/github/cjjenkinson/graphql-type-email/master.svg
[codecov]: https://codecov.io/gh/cjjenkinson/graphql-type-email
