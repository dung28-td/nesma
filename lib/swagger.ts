import { INestApplication } from "@nestjs/common"
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from "@nestjs/swagger"
import {
  ExternalDocumentationObject,
  SecurityRequirementObject,
  SecuritySchemeObject,
  ServerVariableObject
} from "@nestjs/swagger/dist/interfaces/open-api-spec.interface"

interface SwaggerConfigOptions {
  title: string
  description: string
  version: string
  termsOfService: string
  contact: {
    name: string
    url: string
    email: string
  }
  license: {
    name: string
    url: string
  }
  server: {
    url: string
    description?: string
    variables?: Record<string, ServerVariableObject>
  }
  externalDoc: {
    description: string
    url: string
  }
  basePath: string
  tag: {
    name: string
    description?: string
    externalDocs?: ExternalDocumentationObject
  }
  security: {
    name: string,
    options: SecuritySchemeObject
  }
  securityRequirements: {
    name: string | SecurityRequirementObject
    requirements?: string[]
  }
  bearerAuth:{
    options?: SecuritySchemeObject
    name?: string
  }
  oAuth2: {
    options?: SecuritySchemeObject
    name?: string
  }
  apiKey: {
    options?: SecuritySchemeObject
    name?: string
  }
  basicAuth: {
    options?: SecuritySchemeObject
    name?: string
  }
  cookieAuth: {
    cookieName?: string
    options?: SecuritySchemeObject
    securityName?: string
  }
}

const config = (options: Partial<SwaggerConfigOptions> = {}) => {
  const {
    title,
    description,
    version,
    termsOfService,
    contact,
    license,
    server,
    externalDoc,
    basePath,
    tag,
    security,
    securityRequirements,
    bearerAuth,
    oAuth2,
    apiKey,
    basicAuth,
    cookieAuth
  } = options

  let builder = new DocumentBuilder()

  if (title) builder = builder.setTitle(title)
  if (description) builder = builder.setDescription(description)
  if (version) builder = builder.setVersion(version)
  if (termsOfService) builder = builder.setTermsOfService(termsOfService)
  if (contact) builder = builder.setContact(contact.name, contact.url, contact.email)
  if (license) builder = builder.setLicense(license.name, license.url)
  if (server) builder = builder.addServer(server.url, server.description, server.variables)
  if (externalDoc) builder = builder.setExternalDoc(externalDoc.description, externalDoc.url)
  if (basePath) builder = builder.setBasePath(basePath)
  if (tag) builder = builder.addTag(tag.name, tag.description, tag.externalDocs)
  if (security) builder = builder.addSecurity(security.name, security.options)
  if (securityRequirements) builder = builder.addSecurityRequirements(securityRequirements.name, securityRequirements.requirements)
  if (bearerAuth) builder = builder.addBearerAuth(bearerAuth.options, bearerAuth.name)
  if (oAuth2) builder = builder.addOAuth2(oAuth2.options, oAuth2.name)
  if (apiKey) builder = builder.addApiKey(apiKey.options, apiKey.name)
  if (basicAuth) builder = builder.addBasicAuth(basicAuth.options, basicAuth.name)
  if (cookieAuth) builder = builder.addCookieAuth(cookieAuth.cookieName, cookieAuth.options, cookieAuth.securityName)

  return builder.build()
}

interface SwaggerSetupOptions {
  path?: string
}

const setup = (
  app: INestApplication,
  config: Omit<OpenAPIObject, "paths">,
  options: SwaggerSetupOptions = {}
) => {
  const {
    path = 'swagger'
  } = options

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup(path, app, document)
}

const Swagger = {
  config,
  setup
}

export default Swagger