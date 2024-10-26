import { Controller, Get } from "@nestjs/common"

@Controller('')
export class AppController {

    @Get('/')
    public async checkHealthy() {
        return {
            message: '👋 Welcome to Selffy API',
            time: new Date(),
            documentation: 'https://selffy.com/api/docs'
        }
    }

}