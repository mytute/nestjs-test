import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Req, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateCustomerDto } from 'src/customers/dtos/CreateCustomer.dto';
import { CustomersService } from 'src/customers/services/customers/customers.service';

@Controller('customer')
export class CustomerController {
    constructor(private customerService: CustomersService){} 
    
    @Get(':id')
    getCustomer(@Req() req:Request, @Res() res:Response){
      const id = Number(req.params.id)
      const customer =  this.customerService.findCustomer(id);
      if(customer){
        res.send(customer);
      }else{
        res.status(400).send({msg:'Customer not found'});
      }
    }

    @Get('/search/:id')
    searchCustomer(@Param('id', ParseIntPipe) id: number){
      console.log(typeof id); 
      const customer =  this.customerService.findCustomer(id);
      if(customer) return customer;
      else throw new HttpException('Customer not found', HttpStatus.BAD_REQUEST);
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    creatCustomer(@Body() createCustomerDto:CreateCustomerDto){
      console.log(createCustomerDto)
      this.customerService.createCustomer(createCustomerDto)
    }
    
    @Get('')
    getAllCustomers(){
      return this.customerService.getCustomers()
    }

    
}

