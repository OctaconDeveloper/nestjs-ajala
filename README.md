
# NestJS AJALA

## Description
An <a href="https://www.npmjs.com/package/axios" target="blank">axios</a> wrapper  for [Nest](https://github.com/nestjs/nest) originally published as part of the `@nestjs/common` package. This package is a developed for making http calls for glade internal services.

## Installation

```bash
$ npm i --save @octacondeveloper/ajala
```

## Quick Start

Once the installation process is complete, to use the `AjalaService`, first import `AjalaModule`.
```typescript
@Module({
  imports: [AjalaModule],
  providers: [AppService],
})
export class AppModule {}
```
Next, inject `AjalaService` using normal constructor injection.
```typescript
@Injectable()
export class AppService {
  constructor(private readonly ajalaService: AjalaService) {}

  async findAll(): Promise<any>  {
    return await this.ajalaService.get("https://jsonplaceholder.typicode.com/posts/11", [], body, false, null);
  }
//sample payload structure
//this.ajalaService.get(url, header, body, proxy, options)
}
```

Other methods include
```typescript
this.ajalaService.get("https://jsonplaceholder.typicode.com/posts/11",  [], body,  false,  null);
this.ajalaService.delete("https://jsonplaceholder.typicode.com/posts/11",  [], body,  false,  null);
this.ajalaService.put("https://jsonplaceholder.typicode.com/posts/11",  [], body,  false,  null);
this.ajalaService.patch("https://jsonplaceholder.typicode.com/posts/11",  [], body,  false,  null);
this.ajalaService.head("https://jsonplaceholder.typicode.com/posts/11",  [], body,  false,  null);
this.ajalaService.post("https://jsonplaceholder.typicode.com/posts/11",  [], body,  false,  null, files);
```


## License

Ajala is [MIT licensed](LICENSE).