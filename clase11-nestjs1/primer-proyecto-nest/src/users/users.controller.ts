import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Query, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
//http://localhost:3000 /users /:id
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/:parametro')
  probarRequest(@Request() req){
    const { query, body, params} = req
    console.log(query)
    console.log(body)
    console.log(params)
    return 'todo en un objeto'
  } 

  @Post()
  create(@Body() createUserDto: CreateUserDto) {

    if(!createUserDto.first_name || !createUserDto.last_name || !createUserDto.password) throw new HttpException('Imcoplete values', HttpStatus.BAD_REQUEST)
    
    return this.usersService.create(createUserDto);
  }

  // @Get()
  // findAll(@Query() query) {
  //   const { limit } = query
  //   console.log(limit)
  //   // return this.usersService.findAll();
  //   const users = this.usersService.findAll()
  //   return {status: 'success', users}
  // }
  @Get()
  findAll(@Query('limit') limit) {
 
    console.log(limit)
    // return this.usersService.findAll();
    const users = this.usersService.findAll()
    return {status: 'success', users}
  }

  @Get(':id')
  findOne(@Param('id') id: string) {

    if(isNaN(+id)) throw new HttpException('Invalid params', HttpStatus.BAD_REQUEST)

    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
