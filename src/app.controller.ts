import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { HttpService } from '@nestjs/axios';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly httpService: HttpService,
  ) {}

  @Get()
  @Render('index')
  async root() {
    const firstRequest = this.httpService.axiosRef.get(
      'https://dsfgfd.000webhostapp.com/api/data1/',
    );
    const secondRequest = this.httpService.axiosRef.get(
      'https://dsfgfd.000webhostapp.com/api/data2/',
    );
    const thirdRequest = this.httpService.axiosRef.get(
      'https://dsfgfd.000webhostapp.com/api/data3/',
    );
    const fourthRequest = this.httpService.axiosRef.get(
      'https://dsfgfd.000webhostapp.com/api/data4/',
    );

    const [firstResponse, secondResponse, thirdResponse, fourthResponse] =
      await Promise.all([
        firstRequest,
        secondRequest,
        thirdRequest,
        fourthRequest,
      ]);

    const data4 = Object.values(fourthResponse.data['mono moon']);

    console.log(data4);

    return {
      data1: firstResponse.data,
      data2: secondResponse.data,
      data3: thirdResponse.data,
      data4,
    };
  }
}
