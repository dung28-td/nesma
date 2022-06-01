import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule as NestGraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

const GraphQLModule = NestGraphQLModule.forRoot<ApolloDriverConfig>({
  driver: ApolloDriver,
  autoSchemaFile: join(process.cwd(), 'src/schema.gql')
})

export default GraphQLModule